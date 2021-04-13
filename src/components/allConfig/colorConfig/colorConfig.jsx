import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col, Cascader, Tag } from 'antd';
import ColorPicker from '../../colorPicker/colorPicker'

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
    const updateColor = (key, colorVal) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[key].push(colorVal)
        // console.log(newFormValue, key, colorVal, newFormValue[key])
        handleChange(newFormValue[key], 'color')
        // props.storeChange('color', newFormValue);
    }
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        return (
            <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {label}
            </Tag>
        );
    }
    const ininVal = () => {
        console.log(config.color)
        return config.color
    }









    
      const [tags,setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3'])
      const [inputVisible,setInputVisible] = useState(false)
      const [inputValue,setInputValue] = useState()
    const handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
      };
    
      const showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
    
      const handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };
    
      const handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      };
    
      const saveInputRef = input => {
        this.input = input;
      };
    
      const forMap = tag => {
        const tagElem = (
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleClose(tag);
            }}
          >
            {tag}
          </Tag>
        );
        return (
          <span key={tag} style={{ display: 'inline-block' }}>
            {tagElem}
          </span>
        );
      };
    const tagChild = tags.map(forMap);




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
                colorType[0] == 'define' && colorType[1] == 'solid' &&<> <Form.Item
                    label="添加颜色"
                    // name="color"
                >
                    <Select mode="tags" style={{ width: '100%' }}
                        value={ininVal()}
                        onChange={(value) => handleChange(value, 'color')} tagRender={tagRender}
                        tokenSeparators={[',']}></Select>
                </Form.Item>
                    <ColorPicker updateColor={updateColor}></ColorPicker>
                    
                    


                    <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}




                    </>
            }
            {
                // 使用自定义的色系，纯下拉框选择
                colorType[0] == 'define' && colorType[1] == 'linear' && <><Form.Item
                    label="渐变方向"
                    name="colorDirection"
                >
                    <Select defaultValue="lucy" style={{ width: 120 }} >
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
                        name="color"
                    >
                        <Select defaultValue="lucy" style={{ width: '100%' }} >
                            <Option value="jack">色系一</Option>
                            <Option value="lucy">色系二</Option>
                            <Option value="Yiminghe">色系三</Option>
                        </Select>
                    </Form.Item></>
            }


        </Form>
    )

}
export default ColorConfig
