import React from 'react'
import { Form, Input, Select, InputNumber } from 'antd';
import { unit2 } from '@/components/AllConfig/Config/'
import { triggertip ,formattertip} from '@/utils/utils.tipsConstant'
import { formateFormData, deBounce } from '@/utils/utils'
import ColorPickerSingle from '@/components/ColorPickSingle/'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const { Option } = Select;
/**
 * 提示配置组件，只对提示内容相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const TooltipConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('tooltip', newFormValue);
    }, 500)
    /**
    * 通过颜色选择器更改色值变量
    */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('tooltip', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="tooltip"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="触发类型"
                name="trigger"
                tooltip={triggertip}
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="item">数据项图形触发</Option>
                    <Option value="axis"> 坐标轴触发</Option>
                    <Option value="none">不触发</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="触发条件"
                name="triggerOn"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="mousemove">鼠标移动时触发</Option>
                    <Option value="click"> 点击时触发</Option>
                    <Option value="none">不触发</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="背景颜色"
                name="backgroundColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='backgroundColor'
                    disabled={!config.show} color={config.backgroundColor}></ColorPickerSingle>

            </Form.Item>
            <Form.Item
                label="边框颜色"
                name="borderColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='borderColor'
                    disabled={!config.show} color={config.borderColor}></ColorPickerSingle>

            </Form.Item>
            <Form.Item
                label="边框宽度"
                name="borderWidth"
            >
                <InputNumber disabled={!config.show} ></InputNumber>
            </Form.Item>
            <Form.Item
                label="边框内边距"
                name="padding"
            >
                <InputNumber disabled={!config.show} ></InputNumber>
            </Form.Item>
            <Form.Item
                label="内容格式"
                name="formatterType"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="string">字符串模板</Option>
                    <Option value="function"> 回调函数</Option>
                </Select>
            </Form.Item>
            {
                config.formatterType == 'string' &&<Form.Item
                label="内容"
                name="formatter"
                tooltip={formattertip}
            >
                <Input ></Input>
            </Form.Item>
            }
        </Form>
    )

}
export default TooltipConfig
