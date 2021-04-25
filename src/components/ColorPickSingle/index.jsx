import React, { useState } from 'react'
import { Switch } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'
import styles from './index.less'
const ColorPickerSingle = (props) => {
    // 是否展示颜色选择器
    const [showPicker, setShowPicker] = useState(false)
    //当前选中的颜色   起始颜色如果父组件没有配置，取默认值
    const [color, setColor] = useState(props.color ? props.color : "#fff");
    //是否可以编辑（进行选择）
    const { disabled = false } = props

    const handleChange = colorObj => {
        const colorRule = /^#[0-9a-fA-F]{6}$/
        console.log(color, colorObj, colorRule.test(color))
        if (colorRule.test(color)) {
            setColor(colorObj.hex.toString())
            props.updateColor(props.field, colorObj.hex.toString())
        } else {
            const { r, g, b, a } = colorObj.rgb
            const rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
            setColor(rgba)
            props.updateColor(props.field, rgba)
        }
    };
    const swatchClick = () => {
        if (!disabled) setShowPicker(!showPicker)
    }
    const handleClose = () => {
        if (!disabled) setShowPicker(false)
    }

    return (
        <div>
            <div className={styles.swatch} onClick={swatchClick}>
                <div className={styles.color} style={{ background: color }} />
            </div>
            {
                showPicker && <div className={styles.popover}>
                    <div className={styles.cover} onClick={handleClose} />
                    <SketchPicker width="180px" color={color} onChangeComplete={handleChange}></SketchPicker>
                </div>
            }
        </div>
    )

}


export default ColorPickerSingle