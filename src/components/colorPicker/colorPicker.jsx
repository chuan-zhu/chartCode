import React, {  useState, useEffect } from 'react'
import {  Button, Switch,  Tag, message } from 'antd';
import { CloseOutlined, SettingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'

/**
 * 颜色选择器组件，只对颜色相关的配置修改，点击修改颜色之后，调用父组件方法，将修改后的颜色交由父组件更改状态
 * @param {*} props 父组件传递的参数，包含默认颜色，配置修改回调方法
 * @returns 
 */
const ColorPicker = (props) => {
    console.log(props)
    // 是否展示颜色选择器
    const [showPicker, setShowPicker] = useState(false)
    //当前选中的颜色
    const [color, setColor] = useState("#000");
    //颜色标签
    const [tags, setTags] = useState(props.colors)
    //颜色标签修改时，调用父组件更新状态
    useEffect(() => {
        // console.log('新颜色', tags)
        props.updateColor(props.field, tags)
    }, [tags]);
    // 颜色选择器选择回调，
    const handleChange = color => {
        setColor(color.hex.toString())
    };
    /**
     * 添加颜色标签 调用父组件方法，修改颜色
     */
    const addColor = () => {
        let find = tags.findIndex(item => item == color)
        if (find == -1) {
            setTags([...tags, color])
        } else {
            message.error('该色值已经存在，请不要重复添加！');
        }
    }
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
        },
    });
    /**
     * 删除颜色标签
     * @param {*} key 
     */
    const handleClose = (key) => {
        const newTags = tags.filter(tag => tag !== key);
        setTags(newTags)
    }
    return (<>
        {
            // 标签展示
            tags.map(item => {
                return <Tag
                    className="edit-tag"
                    key={item}
                    closable={true}
                    onClose={() => handleClose(item)}
                    color={item}
                >
                    <span >
                        {item}
                    </span>
                </Tag>
            })
        }
        <div>

            <div style={styles.swatch} onClick={() => setShowPicker(!showPicker)}>
                <div style={styles.color}></div>
            </div>
            <Switch size="small" checked={showPicker} checkedChildren={<CloseOutlined />} unCheckedChildren={<SettingOutlined />} onClick={(checked) => setShowPicker(checked)} />

            <Button type="link" size='small' icon={<PlusCircleOutlined />} onClick={addColor}></Button>
            {
                showPicker && <SketchPicker color={color} disableAlpha={true} onChangeComplete={handleChange}></SketchPicker>
            }
        </div>
    </>
    )

}
export default ColorPicker
