import React from 'react'
import { Collapse, Form, Input,InputNumber, Switch, Select,  } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { barPositiontip } from '../../../utils/tipsUtils'
import {formateFormData} from '../../../utils/utils'
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
const BarConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = () => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('bar', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="bar"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="名称"
                name="barName"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="图例联动高亮"
                name="barLegendHoverLink"
            >
                <Switch checked={config.barLegendHoverLink} ></Switch>
            </Form.Item>

            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="柱图标签" key="barLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签展示"
                        name="barLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.barLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签位置"
                        name="barLabelPosition"
                        {...layoutLittle}
                        tooltip={barPositiontip}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签距离图形距离"
                        name="barLabelDistance"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="barLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签偏移"
                        name="barLabelOffset"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签字体颜色"
                        name="barLabelColor"
                        {...layoutLittle}
                    >
                        {/* <Input ></Input> */}
                        <span style={{ background: config.barLabelColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("barLabelColor", e)}
                            >{config.barLabelColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="barLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="标签引导线" key="barLabelLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="引导线展示"
                        name="barLabelLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.barLabelLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线平滑展示"
                        name="barLabelSmooth"
                        {...layoutLittle}
                    >
                        <Switch checked={config.barLabelSmooth} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线颜色"
                        name="barLabelLineStyleColor"
                        {...layoutLittle}
                    >
                        {/* <Input ></Input> */}
                        <span style={{ background: config.barLabelLineStyleColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("barLabelLineStyleColor", e)}
                            >{config.barLabelLineStyleColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="引导线宽度"
                        name="barLabelLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线类型"
                        name="barLabelLineStyleYype"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="柱子配置" key="bar" className="site-collapse-custom-panel">
                    <Form.Item
                        label="柱体颜色"
                        name="barItemStyleColor"
                        {...layoutLittle}
                    >
                        {/* <Input></Input> */}
                        <span style={{ background: config.barItemStyleColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("barItemStyleColor", e)}
                            >{config.barItemStyleColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="柱体边框颜色"
                        name="barItemStyleBorderColor"
                        {...layoutLittle}
                    >
                        {/* <Input></Input> */}
                        <span style={{ background: config.barItemStyleBorderColor, padding: '5px 10px' }}
                            // onClick={(e) => colorPickClick("barItemStyleBorderColor", e)}
                            >{config.barItemStyleBorderColor}</span>
                    </Form.Item>
                    <Form.Item
                        label="柱体边框宽度"
                        name="barItemStyleBorderWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体宽度"
                        name="barWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体高度"
                        name="barMinHeight"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体圆角"
                        name="barBorderRadius"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    
                </Panel>
            </Collapse>
        </Form>
    )

}
export default BarConfig
