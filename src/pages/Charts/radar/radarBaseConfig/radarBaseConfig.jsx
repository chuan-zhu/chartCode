import React, { useEffect } from 'react'
import { Collapse, Switch } from 'antd';
import { Form, Input, Button, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CaretRightOutlined, Space } from '@ant-design/icons';
import _ from 'lodash'
import { connect } from 'umi'
import styles from './radarBaseConfig.less'
const { Panel } = Collapse;
import { deBounce } from '@/utils/utils'


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 18, offset: 6 },
    },
};
const RadarBaseConfig = ({ radarConfig, dispatch }) => {
    let { indicator, data } = radarConfig
    // console.log(indicator, data)
    const [form] = Form.useForm();
    let initialValue = {
        indicator: indicator
    }
    data.forEach(item => {
        initialValue[item.name] = {
            name: item.name,
            value: item.value
        }
    })
    form.setFieldsValue(initialValue)

    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        // console.log('newFormValue', newFormValue)
        let newData = []
        Object.keys(newFormValue).forEach(key => {
            if (key !== 'indicator') {
                newData.push({
                    value: newFormValue[key].value,
                    name: key
                })
            }
        })
        dispatch({
            type: 'radarConfig/update',
            payload: { ...radarConfig, indicator: newFormValue.indicator,data:newData }
        });
    }, 500)
    /**
     * 添加维度
     */
    const addIndicator = (add) => {
        add()
        data.forEach(item => {
            item.value.push(0)
        })
        // console.log(data)
        // dispatch({
        //     type: 'radarConfig/update',
        //     payload: { ...radarConfig, data: newData }
        // });
    }
    /**
    * 删除维度
    */
    const delIndicator = (del, name, index) => {
        del(name)
        data.forEach(item => {
            item.value.splice(index, 1)
        })
        // console.log(data)
        // dispatch({
        //     type: 'radarConfig/update',
        //     payload: { ...radarConfig, data: newData }
        // });
    }
    /**
     * 删除当前系列
     * @param {} seriesName 
     */
    const removeSeries = (seriesName) => {
        // 修改data数组  删除
        const newData = data.filter(item => item.name !== seriesName)
        dispatch({
            type: 'radarConfig/update',
            payload: { ...radarConfig, data: newData }
        });
    }
    /**
     * 新增系列
     */
    const addSeries = () => {
        // 修改data数组  新增空
        const newSeries = {
            name: '新系列' + data.length,
            value: new Array(indicator.length).fill(0)
        }
        const newData = data.concat(newSeries)
        dispatch({
            type: 'radarConfig/update',
            payload: { ...radarConfig, data: newData }
        });
    }
    /**
     * 表单初始值
     */
    const formInitialValue = () => {
        let initialValue = {
            indicator: indicator
        }
        data.forEach(item => {
            initialValue[item.name] = {
                name: item.name,
                value: item.value
            }
        })
        return initialValue
    }
    return (
        <Form
            name="dynamic_form_item"
            {...formItemLayout}
            form={form}
            initialValues={formInitialValue()}
            onValuesChange={() => formChange()}>
            <Collapse
                className={styles.dataConfig}
                bordered={false}
                defaultActiveKey={['indicator', 'data']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                ghost
            >
                <Panel header="指示器维度" key="indicator" className="site-collapse-custom-panel">
                    <Form.List
                        initialValue={indicator}
                        name="indicator"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 4) {
                                        return Promise.reject(new Error('至少三个维度'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => {
                                    return (
                                        <Form.Item
                                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                            label={index === 0 ? '维度' : ''}
                                            required={false}
                                            key={field.key}
                                        >
                                            <Form.Item
                                                {...field}
                                                validateTrigger={['onChange', 'onBlur']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "输入维度名称或删除该维度",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input placeholder="维度名称" style={{ width: '80%' }} />
                                            </Form.Item>
                                            {fields.length > 3 ? (
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => delIndicator(remove, field.name, index)}
                                                />
                                            ) : null}
                                        </Form.Item>
                                    )
                                }
                                )}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => addIndicator(add)}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    > 添加维度</Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Panel>
                <Panel header="数据项" key="data" className="site-collapse-custom-panel">
                    {data.map(series => {
                        return <>
                            <Form.Item
                                label={<> <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => removeSeries(series.name)}
                                />系列名</>
                                }
                                name={[series.name, 'name']}
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.List
                                initialValue={series.value}
                                name={[series.name, "value"]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => {
                                            return (
                                                <Form.Item
                                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? '数据' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        noStyle
                                                    >
                                                        <InputNumber style={{ width: '40%' }} />
                                                    </Form.Item>
                                                </Form.Item>
                                            )
                                        }
                                        )}
                                    </>
                                )}
                            </Form.List>
                        </>
                    })}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => addSeries()}
                            style={{ width: '60%' }}
                            icon={<PlusOutlined />}
                        > 添加系列</Button>
                    </Form.Item>
                </Panel>
            </Collapse>
        </Form>
    )

}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(RadarBaseConfig)

