import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col, Cascader, Tag, Tooltip } from 'antd';
import ColorPicker from '../../colorPicker/colorPicker'
import ColorPickerSingle from '../../colorPicker/colorPickerSingle'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const { Option } = Select;

/**
 * 颜色配置组件，只对颜色相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const ColorConfig = (props) => {
  let config = props.config
  // const color1 = [new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#7EAAF9" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#3F77DB" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#FEC368" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#DC8901" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#B6A1E5" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#8C6BD4" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#7CC6D1" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#388F98" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#BBDD86" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#7A9930" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#E89BDF" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#79337A" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#93DEB1" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#3D765A" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#E19ABF" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#891948" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#F49A9A" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#A42222" // 100% 处的颜色
  // }], false), new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
  //     offset: 1,
  //     color: "#6B6B6B" // 0% 处的颜色
  // }, {
  //     offset: 0,
  //     color: "#2D2D2D" // 100% 处的颜色
  // }], false)]
  const options = [
    {
      value: 'define',
      label: '自定义颜色',
      children: [
        {
          value: 'solid',
          label: '纯色效果',
        },
        {
          value: 'linear',
          label: '渐变效果',
        },
      ],
    },
    {
      value: 'system',
      label: '调色板色系',
      children: [
        {
          value: 'solid',
          label: '纯色效果',
        },
        {
          value: 'linear',
          label: '渐变效果',
        },
      ],
    },
  ];
  const [form] = Form.useForm();
  /**
   * 表单变化，调用父组件派发方法
   */
  const formChange = () => {
    let newFormValue = form.getFieldsValue(true)
    Object.keys(newFormValue).forEach(item => {
      if (typeof (newFormValue[item]) == "string") {
        let isArr = newFormValue[item].indexOf(',')
        if (isArr != -1) {
          newFormValue[item] = JSON.parse("[" + newFormValue[item] + "]")
        }
      }
    })
    props.storeChange('color', newFormValue);
  }
  const { colorType } = config
  /**
   * 下拉标签变化回调，修改值，调用父组件派发方法
   * @param {*} value 
   * @param {*} key 
   */
  function handleChange(value, key) {
    // console.log(arguments)
    let newFormValue = form.getFieldsValue(true)
    newFormValue[key] = value
    props.storeChange('color', newFormValue);

  }
  /**
   * 通过颜色选择器更改色值变量
   */
  const updateColor = (key, Newcolors) => {
    let newFormValue = form.getFieldsValue(true)
    newFormValue[key] = Newcolors
    handleChange(newFormValue[key], 'color')
    // props.storeChange('color', newFormValue);
  }


  return (
    <Form
      {...layout}
      name="colorConfig"
      form={form}
      initialValues={config}
      onValuesChange={() => formChange()}
    >
      <Form.Item
        label="颜色类型"
        name="colorType"
      >
        <Cascader options={options} placeholder="Please select" />
      </Form.Item>
      {
        // 使用系统默认的色系，纯下拉框选择
        colorType[0] == 'system' && colorType[1] == 'solid' && <Form.Item
          label="色系选择"
          name="color"
        >
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">色系一</Option>
            <Option value="lucy">色系二</Option>
            <Option value="Yiminghe">色系三</Option>
          </Select>
        </Form.Item>
      }
      {
        // 使用系统默认的色系，纯下拉框选择
        colorType[0] == 'system' && colorType[1] == 'linear' && <><Form.Item
          label="渐变方向"
          name="colorDirection"
        >
          <Select defaultValue="0,1,0,0" style={{ width: 120 }} >
            <Option value="0,1,0,0">↓</Option>
            <Option value="0,0,0,1">↑</Option>
            <Option value="0,0,1,0">→</Option>
            <Option value="1,0,0,0">←</Option>
            <Option value="0,0,1,1">↗</Option>
            <Option value="1,1,0,0">↙</Option>
            <Option value="1,0,0,1">↖</Option>
            <Option value="0,1,1,0">↘</Option>
          </Select>
        </Form.Item>
          <Form.Item
            label="色系选择"
            name="color3"
          >
            <Select defaultValue="lucy" style={{ width: 120 }} >
              <Option value="jack">色系一</Option>
              <Option value="lucy">色系二</Option>
              <Option value="Yiminghe">色系三</Option>
            </Select>
          </Form.Item></>
      }
      {
        // 使用自定义的色系，调用颜色选择器配置
        colorType[0] == 'define' && colorType[1] == 'solid' && <> <Form.Item
          label="添加颜色"
        // name="color"
        >
          {/* <Select mode="tags" style={{ width: '100%' }}
            value={ininVal()}
            onChange={(value) => handleChange(value, 'color')} tagRender={tagRender}
            tokenSeparators={[',']}></Select> */}
          <ColorPicker updateColor={updateColor} colors={config.color} field='color'></ColorPicker>
        </Form.Item>
        </>
      }
      {
        // 使用自定义的色系，纯下拉框选择
        colorType[0] == 'define' && colorType[1] == 'linear' && <><Form.Item
          label="渐变类型"
          name="linearType"
        >
          <Select style={{ width: 120 }} >
            <Option value="linear">线性渐变</Option>
            <Option value="radial">径向渐变</Option>
          </Select>
        </Form.Item>
          <Form.Item
            label="渐变方向"
            name="linearColorDirection"
          >
            <Select defaultValue="0,0,0,1" style={{ width: 120 }} >
              <Option value='[0,0,0,1]'>↑</Option>
              <Option value="0,1,0,0">↓</Option>
              <Option value="0,0,1,0">→</Option>
              <Option value="1,0,0,0">←</Option>
              <Option value="0,0,1,1">↗</Option>
              <Option value="1,1,0,0">↙</Option>
              <Option value="1,0,0,1">↖</Option>
              <Option value="0,1,1,0">↘</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="渐变色起"
            name="linearColorStart"
          >
            <ColorPicker updateColor={updateColor} colors={config.linearColorStart} field='linearColorStart'></ColorPicker>
          </Form.Item>
          <Form.Item
            label="渐变色止"
            name="linearColorEnd"
          >
             <ColorPicker updateColor={updateColor} colors={config.linearColorEnd} field='linearColorEnd'></ColorPicker>
          </Form.Item>
        </>
      }
      <Form.Item
        label="x轴位置"
        name="xAxisPosition"
      >
        <Select style={{ width: 120 }} disabled={!config.show} >
          <Option value="top">顶部</Option>
          <Option value="bottom">底部</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}
export default ColorConfig
