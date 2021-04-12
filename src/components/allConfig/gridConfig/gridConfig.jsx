import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { unit2, unit1 } from '../../../utils/componentUtils'
import { SketchPicker, ChromePicker } from 'react-color'
import {
    lefttip, toptip, positiontip, containLabeltip,
} from '../../../utils/tipsUtils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Panel } = Collapse;
const { Option } = Select;

/**
 * 网格配置组件，只对网格相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const GridConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = () => {
        let newFormValue = form.getFieldsValue(true)
        props.storeChange('grid', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="grid"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="左侧位置"
                name="gridLeft"
                tooltip={lefttip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="gridTop"
                tooltip={toptip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="右侧位置"
                name="gridRight"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="底部位置"
                name="gridBottom"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="是否包含坐标轴"
                name="gridContainLabel"
                tooltip={containLabeltip}
            >
                <Switch checked={config.gridContainLabel} disabled={!config.show}></Switch>
            </Form.Item>
        </Form>
    )

}
export default GridConfig
