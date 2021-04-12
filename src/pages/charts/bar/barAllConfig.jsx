import React, { Component, useState, useEffect } from 'react'
import { Collapse, Form, Input, Button, Checkbox, InputNumber, Switch, Select, Col } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { unit2, unit1 } from '../../../utils/componentUtils'
import { SketchPicker, ChromePicker } from 'react-color'
import {
    lefttip, toptip, positiontip, containLabeltip, axisTypetip,
    AxisMintip, AxisMAXtip, barPositiontip
} from '../../../utils/tipsUtils'
import _ from 'lodash'
import TitleConfig from '../../../components/allConfig/titleConfig/titleConfig'
import LegendConfig from '../../../components/allConfig/legendConfig/legendConfig'
import GridConfig from '../../../components/allConfig/gridConfig/gridConfig'
import XAxisConfig from '../../../components/allConfig/xAxisConfig/xAxisConfig'
import YAxisConfig from '../../../components/allConfig/yAxisConfig/yAxisConfig'
import BarConfig from '../../../components/allConfig/barConfig/barConfig'
import { CONFIG } from '../../../redux/action-types'


const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 14 },
};
const layoutLittle = {
    labelCol: { span: 11 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const { Panel } = Collapse;
const { Option } = Select;


const BarAllConfig = (props) => {
    let { config } = useSelector((state) => ({ config: state.barConfig, }));
    console.log(config)
    // 颜色选择器   是否展示，设置颜色的字段对象
    let [colorPicker, setColorPicker] = useState({ show: false, filed: '' })
    // 不可编辑的数组
    let [disabled, setDisabled] = useState({})
    const [form] = Form.useForm();
    let dispatch = useDispatch(); //取得派发方法
    let [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 })
    /**
     * 是否展示点击回调
     * @param {*} checked 
     * @param {*} e 
     * @param {*} key 
     */
    const showConfig = (checked, e, key) => {
        e.stopPropagation();//阻止冒泡
        let newBarConfig = _.cloneDeep(config)
        newBarConfig[key].show = checked
        dispatch({
            type: CONFIG,
            payload: newBarConfig
        });
    }
    const formChange = () => {
        let newFormValue = form.getFieldsValue(true)
        Object.keys(newFormValue).forEach((key) => {
            if (typeof newFormValue[key] == 'string' && newFormValue[key].indexOf(",") != -1) {
                newFormValue[key] = newFormValue[key].split(',')
            }
        })
        dispatch({
            type: CONFIG, payload: newFormValue
        });
    }
    /**
     * 颜色块点击回调，将设置的字段作为参数，展示颜色选择器
     * @param {*} filedTarget 字段名
     * @param {*} e 
     */
    const colorPickClick = (filedTarget, e) => {
        // 先修改位置，再展示颜色选择器
        console.log(e)
        setColorPickerPosition({ top: e.clientY, left: e.clientX })
        setColorPicker({ show: filedTarget, filed: filedTarget })
        // #basic_titleTextColor
        // offsetLeft;// 获取弹框距离左侧宽度
        // var innerBoxTop = innerbox.offsetTop
    }
    /**
     * 颜色选择器  修改回调
     * 点击后隐藏选择器，修改颜色字段变量
     * @param {*} color 
     */
    const colorPickChange = (color) => {

        setColorPicker({ ...colorPicker, show: false })
        let newFormValue = form.getFieldsValue(true)
        newFormValue[colorPicker.filed] = color
        dispatch({
            type: CONFIG, payload: newFormValue
        });
    }
    /**
     * 公共方法，派发修改store内容
     */
    const storeChange = (target, targetVal) => {
        // console.log(this.arguments)
        let newBarConfig = _.cloneDeep(config)
        newBarConfig[target] = targetVal
        dispatch({
            type: CONFIG,
            payload: newBarConfig
        });
    }
    return (
        <Form
            {...layout}
            name="all"
            form={form}
            initialValues={{ ...config }}
            onValuesChange={() => formChange()}
        >
            {colorPicker.show && <div style={{ position: 'fixed ', zIndex: 10, top: colorPickerPosition.top, left: colorPickerPosition.left }}>
                <SketchPicker disableAlpha={true}
                    color={colorPicker.show}
                    onChange={(color) => colorPickChange(color.hex)}
                />
            </div>
            }
            <Collapse
                bordered={false}
                // defaultActiveKey={['title', 'legend', 'grid', 4, 'xAxis', 'yAxis', 'bar']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
            >

                <Panel header="标题配置" key="title" className="site-collapse-custom-panel">
                    <TitleConfig config={config.title} storeChange={storeChange} ></TitleConfig>
                </Panel>

                <Panel header="图例" key="legend" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked={config.legend.show} onClick={(checked, e) => showConfig(checked, e, 'legend')} />
                    }>
                    <LegendConfig config={config.legend} storeChange={storeChange} ></LegendConfig>
                </Panel>
                <Panel header="网格" key="grid" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked={config.grid.show} onClick={(checked, e) => showConfig(checked, e, 'grid')} />
                    }
                >
                    <GridConfig config={config.grid} storeChange={storeChange} ></GridConfig>
                </Panel>
                <Panel header="滚动展示" key="4" className="site-collapse-custom-panel">
                    <p>aaa</p>
                </Panel>
                <Panel header="x坐标轴" key="xAxis" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked={config.xAxis.show} onClick={(checked, e) => showConfig(checked, e, 'xAxis')} />
                    }
                >
                    <XAxisConfig config={config.xAxis} storeChange={storeChange}></XAxisConfig>

                </Panel>


                <Panel header="y坐标轴" key="yAxis" className="site-collapse-custom-panel"
                    extra={
                        <Switch size="small" defaultChecked={config.yAxis.show} onClick={(checked, e) => showConfig(checked, e, 'yAxis')} />
                    }
                >
                    <YAxisConfig config={config.yAxis} storeChange={storeChange}></YAxisConfig>

                </Panel>
                <Panel header="柱图配置" key="bar" className="site-collapse-custom-panel"

                >
                    <BarConfig config={config.bar} storeChange={storeChange}></BarConfig>
                </Panel>

            </Collapse>
        </Form>
    )

}
export default BarAllConfig

