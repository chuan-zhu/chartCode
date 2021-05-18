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
const PieConfig = (props) => {
    let config = props.config
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('pie', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('pie', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="pie"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >

            <Form.Item
                label="图例联动高亮"
                name="legendHoverLink"
            >
                <Switch checked={config.legendHoverLink} ></Switch>
            </Form.Item>
            <Form.Item
                label="顺时针排布"
                name="clockwise"
            >
                <Switch checked={config.clockwise} ></Switch>
            </Form.Item>
            <Form.Item
                label="起始角度"
                name="startAngle"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="最小角度"
                name="minAngle"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="南丁格尔图"
                name="roseType"
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item
                label="防止标签重叠策略"
                name="avoidLabelOverlap"
            >
                <Switch checked={config.avoidLabelOverlap} ></Switch>
            </Form.Item>
            <Form.Item
                label="半径"
                name="radius"
            >
                <Input ></Input>
            </Form.Item>
            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="饼图标签" key="pieLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签展示"
                        name="lableShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lableShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签位置"
                        name="labelPosition"
                        {...layoutLittle}
                    // tooltip={seriesLablePositiontip}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='outside'>外部</Option>
                            <Option value='inside'> 内部</Option>
                            <Option value='center'> 居中</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签对齐方式"
                        name="labelAlignTo"
                        {...layoutLittle}
                    // tooltip={seriesLablePositiontip}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='none'>默认值</Option>
                            <Option value='labelLine'> 末端对齐</Option>
                            <Option value='edge'>文字对齐</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="标签字体颜色"
                        name="labelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='labelColor'
                            color={config.labelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="labelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签内容"
                        name="labelFormatter"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                </Panel>
                <Panel header="标签引导线" key="pieLabelLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="引导线展示"
                        name="labelLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.labelLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线平滑展示"
                        name="smooth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线颜色"
                        name="labelLineLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='labelLineLineStyleColor'
                            color={config.labelLineLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="引导线宽度"
                        name="LabelLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线类型"
                        name="LabelLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="引导线第一段长度"
                        name="length"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线第二段长度"
                        name="length2"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="扇形区块配置" key="pie" className="site-collapse-custom-panel">
                    <Form.Item
                        label="边框颜色"
                        name="itemStyleBorderColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='itemStyleBorderColor'
                            color={config.itemStyleBorderColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="边框宽度"
                        name="itemStyleBorderWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="边框类型"
                        name="itemStyleBorderType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="阴影长度"
                        name="itemStyleShadowBlur"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="阴影颜色"
                        name="itemStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='itemStyleShadowColor'
                            color={config.itemStyleShadowColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="内外圆角半径"
                        name="itemStyleBorderRadius"
                        {...layoutLittle}
                    >
                        <Input></Input>
                    </Form.Item>
                </Panel>
                <Panel header="高亮配置" key="emphasis" className="site-collapse-custom-panel">
                    <Form.Item
                        label="放大效果"
                        name="emphasisScale"
                    >
                        <Switch checked={config.emphasisScale} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="放大尺寸"
                        name="emphasisScaleSize"
                    >
                        <InputNumber  ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="聚焦效果"
                        name="emphasisFocus"
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='none'>不淡出</Option>
                            <Option value='self'>聚焦当前数据</Option>
                            <Option value='series'>聚焦当前系列</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="展示标签"
                        name="emphasisLabelShow"
                    >
                         <Switch checked={config.emphasisLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签颜色"
                        name="emphasisLabelColor"
                    >
                        <ColorPickerSingle updateColor={updateColor} field='emphasisLabelColor'
                            color={config.emphasisLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签大小"
                        name="emphasisLabelFontSize"
                    >
                        <InputNumber  ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="边框宽度"
                        name="itemStyleBorderWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="边框类型"
                        name="itemStyleBorderType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="阴影长度"
                        name="itemStyleShadowBlur"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="阴影颜色"
                        name="itemStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='itemStyleShadowColor'
                            color={config.itemStyleShadowColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="内外圆角半径"
                        name="itemStyleBorderRadius"
                        {...layoutLittle}
                    >
                        <Input></Input>
                    </Form.Item>
                </Panel>

            </Collapse>
        </Form>
    )

}
export default PieConfig
