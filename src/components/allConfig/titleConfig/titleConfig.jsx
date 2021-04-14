import React from 'react'
import { Form, Input, InputNumber, Select } from 'antd';
import { unit2 } from '@utils/componentUtils'
import ColorPickerSingle from '../../colorPicker/colorPickerSingle'
import {
    lefttip, toptip, positiontip
} from '@utils/tipsUtils'
import {formateFormData,deBounce} from '@utils/utils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

const { Option } = Select;

/**
 * 标题配置组件，只对标题相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const TitleConfig = (props) => {
    let config = props.config
    console.log("标题配置",props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange =  deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('title', newFormValue);
    },500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('title', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="title"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="标题"
                name="text"
            >
                <Input  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="标题色号"
                name="titleTextColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='titleTextColor' color={config.titleTextColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="标题字体"
                name="titleTextFontFamily"
            >
                <Input  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="标题字体大小"
                name="titleTextFontSize"
            >
                <InputNumber  disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="副标题"
                name="subtext"
            >
                <Input  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="副标题色号"
                name="subtextColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='subtextColor' color={config.subtextColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="副标题字体"
                name="subtextFontFamily"
            >
                <Input  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="副标题字体大小"
                name="subtextFontSize"
            >
                <InputNumber  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="整体水平位置"
                name="titleTextAlign"
            >
                <Select style={{ width: 120 }}  disabled={!config.show} >
                    <Option value="left">左侧</Option>
                    <Option value="center">中间</Option>
                    <Option value="right">右侧</Option>
                    <Option value="auto">自动</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="整体垂直位置"
                name="textVerticalAlign"
            >
                <Select style={{ width: 120 }}   disabled={!config.show}>
                    <Option value="top">上方</Option>
                    <Option value="center">中间</Option>
                    <Option value="bottom">底部</Option>
                    <Option value="auto">自动</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="左侧位置"
                name="titleLeft"
                tooltip={lefttip}
            >
                <Input addonAfter={unit2}  disabled={!config.show}/>
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="titleTop"
                tooltip={toptip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="右侧位置"
                name="titleRight"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="底部位置"
                name="titleBottom"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
        </Form>
    )

}
export default TitleConfig
