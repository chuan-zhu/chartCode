import React, {  useState } from 'react'
import {  Switch  } from 'antd';

import { CloseOutlined, SettingOutlined } from '@ant-design/icons';

import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

/**
 * 颜色选择器组件，只对颜色相关的配置修改，点击修改颜色之后，调用父组件方法，将修改后的颜色交由父组件更改状态
 * @param {*} props 父组件传递的参数，包含默认颜色，配置修改回调方法
 * @returns 
 */
const ColorPickerSingle = (props) => {
    console.log(props)
    // 是否展示颜色选择器
    const [showPicker, setShowPicker] = useState(false)
    //当前选中的颜色   起始颜色如果父组件没有配置，取默认值
    const [color, setColor] = useState( props.color ? props.color:"#fff");
    
    // 颜色选择器选择回调，更新色值，父组件修改状态
    const handleChange = color => {
        setColor(color.hex.toString())
        props.updateColor(props.field, color.hex.toString())
    };
    
    /**
     * 颜色去反
     * @param {*} OldColorValue 
     * @returns 
     */
    const ColorReverse = (OldColorValue) => {
        var OldColorValue = "0x" + OldColorValue.replace(/#/g, "");
        var str = "000000" + (0xFFFFFF - OldColorValue).toString(16);
        return "#" + str.substring(str.length - 6, str.length);
    }
    const styles = reactCSS({
        'default': {
            color: {
                width: '25px',
                height: '14px',
                borderRadius: '2px',
                lineHeight: '14px',
                textAlign: 'center',
                background: `${color}`,
                fontSize: '12px',
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
                verticalAlign: "middle"
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
            pickerWrap:{
                position:'relative',
                width:'0',
                height:'0px'   ,
                zIndex:20  ,  
            },
            picker:{
                position:'absolute',
            }
        },
    });
    
    return (<>
        <div>
            <div style={styles.swatch} onClick={() => setShowPicker(!showPicker)}>
                <div style={styles.color}></div>
            </div>
            <Switch size="small" checked={showPicker} checkedChildren={<CloseOutlined />} unCheckedChildren={<SettingOutlined />} onClick={(checked) => setShowPicker(checked)} />
            {
                showPicker && <div style={styles.pickerWrap}> <SketchPicker width="180px" color={color} disableAlpha={true} onChangeComplete={handleChange}></SketchPicker></div>
            }
        </div>
    </>
    )

}
export default ColorPickerSingle
