import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col, Cascader, Tag, Tooltip } from 'antd';
import ColorPicker from '../../colorPicker/colorPicker'
import ColorPickerSingle from '../../colorPicker/colorPickerSingle'
import { SYSTEM_COLOR, SYSTEM_COLOR_LINEAR_START, SYSTEM_COLOR_LINEAR_END } from '@utils/constants'

import { radialColortip } from '@utils/tipsUtils'
import ColorSpan from './linearColorSpan'
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
    if (newFormValue.colorType == "system,linear") {
      newFormValue.linearColorStart = SYSTEM_COLOR_LINEAR_START[newFormValue.linearColorSeries]
      newFormValue.linearColorEnd = SYSTEM_COLOR_LINEAR_END[newFormValue.linearColorSeries]
    }
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
  const systemColor = () => {
    SYSTEM_COLOR.map(series => {
      return <Option value={series}>
        {
          series.map(itemColor => {
            return <Tag color={itemColor}></Tag>
          })
        }
      </Option>
    })
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
          <Select >
            {
              SYSTEM_COLOR.map(series => {
                return <Option value={series}>
                  {
                    series.map(itemColor => {
                      return <Tag color={itemColor}></Tag>
                    })
                  }
                </Option>
              })
            }
          </Select>
        </Form.Item>
      }
      {
        // 使用系统默认的色系，纯下拉框选择
        colorType[0] == 'system' && colorType[1] == 'linear' && <>

          <Form.Item
            label="渐变类型"
            name="linearType"
          >
            <Select style={{ width: 120 }} >
              <Option value="linear">线性渐变</Option>
              <Option value="radial">径向渐变</Option>
            </Select>
          </Form.Item>
          {
            config.linearType == 'linear' &&
            <Form.Item
              label="渐变方向"
              name="linearColorDirection"
            >
              <Select defaultValue="0,0,0,1" style={{ width: 120 }} >
                <Option value='0,0,0,1'>↑</Option>
                <Option value="0,1,0,0">↓</Option>
                <Option value="0,0,1,0">→</Option>
                <Option value="1,0,0,0">←</Option>
                <Option value="0,0,1,1">↗</Option>
                <Option value="1,1,0,0">↙</Option>
                <Option value="1,0,0,1">↖</Option>
                <Option value="0,1,1,0">↘</Option>
              </Select>
            </Form.Item>
          }

          {
            config.linearType == 'radial' &&
            <Form.Item
              label="渐变方向"
              name="radialColorDirection"
              tooltip={radialColortip}
            >
              <Input></Input>
            </Form.Item>
          }
          <Form.Item
            label="渐变色系"
            name="linearColorSeries"
          >
            <Select onChange={console.log("dadasda")} >
              {
                SYSTEM_COLOR_LINEAR_START.map((series, i) => {
                  return <Option value={i}>
                    {
                      <ColorSpan startColor={series} endColor={SYSTEM_COLOR_LINEAR_END[i]}></ColorSpan>
                    }
                  </Option>
                })
              }
            </Select>
          </Form.Item>
        </>
      }
      {
        // 使用自定义的色系，调用颜色选择器配置
        colorType[0] == 'define' && colorType[1] == 'solid' && <> <Form.Item
          label="添加颜色"
        >
          <ColorPicker updateColor={updateColor} colors={config.color} disabled={!config.show} field='color'></ColorPicker>
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
          {
            config.linearType == 'linear' &&
            <Form.Item
              label="渐变方向"
              name="linearColorDirection"
            >
              <Select defaultValue="0,0,0,1" style={{ width: 120 }} >
                <Option value='0,0,0,1'>↑</Option>
                <Option value="0,1,0,0">↓</Option>
                <Option value="0,0,1,0">→</Option>
                <Option value="1,0,0,0">←</Option>
                <Option value="0,0,1,1">↗</Option>
                <Option value="1,1,0,0">↙</Option>
                <Option value="1,0,0,1">↖</Option>
                <Option value="0,1,1,0">↘</Option>
              </Select>
            </Form.Item>
          }
          {
            config.linearType == 'radial' &&
            <Form.Item
              label="渐变方向"
              name="radialColorDirection"
              tooltip={radialColortip}
            >
              <Input></Input>
            </Form.Item>
          }
          <Form.Item
            label="渐变色起"
            name="linearColorStart"
          >
            <ColorPicker updateColor={updateColor} colors={config.linearColorStart} disabled={!config.show} field='linearColorStart'></ColorPicker>
          </Form.Item>
          <Form.Item
            label="渐变色止"
            name="linearColorEnd"
          >
            <ColorPicker updateColor={updateColor} colors={config.linearColorEnd} disabled={!config.show} field='linearColorEnd'></ColorPicker>
          </Form.Item>
        </>
      }
    </Form>
  )
}
export default ColorConfig
