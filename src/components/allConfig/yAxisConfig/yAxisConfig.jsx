import React from 'react'
import { Collapse, Form, Input, InputNumber, Switch, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import {axisTypetip,AxisMintip, AxisMAXtip} from '../../../utils/tipsUtils'

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
const YAxisConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = () => {
        let newFormValue = form.getFieldsValue(true)
        props.storeChange('yAxis', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="yAxis"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >


            <Form.Item
                label="y轴位置"
                name="yAxisPosition"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="left">左侧</Option>
                    <Option value="right">右侧</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="坐标轴类型"
                name="yAxisType"
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
                name="yAxisName"
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="轴名位置。"
                name="yAxisNameLocation"
            >
                <Select style={{ width: 120 }} disabled={!config.show} >
                    <Option value="start">头部</Option>
                    <Option value="middle">中部</Option>
                    <Option value="end">尾部</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="轴名色号"
                name="yAxisNameTextStyleColor"
            >
                {/* <Input disabled={!config.show} /> */}
                <span style={{ background: config.yAxisNameTextStyleColor, padding: '5px 10px' }}
                    // onClick={(e) => colorPickClick("yAxisNameTextStyleColor", e)}
                    >{config.yAxisNameTextStyleColor}</span>
            </Form.Item>
            <Form.Item
                label="轴名字体"
                name="yAxisNameTextStyleFontFamily"
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="轴名字体大小"
                name="yAxisNameTextStyleFontSize"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>

            <Form.Item
                label="轴名与轴线间距"
                name="yAxisNameGap"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>

            <Form.Item
                label="轴名旋转角度"
                name="yAxisNameRotate"
            >
                <InputNumber disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="是否是反向坐标轴"
                name="yAxisInverse"
            >
                <Switch checked={config.yAxisInverse} disabled={!config.show}></Switch>
            </Form.Item>

            <Form.Item
                label="坐标轴最小值"
                name="yAxisMin"
                tooltip={AxisMintip}
            >
                <Input disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="坐标轴最大值"
                name="yAxisMAX"
                tooltip={AxisMAXtip}
            >
                <Input disabled={!config.show} />
            </Form.Item>

            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="坐标轴轴线" key="axisLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="轴线箭头"
                        name="yAxisLineSymbol"
                        {...layoutLittle}
                    >
                        <Input disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="轴线颜色"
                        name="lineStylecolor"
                        {...layoutLittle}
                    >
                        {/* <Input disabled={!config.show} /> */}
                        <span style={{ background: config.lineStylecolor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("lineStylecolor", e)}
                            >{config.lineStylecolor}</span>
                    </Form.Item>
                    <Form.Item
                        label="轴线宽度"
                        name="yAxisLineWidth"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="轴线类型"
                        name="yAxisLineType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show} >
                            <Option value="solid">实线</Option>
                            <Option value="dashed"> 虚线</Option>
                            <Option value="dotted">点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="轴线透明度"
                        name="yAxisLineOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度" key="axisTick" className="site-collapse-custom-panel">
                    <Form.Item
                        label="刻度朝向"
                        name="yAxisTickInside"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show} >
                            <Option value={true}>朝外</Option>
                            <Option value={false}> 朝内</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="刻度长度"
                        name="yAxisTickLength"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                </Panel>
                <Panel header="坐标轴刻度标签" key="axisLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签朝向"
                        name="yAxisLabelInside"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show} >
                            <Option value={true}>朝外</Option>
                            <Option value={false}> 朝内</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="yAxisLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="与轴线间距"
                        name="yAxisLabelMargin"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="标签颜色"
                        name="yAxisLabelColor"
                        {...layoutLittle}
                    >
                        {/* <Input disabled={!config.show} /> */}
                        <span style={{ background: config.yAxisLabelColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("yAxisLabelColor", e)}
                            >{config.yAxisLabelColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="标签字体"
                        name="yAxisLabelFontFamily"
                        {...layoutLittle}
                    >
                        <Input disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="yAxisLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>

                </Panel>
                <Panel header="分隔线" key="yAxisplitLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="分隔线颜色"
                        name="yAxisplitLineLineStyleColor"
                        {...layoutLittle}
                    >
                        {/* <Input disabled={!config.show} /> */}
                        <span style={{ background: config.yAxisplitLineLineStyleColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("yAxisplitLineLineStyleColor", e)}
                            >{config.yAxisplitLineLineStyleColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="分隔线宽度"
                        name="yAxisplitLineLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                    <Form.Item
                        label="分隔线类型"
                        name="yAxisplitLineLineStyleType"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }} disabled={!config.show} >
                            <Option value="solid">实线</Option>
                            <Option value="dashed"> 虚线</Option>
                            <Option value="dotted">点线</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="分隔线透明度"
                        name="yAxisplitLineLineStyleOpacity"
                        {...layoutLittle}
                    >
                        <InputNumber disabled={!config.show} />
                    </Form.Item>
                </Panel>



            </Collapse>
        </Form>
    )

}
export default YAxisConfig
