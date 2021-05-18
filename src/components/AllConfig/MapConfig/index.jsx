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
const MapConfig = (props) => {
    let config = props.config
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('map', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('map', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="map"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="位置"
                name="center"
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item
                label="半径"
                name="radius"
            >
                <Input ></Input>
            </Form.Item>
            <Form.Item
                label="起始角度"
                name="startAngle"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="分割段数"
                name="splitNumber"
            >
                <InputNumber ></InputNumber>
            </Form.Item>
            <Form.Item
                label="绘制类型"
                name="shape"
            >
                <Select style={{ width: 120 }}  >
                    <Option value='polygon'>多边形</Option>
                    <Option value='circle'> 圆形</Option>
                </Select>
            </Form.Item>

            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="指示器名称" key="name" className="site-collapse-custom-panel">
                    <Form.Item
                        label="指示器名称展示"
                        name="nameShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.nameShow} ></Switch>
                    </Form.Item>

                    <Form.Item
                        label="指示器名称颜色"
                        name="nameColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='nameColor'
                            color={config.nameColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="指示器名称大小"
                        name="nameFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Form.Item
                    label="名称和轴距离"
                    name="nameGap"
                >
                    <InputNumber></InputNumber>
                </Form.Item>
                <Panel header="坐标轴轴线" key="axisLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="轴线展示"
                        name="axisLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.axisLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="轴线箭头"
                        name="axisLineSymbol"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="轴线箭头大小"
                        name="axisLineSymbolSize"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="轴线箭头偏移"
                        name="axisLineSymbolOffset"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="轴线颜色"
                        name="axisLineLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='axisLineLineStyleColor'
                            color={config.axisLineLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="轴线宽度"
                        name="axisLineLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="轴线类型"
                        name="axisLineLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="线段末端类型"
                        name="axisLineLineStyleCap"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='butt'>方形</Option>
                            <Option value='round'> 圆形</Option>
                            <Option value='square'> 方形（宽度和线段相同）</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="轴线阴影"
                        name="axisLineLineStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='axisLineLineStyleShadowColor'
                            color={config.axisLineLineStyleShadowColor}></ColorPickerSingle>

                    </Form.Item>
                    <Form.Item
                        label="轴线透明度"
                        name="axisLineLineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度" key="axisTick" className="site-collapse-custom-panel">
                    <Form.Item
                        label="轴刻度展示"
                        name="axisTickShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.axisTickShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="轴刻度长度"
                        name="axisTickLength"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>

                    <Form.Item
                        label="轴刻度颜色"
                        name="axisTickLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='axisTickLineStyleColor'
                            color={config.axisTickLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="轴刻度宽度"
                        name="axisTickLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="轴刻度类型"
                        name="axisTickLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="轴刻度末端类型"
                        name="axisTickLineStyleCap"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='butt'>方形</Option>
                            <Option value='round'> 圆形</Option>
                            <Option value='square'> 方形（宽度和线段相同）</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="轴刻度阴影"
                        name="axisTickLineStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='axisTickLineStyleShadowColor'
                            color={config.axisTickLineStyleShadowColor}></ColorPickerSingle>

                    </Form.Item>
                    <Form.Item
                        label="轴刻度透明度"
                        name="axisTickLineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度标签" key="axisLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签展示"
                        name="axisLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.axisLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转"
                        name="axisLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签与轴线距离"
                        name="axisLabelMargin"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="显示最小 tick "
                        name="axisLabelShowMinLabel"
                        {...layoutLittle}
                    >
                        <Switch checked={config.axisLabelShowMinLabel} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="显示最大 tick "
                        name="axisLabelShowMaxLabel"
                        {...layoutLittle}
                    >
                        <Switch checked={config.axisLabelShowMaxLabel} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签颜色"
                        name="axisLabelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='axisLabelColor'
                            color={config.axisLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签大小"
                        name="axisLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签水平对其方式"
                        name="axisLabelAlign"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='left'>左侧</Option>
                            <Option value='center'> 居中</Option>
                            <Option value='right'> 右侧</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签垂直对其方式"
                        name="axisLabelVerticalAlign"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='top'>顶部</Option>
                            <Option value='middle'> 居中</Option>
                            <Option value='bottom'> 底部</Option>
                        </Select>
                    </Form.Item>

                </Panel>
                <Panel header="分隔线" key="splitLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="分隔线展示"
                        name="splitLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.splitLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="分隔线颜色"
                        name="splitLineLineStyleColor"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="分隔线宽度"
                        name="splitLineLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="分隔线类型"
                        name="splitLineLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="分隔线末端类型"
                        name="splitLineLineStyleCap"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='butt'>方形</Option>
                            <Option value='round'> 圆形</Option>
                            <Option value='square'> 方形（宽度和线段相同）</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="分隔线透明度"
                        name="splitLineLineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>

                <Panel header="分隔区域" key="splitArea" className="site-collapse-custom-panel">
                    <Form.Item
                        label="分隔区展示"
                        name="splitAreaShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.splitAreaShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="分隔区域颜色"
                        name="splitAreaAreaStyleColor"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="分隔区域阴影长度"
                        name="splitAreaAreaStyleShadowBlur"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="分隔区域阴影颜色"
                        name="splitAreaAreaStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='splitAreaAreaStyleShadowColor'
                            color={config.splitAreaAreaStyleShadowColor}></ColorPickerSingle>

                    </Form.Item>
                    <Form.Item
                        label="分隔区域阴影透明度"
                        name="splitAreaAreaStyleOopacity"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
            </Collapse>
        </Form>
    )

}
export default MapConfig
