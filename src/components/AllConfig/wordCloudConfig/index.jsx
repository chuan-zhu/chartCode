import React from 'react'
import { Collapse, Form, Input, InputNumber, Switch, Select, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { lefttip,toptip  } from '@/utils/utils.tipsConstant'
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
const WordCloudConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('wordCloud', newFormValue);
    }, 500)
    /**
     * 通过颜色选择器更改色值变量
     */
    const updateColor = (field, Newcolors) => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue[field] = Newcolors
        props.storeChange('wordCloud', newFormValue);
    }
    return (
        <Form
            {...layout}
            name="wordCloud"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="图例联动高亮"
                name="shape"
            >
                <Select style={{ width: 120 }}  >
                    <Option value='circle'>圆形</Option>
                    <Option value='inside'> 三角形</Option>
                    <Option value='center'> 菱形</Option>
                    <Option value='center'> 矩形</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="左侧位置"
                name="left"
                tooltip={lefttip}
            >
                <Input   />
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="top"
                tooltip={toptip}
            >
                <Input  />
            </Form.Item>
            <Form.Item
                label="宽度"
                name="width"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="高度"
                name="height"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="文本大小区间范围"
                name="sizeRange"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="旋转角度区间范围"
                name="rotationRange"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="旋转角度大小"
                name="rotationStep"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="网格大小"
                name="gridSize"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="超出画布之外绘制"
                name="drawOutOfBound"
            >
                <Switch checked={config.drawOutOfBound} ></Switch>
            </Form.Item>
            <Form.Item
                label="布局动画"
                name="layoutAnimation"
            >
                <Switch checked={config.layoutAnimation} ></Switch>
            </Form.Item>
            <Collapse bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >
                <Panel header="标签" key="wordCloudLabel" className="site-collapse-custom-panel">
                    <Form.Item
                        label="标签字体"
                        name="textStyleFontFamily"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="标签加粗"
                        name="textStyleFontWeight"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                </Panel>
                <Panel header="高亮" key="emphasis" className="site-collapse-custom-panel">
                    <Form.Item
                        label="高亮内容"
                        name="emphasisFocus"
                        {...layoutLittle}
                    >
                        <Input ></Input>
                    </Form.Item>
                    <Form.Item
                        label="阴影大小"
                        name="emphasisTextStyleShadowBlur"
                        {...layoutLittle}
                    >
                        <InputNumber ></InputNumber>
                    </Form.Item>
                    <Form.Item
                        label="阴影颜色"
                        name="emphasisTextStyleShadowColor"
                        {...layoutLittle}
                    >
                        <ColorPickerSingle updateColor={updateColor} field='emphasisTextStyleShadowColor'
                            color={config.emphasisTextStyleShadowColor}></ColorPickerSingle>
                    </Form.Item>
                </Panel>
            </Collapse>
        </Form>
    )

}
export default WordCloudConfig
