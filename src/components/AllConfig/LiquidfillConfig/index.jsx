import React from 'react'
import { Collapse, Form, Input, InputNumber, Switch, Select, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { seriesLablePositiontip } from '@/utils/utils.tipsConstant'
import { formateFormData, deBounce } from '@/utils/utils'
import ColorPickerSingle from '@/components/ColorPickSingle/'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};
const layoutLittle = {
    labelCol: { span: 11 },
    wrapperCol: { span: 14 },
};

const { Panel } = Collapse;
const { Option } = Select;

/**
 * 柱图配置组件，只对网格相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const LiquidfillConfig = (props) => {
    let config = props.config
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('liquidfill', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('liquidfill', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="liquidfill"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="图例联动高亮"
                name="show"
            >
                <Switch checked={config.show} ></Switch>
            </Form.Item>
            <Form.Item
                label="半径"
                name="radius"
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item
                label="透明度"
                name="itemStyleOpacity"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="外边框距离"
                name="outlineBorderDistance"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="外边框宽度"
                name="outlineItemStyleBorderWidth"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="外边框颜色"
                name="outlineItemStyleBorderColor"
                {...layoutLittle}
            >
                <ColorPickerSingle updateColor={updateColor} field='outlineItemStyleBorderColor'
                    color={config.outlineItemStyleBorderColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="标签字体大小"
                name="labelTextStyleFontSize"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="波浪上标签颜色"
                name="labelTextStyleColor"
                {...layoutLittle}
            >
                <ColorPickerSingle updateColor={updateColor} field='labelTextStyleColor'
                    color={config.labelTextStyleColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="波浪内部标签颜色"
                name="labelTextStyleInsideColor"
                {...layoutLittle}
            >
                <ColorPickerSingle updateColor={updateColor} field='labelTextStyleInsideColor'
                    color={config.labelTextStyleInsideColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="标签位置"
                name="labelTextStyleAlign"
            >
                <Input ></Input>
            </Form.Item>
        </Form>
    )

}
export default LiquidfillConfig
