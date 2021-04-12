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
 * 颜色配置组件，只对颜色相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const ColorConfig = (props) => {
    let config = props.config
    console.log(props)
    const color1 = [new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#7EAAF9" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#3F77DB" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#FEC368" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#DC8901" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#B6A1E5" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#8C6BD4" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#7CC6D1" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#388F98" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#BBDD86" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#7A9930" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#E89BDF" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#79337A" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#93DEB1" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#3D765A" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#E19ABF" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#891948" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#F49A9A" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#A42222" // 100% 处的颜色
    }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
        offset: 1,
        color: "#6B6B6B" // 0% 处的颜色
    }, {
        offset: 0,
        color: "#2D2D2D" // 100% 处的颜色
    }], false)],

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
            name="color"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="配置方式"
                name="configType"
            >
                <Select style={{ width: 120 }}  >
                    <Option value='define'>自定义颜色</Option>
                    <Option value='system'>调色板色系</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="颜色类型"
                name="colorType"
            >
                <Select style={{ width: 120 }}  >
                    <Option value='solid'>纯色效果</Option>
                    <Option value='linear'> 渐变效果</Option>
                </Select>
            </Form.Item>
            <></>


        </Form>
    )

}
export default ColorConfig
