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
const LineConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('line', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('line', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="line"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="名称"
                name="lineName"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="图例联动高亮"
                name="lineLegendHoverLink"
            >
                <Switch checked={config.lineLegendHoverLink} ></Switch>
            </Form.Item>

            <Form.Item
                label="展示标记"
                name="lineShowSymbol"
            >
                <Switch checked={config.lineShowSymbol} ></Switch>
            </Form.Item>
            <Form.Item
                label="标记图形"
                name="lineSymbol"
            >
                <Select style={{ width: 120 }}  >
                
                <Option value='emptyCircle'>空心圆形</Option>
                    <Option value='circle'>圆形</Option>
                    <Option value='rect'>矩形</Option>
                    <Option value='roundRect'>椭圆矩形</Option>
                    <Option value='triangle'>三角形</Option>
                    <Option value='diamond'>菱形</Option>
                    <Option value='pin'>针型</Option>
                    <Option value='arrow'> 箭头</Option>
                    <Option value='none'>无</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="标记大小"
                name="lineSymbolSize"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="标记旋转角度"
                name="lineSymbolRotate"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="标记旋转角度"
                name="lineSymbolOffset "
            >
                <Input ></Input>
            </Form.Item>







            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="线图标签" key="lineLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签展示"
                        name="lineLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签位置"
                        name="lineLabelPosition"
                        tooltip={seriesLablePositiontip}
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签距离图形距离"
                        name="lineLabelDistance"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="lineLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签偏移"
                        name="lineLabelOffset"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签内容格式"
                        name="lineLabelFormatter"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>

                    <Form.Item
                        label="标签字体颜色"
                        name="lineLabelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineLabelColor'
                            color={config.lineLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="lineLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="折线端点标签" key="lineEndLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="端点标签展示"
                        name="lineEndLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineEndLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签距离图形距离"
                        name="lineEndLabelDistance"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="lineEndLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签偏移"
                        name="lineEndLabelOffset"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签内容格式"
                        name="lineEndLabelFormatter"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>

                    <Form.Item
                        label="标签字体颜色"
                        name="lineEndLabelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineEndLabelColor'
                            color={config.lineEndLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="lineEndLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>

                <Panel header="标签引导线" key="lineLabelLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="引导线展示"
                        name="lineLabelLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineLabelLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="是否在图形上方展示"
                        name="lineLabelLineShowAbove"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineLabelLineShowAbove} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线平滑展示"
                        name="lineLabelSmooth"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineLabelSmooth} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线颜色"
                        name="lineLabelLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineLabelLineStyleColor'
                            color={config.lineLabelLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="引导线宽度"
                        name="lineLabelLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线类型"
                        name="lineLabelLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="折线拐点标志配置" key="lineItemStyle" className="site-collapse-custom-panel">
                    {/* <Form.Item
                        label="边框颜色"
                        name="lineItemStyleBorderColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineItemStyleBorderColor'
                             color={config.lineItemStyleBorderColor}></ColorPickerSingle>
                    </Form.Item> */}
                    <Form.Item
                        label="边框宽度"
                        name="lineItemStyleBorderWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="边框类型"
                        name="lineItemStyleBorderType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="线条样式配置" key="lineStyle" className="site-collapse-custom-panel">
                    {/* <Form.Item
                        label="线条颜色"
                        name="lineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineItemStyleBorderColor'
                             color={config.lineItemStyleBorderColor}></ColorPickerSingle>
                    </Form.Item> */}
                    <Form.Item
                        label="线条宽度"
                        name="lineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="线条类型"
                        name="lineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="线条透明度"
                        name="lineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="区域填充样式配置" key="areaStyle" className="site-collapse-custom-panel">
                    <Form.Item
                        label="填充颜色"
                        name="lineAreaStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineAreaStyleColor'
                            color={config.lineAreaStyleColor}></ColorPickerSingle>
                    </Form.Item>

                    <Form.Item
                        label="图形区域起始位置"
                        name="lineAreaStyleOrigin"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='auto'>填充坐标轴轴线到数据间的区域</Option>
                            <Option value='start'>填充坐标轴底部到数据间的区域</Option>
                            <Option value='end'>填充坐标轴顶部到数据间的区域</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="图形透明度"
                        name="lineAreaStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="高亮状态配置" key="emphasis" className="site-collapse-custom-panel">
                    <Form.Item
                        label="拐点标志放大"
                        name="lineEmphasisScale"
                        {...layoutLittle}
                    >
                        <Switch checked={config.lineEmphasisScale} ></Switch>
                    </Form.Item>

                    <Form.Item
                        label="图形聚焦类型"
                        name="lineEmphasisFocus"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='none'>不淡出其它图形</Option>
                            <Option value='self'>只聚焦（不淡出）当前高亮的数据的图形</Option>
                            <Option value='series'>聚焦当前高亮的数据所在的系列的所有图形</Option>
                        </Select>
                    </Form.Item>
                    {
                        config.lineEmphasisFocus !=='none' &&  <Form.Item
                        label="淡出范围"
                        name="lineEmphasisFocus"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='coordinateSystem'>坐标系</Option>
                            <Option value='series'>系列</Option>
                            <Option value='global'>全局</Option>
                        </Select>
                    </Form.Item>
                    }
                   
                    <Form.Item
                        label="图形透明度"
                        name="lineAreaStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>


            </Collapse>
        </Form>
    )


}
export default LineConfig
