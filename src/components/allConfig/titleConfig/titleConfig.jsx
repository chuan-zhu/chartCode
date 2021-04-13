import React from 'react'
import {  Form, Input,  InputNumber, Select } from 'antd';
import { unit2 } from '../../../utils/componentUtils'
import {
    lefttip, toptip, positiontip
} from '../../../utils/tipsUtils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

const { Option } = Select;

/**
 * 标题配置组件，只对标题相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const TitleConfig = (props) => {
    let config  =  props.config
    console.log(props)
   
    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange = () => {
        let newFormValue = form.getFieldsValue(true)
        props.storeChange('title',newFormValue);
    }
    return (
        <Form
            {...layout}
            name="title"
            form={form}
            initialValues={config }
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="标题"
                name="text"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="标题色号"
                name="titleTextColor"
            >
                <span style={{ background: config.titleTextColor, padding: '5px 10px' }} 
                // onClick={(e) => colorPickClick("titleTextColor", e)}
                >{config.titleTextColor}</span>

            </Form.Item>
            <Form.Item
                label="标题字体"
                name="titleTextFontFamily"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="标题字体大小"
                name="titleTextFontSize"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="副标题"
                name="subtext"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="副标题色号"
                name="subtextColor"
            >
                {/* <Input /> */}
                <span style={{ background: config.subtextColor, padding: '5px 10px' }}
                    // onClick={(e) => colorPickClick("subtextColor", e)}
                    >{config.subtextColor}</span>
            </Form.Item>
            <Form.Item
                label="副标题字体"
                name="subtextFontFamily"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="副标题字体大小"
                name="subtextFontSize"
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="整体水平位置"
                name="titleTextAlign"
            >
                <Select style={{ width: 120 }}  >
                    <Option value="left">左侧</Option>
                    <Option value="center">中间</Option>
                    <Option value="right">右侧</Option>
                    <Option value="auto">自动</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="整体垂直位置"
                name="textVerticalAlign"
            >
                <Select style={{ width: 120 }}  >
                    <Option value="top">上方</Option>
                    <Option value="center">中间</Option>
                    <Option value="bottom">底部</Option>
                    <Option value="auto">自动</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="左侧位置"
                name="titleLeft"
                tooltip={lefttip}
            >
                <Input addonAfter={unit2} />
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="titleTop"
                tooltip={toptip}
            >
                <Input addonAfter={unit2} />
            </Form.Item>
            <Form.Item
                label="右侧位置"
                name="titleRight"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} />
            </Form.Item>
            <Form.Item
                label="底部位置"
                name="titleBottom"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} />
            </Form.Item>
        </Form>
    )

}
export default TitleConfig
