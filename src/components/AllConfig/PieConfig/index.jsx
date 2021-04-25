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
    console.log(props)

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
                label="名称"
                name="pieName"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="图例联动高亮"
                name="pieLegendHoverLink"
            >
                <Switch checked={config.pieLegendHoverLink} ></Switch>
            </Form.Item>

            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="柱图标签" key="pieLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签展示"
                        name="pieLabelShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.pieLabelShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="标签位置"
                        name="pieLabelPosition"
                        {...layoutLittle}
                        tooltip={seriesLablePositiontip}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签距离图形距离"
                        name="pieLabelDistance"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签旋转角度"
                        name="pieLabelRotate"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="标签偏移"
                        name="pieLabelOffset"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签字体颜色"
                        name="pieLabelColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='pieLabelColor'
                             color={config.pieLabelColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="标签字体大小"
                        name="pieLabelFontSize"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                </Panel>
                <Panel header="标签引导线" key="pieLabelLine" className="site-collapse-custom-panel">
                    <Form.Item
                        label="引导线展示"
                        name="pieLabelLineShow"
                        {...layoutLittle}
                    >
                        <Switch checked={config.pieLabelLineShow} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线平滑展示"
                        name="pieLabelSmooth"
                        {...layoutLittle}
                    >
                        <Switch checked={config.pieLabelSmooth} ></Switch>
                    </Form.Item>
                    <Form.Item
                        label="引导线颜色"
                        name="pieLabelLineStyleColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='pieLabelLineStyleColor'
                            color={config.pieLabelLineStyleColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="引导线宽度"
                        name="pieLabelLineStyleWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="引导线类型"
                        name="pieLabelLineStyleYype"
                        {...layoutLittle}
                    >
                        <Select style={{ width: 120 }}  >
                            <Option value='solid'>实线</Option>
                            <Option value='dashed'> 虚线</Option>
                            <Option value='dotted'> 点线</Option>
                        </Select>
                    </Form.Item>
                </Panel>
                <Panel header="柱子配置" key="pie" className="site-collapse-custom-panel">
                    <Form.Item
                        label="柱体边框颜色"
                        name="pieItemStyleBorderColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='pieItemStyleBorderColor'
                             color={config.pieItemStyleBorderColor}></ColorPickerSingle>
                    </Form.Item>
                    <Form.Item
                        label="柱体边框宽度"
                        name="pieItemStyleBorderWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体宽度"
                        name="pieWidth"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体高度"
                        name="pieMinHeight"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="柱体圆角"
                        name="pieBorderRadius"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>

                </Panel>
            </Collapse>
        </Form>
    )

}
export default PieConfig
