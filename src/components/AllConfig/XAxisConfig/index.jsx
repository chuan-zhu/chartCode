import React from 'react'
import { Collapse, Form, Input, InputNumber, Switch, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { axisTypetip, AxisMintip, AxisMAXtip } from '@/utils/utils.tipsConstant'
import ColorPickerSingle from '@/components/ColorPickSingle/'
import { formateFormData, deBounce } from '@/utils/utils'

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
 * 网格配置组件，只对网格相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const XAxisConfig = (props) => {
    let config = props.config
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('xAxis', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('xAxis', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="xAxis"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >

            <Form.Item
                label="x轴位置"
                name="xAxisPosition"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="top">顶部</Option>
                    <Option value="bottom">底部</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="坐标轴类型"
                name="xAxisType"
                tooltip={axisTypetip}
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="value">数值轴</Option>
                    <Option value="category"> 类目轴</Option>
                    <Option value="time">时间轴</Option>
                    <Option value="log">对数轴</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="坐标轴名称"
                name="xAxisName"
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="轴名位置"
                name="xAxisNameLocation"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="start">头部</Option>
                    <Option value="middle">中部</Option>
                    <Option value="end">尾部</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="轴名色号"
                name="xAxisNameTextStyleColor"
            >
                <ColorPickerSingle updateColor={updateColor} field='xAxisNameTextStyleColor'
                    disabled={!config.show} color={config.xAxisNameTextStyleColor}></ColorPickerSingle>
            </Form.Item>
            <Form.Item
                label="轴名字体"
                name="xAxisNameTextStyleFontFamily"
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="轴名字体大小"
                name="xAxisNameTextStyleFontSize"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>

            <Form.Item
                label="轴名与轴线间距"
                name="xAxisNameGap"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>

            <Form.Item
                label="轴名旋转角度"
                name="xAxisNameRotate"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="是否是反向坐标轴"
                name="xAxisInverse"
            >
                <Switch checked={config.xAxisInverse} disabled={!config.show}></Switch>
            </Form.Item>

            <Form.Item
                label="坐标轴最小值"
                name="xAxisMin"
                tooltip={AxisMintip}
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="坐标轴最大值"
                name="xAxisMAX"
                tooltip={AxisMAXtip}
            >
                <Input disabled={!config.show} />
            </Form.Item>

            <Collapse bordered={false}
                defaultActiveKey={['title', 'legend', 'grid', 4, 'xAxis']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="坐标轴轴线" key="axisLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="是否展示"
                        name="xAxisLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.xAxisLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="轴线箭头"
                        name="xAxisLineSymbol"
                        {...layoutLittle}
                    >
                        <Input disabled={!config.show || !config.xAxisLineShow} />
                    </Form.Item>
                    <Form.Item
                        label="轴线颜色"
                        name="lineStylecolor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='lineStylecolor'
                            disabled={!config.show || !config.xAxisLineShow} color={config.lineStylecolor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="轴线宽度"
                        name="xAxisLineWidth"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisLineShow} />
                    </Form.Item>
                    <Form.Item
                        label="轴线类型"
                        name="xAxisLineType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show || !config.xAxisLineShow} >
                            <Option value="solid">实线</Option>
                            <Option value="dashed"> 虚线</Option>
                            <Option value="dotted">点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="轴线透明度"
                        name="xAxisLineOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisLineShow} />
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度" key="axisTick" className="site-collapse-custom-panel">
                    <Form.Item
                        label="是否展示"
                        name="xAxisTickShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.xAxisTickShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="刻度朝向"
                        name="xAxisTickInside"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show || !config.xAxisTickShow} >
                            <Option value={false}>朝外</Option>
                            <Option value={true}> 朝内</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="刻度长度"
                        name="xAxisTickLength"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisTickShow} />
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度标签" key="axisLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="是否展示"
                        name="xAxisLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.xAxisLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签朝向"
                        name="xAxisLabelInside"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show || !config.xAxisLabelShow} >
                            <Option value={false}>朝外</Option>
                            <Option value={true}> 朝内</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="xAxisLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisLabelShow} />
                    </Form.Item>
                    <Form.Item
                        label="与轴线间距"
                        name="xAxisLabelMargin"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisLabelShow} />
                    </Form.Item>
                    <Form.Item
                        label="标签颜色"
                        name="xAxisLabelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='xAxisLabelColor'
                            disabled={!config.show || !config.xAxisLabelShow} color={config.xAxisLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签字体"
                        name="xAxisLabelFontFamily"
                        {...layoutLittle}
                    >
                        <Input disabled={!config.show || !config.xAxisLabelShow} />
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="xAxisLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxisLabelShow} />
                    </Form.Item>

                </Panel>
                <Panel header="分隔线" key="xAxiSplitLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="是否展示"
                        name="xAxiSplitLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.xAxiSplitLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="分隔线颜色"
                        name="xAxiSplitLineLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='xAxiSplitLineLineStyleColor'
                            disabled={!config.show || !config.xAxiSplitLineShow} color={config.xAxiSplitLineLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="分隔线宽度"
                        name="xAxiSplitLineLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxiSplitLineShow} />
                    </Form.Item>
                    <Form.Item
                        label="分隔线类型"
                        name="xAxiSplitLineLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show || !config.xAxiSplitLineShow} >
                            <Option value="solid">实线</Option>
                            <Option value="dashed"> 虚线</Option>
                            <Option value="dotted">点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="分隔线透明度"
                        name="xAxiSplitLineLineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show || !config.xAxiSplitLineShow} />
                    </Form.Item>
                </Panel>



            </Collapse>


        </Form>
    )

}
export default XAxisConfig
