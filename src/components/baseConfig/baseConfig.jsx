import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux'
import './baseConfig.css'
import { CONFIG} from '../../redux/action-types'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Panel } = Collapse;
const { Option } = Select;


const BaseConfig = (props) => {
    let {config} = useSelector((state) => ({ config: state.config, }));
    console.log(config )
    // 不可编辑的数组
    let [disabled, setDisabled] = useState({})
    const [form] = Form.useForm();
    let dispatch = useDispatch(); //取得派发方法
    /**
     * 图例展示点击回调
     * @param {*} checked 
     * @param {*} e 
     * @param {*} key 
     */
    const legendConfig = (checked, e, key) => {
        e.stopPropagation();//阻止冒泡
        let newDisabled = { ...disabled }
        newDisabled[key] = !checked
        setDisabled(newDisabled)
        console.log(disabled)
    }
    const formChange = () =>{
        console.log(form.getFieldsValue(true))
        let newFormValue = form.getFieldsValue(true)
        dispatch({
            type: CONFIG, payload:  newFormValue 
        });
    }
    
    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={ {...config}}
            onValuesChange = {() =>formChange()}
        >
            <Collapse
                bordered={false}
                defaultActiveKey={[1, 'legend', 'grid', 4]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >

                <Panel header="画布" key="1" className="site-collapse-custom-panel">
                    <Form.Item
                        label="尺寸"
                        name="size"
                    >
                        <InputNumber /> ~ <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="标题"
                        name="text"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="副标题"
                        name="subtext"
                    >
                        <Input />
                    </Form.Item>
                </Panel>
                <Panel header="图例" key="legend" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked onClick={(checked, e) => legendConfig(checked, e, 'legend')} />
                    }>
                    <Form.Item
                        label="水平位置"
                        name="legendLeft"
                    >
                        <Select  style={{ width: 120 }} disabled={disabled.legend} >
                            <Option value="left">左侧</Option>
                            <Option value="center">中间</Option>
                            <Option value="right">右侧</Option>
                            <Option value="auto">自动</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="垂直位置"
                        name="legendTop"
                    >
                        <Select  style={{ width: 120 }} disabled={disabled.legend}>
                            <Option value="top">上方</Option>
                            <Option value="center">中间</Option>
                            <Option value="bottom">底部</Option>
                            <Option value="auto">自动</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="样式类型"
                        name="legendIcon"
                    >
                        <Select  style={{ width: 120 }} disabled={disabled.legend} >
                            <Option value="circle">圆形</Option>
                            <Option value="rect">矩形</Option>
                            <Option value="roundRect">圆角矩形</Option>
                            <Option value="triangle">三角</Option>
                            <Option value="diamond">菱形</Option>
                            <Option value="pin">针</Option>
                            <Option value="arrow">箭头</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="排布方向"
                        name="legendOrient"
                    >
                        <Select  style={{ width: 120 }} disabled={disabled.legend}>
                            <Option value='horizontal'>垂直排放</Option>
                            <Option value='vertical'>水平排放</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="网格" key="grid" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked onClick={(checked, e) => legendConfig(checked, e, 'grid')} />
                    }
                >
                    <Form.Item
                        label="左侧距离"
                        name="gridLeft"
                    >
                        <Input
                            type="text" defaultValue='20' disabled={disabled.grid}
                            style={{
                                width: 100,
                            }}
                        />
                        <Select defaultValue='%' disabled={disabled.grid}
                            style={{
                                width: 80,
                                margin: '0 8px',
                            }}
                        >
                            <Option value="%">%</Option>
                            <Option value="px">px</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="右侧距离"
                        name="gridRight"
                    >
                        <Input
                            type="text" defaultValue='20' disabled={disabled.grid}
                            style={{
                                width: 100,
                            }}
                        />
                        <Select defaultValue='%' disabled={disabled.grid}
                            style={{
                                width: 80,
                                margin: '0 8px',
                            }}
                        >
                            <Option value="%">%</Option>
                            <Option value="px">px</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="上方距离"
                        name="gridTop"
                    >
                        <Input
                            type="text" defaultValue='20' disabled={disabled.grid}
                            style={{
                                width: 100,
                            }}
                        />
                        <Select defaultValue='%' disabled={disabled.grid}
                            style={{
                                width: 80,
                                margin: '0 8px',
                            }}
                        >
                            <Option value="%">%</Option>
                            <Option value="px">px</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="底部距离"
                        name="gridBottom"
                    >
                        <Input
                            type="text" defaultValue='20' disabled={disabled.grid}
                            style={{
                                width: 100,
                            }}
                        />
                        <Select defaultValue='%' disabled={disabled.grid}
                            style={{
                                width: 80,
                                margin: '0 8px',
                            }}
                        >
                            <Option value="%">%</Option>
                            <Option value="px">px</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="滚动展示" key="4" className="site-collapse-custom-panel">
                    <p>aaa</p>
                </Panel>

            </Collapse>
        </Form>
    )

}
export default BaseConfig
