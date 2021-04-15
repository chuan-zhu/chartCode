import React from 'react'
import { Collapse, Form, Input, InputNumber, Switch, Select, Col } from 'antd';
import ColorPickerSingle from '../../colorPicker/colorPickerSingle'
import { unit2, unit1 } from '@utils/componentUtils'
import {
    lefttip, toptip, positiontip,
} from '@utils/tipsUtils'
import { formateFormData, deBounce } from '@utils/utils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

const { Option } = Select;

/**
 * 图例配置组件，只对图例相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const LegendConfig = (props) => {
    let config = props.config
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('legend', newFormValue);
    }, 500)
    /**
  * 通过颜色选择器更改色值变量
  */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('legend', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="legend"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="样式类型"
                name="legendIcon"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="circle">圆形</Option>
                    <Option value="rect">矩形</Option>
                    <Option value="roundRect">圆角矩形</Option>
                    <Option value="triangle">三角</Option>
                    <Option value="diamond">菱形</Option>
                    <Option value="pin">针</Option>
                    <Option value="arrow">箭头</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="图例间距"
                name="legendItemGap"
            >
                <InputNumber disabled={!config.show}></InputNumber>
            </Form.Item>
            <Form.Item
                label="图例宽度"
                name="legendItemWidth"
            >
                <InputNumber disabled={!config.show}></InputNumber>
            </Form.Item>
            <Form.Item
                label="图例高度"
                name="legendItemHeight"
            >
                <InputNumber disabled={!config.show}></InputNumber>
            </Form.Item>
            <Form.Item
                label="点击控制"
                name="legendSelectedMode"
            >
                <Switch checked={config.legendSelectedMode} disabled={!config.show}></Switch>
            </Form.Item>
            <Form.Item
                label="文本颜色"
                name="legendTextColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='legendTextColor' disabled={!config.show} color={config.legendTextColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="字体"
                name="legendFontFamily"
            >
                <input disabled={!config.show}></input>
            </Form.Item>
            <Form.Item
                label="字体大小"
                name="legendFontSize"
            >
                <InputNumber disabled={!config.show}></InputNumber>
            </Form.Item>
            <Form.Item
                label="排布方向"
                name="legendOrient"
            >
                <Select style={{ width: 120 }} disabled={!config.show}>
                    <Option value='horizontal'>水平排放</Option>
                    <Option value='vertical'>垂直排放</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="左侧位置"
                name="legendLeft"
                tooltip={lefttip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="legendTop"
                tooltip={toptip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="右侧位置"
                name="legendRight"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="底部位置"
                name="legendBottom"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
        </Form>
    )

}
export default LegendConfig
