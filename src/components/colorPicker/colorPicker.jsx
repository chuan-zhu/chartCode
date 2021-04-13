import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col, Cascader } from 'antd';

import { CloseOutlined, SettingOutlined ,PlusCircleOutlined} from '@ant-design/icons';

import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

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
 * 颜色选择器组件，只对颜色相关的配置修改，点击修改颜色之后，调用父组件方法，将修改后的颜色交由父组件更改状态
 * @param {*} props 父组件传递的参数，包含默认颜色，配置修改回调方法
 * @returns 
 */
const ColorPicker = (props) => {
    // console.log(props)
    // props.colorChange('color', newFormValue);
    // 是否展示颜色选择器
    const [showPicker, setShowPicker] = useState(false)
    const [color, setColor] = useState("#000");
    // 颜色选择器选择回调，
    const handleChange = color => {
        setColor( color.hex.toString())
    };
    /**
     * 添加颜色 调用父组件方法，修改颜色
     */
    const addColor = ()=>{
        props.updateColor('color',color)
    }
    const styles = reactCSS({
        'default': {
            color: {
                width: '44px',
                height: '14px',
                borderRadius: '2px',
                lineHeight:'14px',
                textAlign:'center',
                background: `${color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'relative',
                zIndex: '2',
            },
            cover: {
                position: 'absolute',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });
    return (<>
        <div style={styles.swatch} onClick={() => setShowPicker(true)}>
            <div style={styles.color}></div>  
        </div>
            <Switch size="small" checked={showPicker} checkedChildren={<CloseOutlined /> } unCheckedChildren={<SettingOutlined />} onClick={(checked)=>setShowPicker(checked)}/>
           
            <Button type="primary" size='small' icon={ <PlusCircleOutlined />} onClick={addColor}>添加 </Button>
        {
            showPicker &&   <SketchPicker color={color} disableAlpha={true} onChangeComplete={handleChange}></SketchPicker>
        }

    </>


    )

}
export default ColorPicker
