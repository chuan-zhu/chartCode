import React from 'react'
import { Form, Input,Switch } from 'antd';
import { unit2 } from '@utils/componentUtils'
import {
    lefttip, toptip, positiontip, containLabeltip,
} from '@utils/tipsUtils'
import {formateFormData,deBounce} from '@utils/utils'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
};

/**
 * 网格配置组件，只对网格相关的配置修改，
 * @param {*} props 父组件传递的参数，包含默认配置数据，配置修改回调方法
 * @returns 
 */
const GridConfig = (props) => {
    let config = props.config
    console.log(props)

    const [form] = Form.useForm();
    /**
     * 表单变化，调用父组件派发方法
     */
    const formChange =  deBounce(() => {
        let newFormValue = form.getFieldsValue(true)
        newFormValue = formateFormData(newFormValue)
        props.storeChange('grid', newFormValue);
    },1000)
    return (
        <Form
            {...layout}
            name="grid"
            form={form}
            initialValues={config}
            onValuesChange={() => formChange()}
        >
            <Form.Item
                label="左侧位置"
                name="gridLeft"
                tooltip={lefttip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="上方位置"
                name="gridTop"
                tooltip={toptip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="右侧位置"
                name="gridRight"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="底部位置"
                name="gridBottom"
                tooltip={positiontip}
            >
                <Input addonAfter={unit2} disabled={!config.show} />
            </Form.Item>
            <Form.Item
                label="是否包含坐标轴"
                name="gridContainLabel"
                tooltip={containLabeltip}
            >
                <Switch checked={config.gridContainLabel} disabled={!config.show}></Switch>
            </Form.Item>
        </Form>
    )

}
export default GridConfig
