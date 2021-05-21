import React, { useEffect } from 'react'
import { Collapse, Switch } from 'antd';
import { Form, Input, Button, InputNumber, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CaretRightOutlined, ImportOutlined, ClearOutlined } from '@ant-design/icons';
import _ from 'lodash'
import { connect } from 'umi'
import styles from './wordCloudBaseConfig.less'
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
const wordCloudBaseConfig = ({ wordCloudConfig, dispatch }) => {
    let { data } = wordCloudConfig
    const [form] = Form.useForm();
    let initialValue = {}
    data.forEach((item, index) => {
        initialValue[index] = {
            name: item.name,
            value: item.value
        }
    })
    form.setFieldsValue(initialValue)
    /**
     * 表单内容更新回调
     */
    const formChange = deBounce((changedValues, allValues) => {
        let newFormValue = form.getFieldsValue(true)
        // console.log('newFormValue', newFormValue)
        let newData = _.cloneDeep(data)
        const index = Object.keys(changedValues)[0]
        newData[index] = {
            ...newData[index],
            ...changedValues[index]
        }
        dispatch({
            type: 'wordCloudConfig/update',
            payload: { ...wordCloudConfig, data: newData }
        });
    }, 500)

    /**
     * 删除当前数据项
     * @param {} dataName 
     */
    const removeSeries = (dataName) => {
        // 修改data数组  删除
        const newData = data.filter(item => item.name !== dataName)
        dispatch({
            type: 'wordCloudConfig/update',
            payload: { ...wordCloudConfig, data: newData }
        });
    }
    /**
     * 新增系列
     */
    const addSeries = () => {
        // 修改data数组  新增空
        const newSeries = {
            name: '新标签' + data.length,
            value: 0
        }
        const newData = data.concat(newSeries)
        dispatch({
            type: 'wordCloudConfig/update',
            payload: { ...wordCloudConfig, data: newData }
        });
    }
    /**
     * 清空数据
     */
    const cleanData = () => {
        dispatch({
            type: 'wordCloudConfig/update',
            payload: { ...wordCloudConfig, data: [] }
        });
    }
    /**
     * 导入数据
     */
    const importData = () => {

    }
    /**
     * 表单初始值
     */
    const formInitialValue = () => {
        let initialValue = {}
        data.length > 0 && data.forEach(item => {
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
            // initialValues={formInitialValue()}
            onValuesChange={(changedValues, allValues) => formChange(changedValues, allValues)}>
            <Collapse
                className={styles.dataConfig}
                bordered={false}
                defaultActiveKey={['indicator', 'data']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                ghost
            >
                <Panel header="数据项" key="indicator" className="site-collapse-custom-panel">
                    <Space style={{ marginBottom: 8 }}>
                        <Button type="primary" onClick={() => addSeries()} icon={<PlusOutlined />}  > 添加数据</Button>
                        <Button type="primary" onClick={() => importData()} icon={<ImportOutlined />} > 导入数据</Button>
                        <Button type="primary" icon={<ClearOutlined />} onClick={() => cleanData()}>清空数据</Button>
                    </Space>
                    {data.map((item, index) => {
                        return <>
                            <Form.Item
                                label={<> <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    style={{ marginRight: 5 }}
                                    onClick={() => removeSeries(item.name)}
                                />标签名</>
                                }
                                name={[index, 'name']}
                            >
                                <Input style={{ width: '80%' }}></Input>
                            </Form.Item>
                            <Form.Item
                                label='数值'
                                name={[index, 'value']}
                            >
                                <InputNumber style={{ width: '40%' }}></InputNumber>
                            </Form.Item>
                        </>
                    })}
                </Panel>
            </Collapse>
        </Form>
    )

}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(wordCloudBaseConfig)

