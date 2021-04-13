import React from 'react'
import { Collapse,Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

import _ from 'lodash'
import TitleConfig from '../../../components/allConfig/titleConfig/titleConfig'
import LegendConfig from '../../../components/allConfig/legendConfig/legendConfig'
import GridConfig from '../../../components/allConfig/gridConfig/gridConfig'
import XAxisConfig from '../../../components/allConfig/xAxisConfig/xAxisConfig'
import YAxisConfig from '../../../components/allConfig/yAxisConfig/yAxisConfig'
import BarConfig from '../../../components/allConfig/barConfig/barConfig'
import ColorConfig from '../../../components/allConfig/colorConfig/colorConfig'

import { CONFIG } from '../../../redux/action-types'


const { Panel } = Collapse;

const BarAllConfig = (props) => {
    let { config } = useSelector((state) => ({ config: state.barConfig, }));
    console.log(config)
    let dispatch = useDispatch(); //取得派发方法
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
        <Collapse
            bordered={false}
            // defaultActiveKey={['title', 'legend', 'grid', 4, 'xAxis', 'yAxis', 'bar']}
            defaultActiveKey={['color']}
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
            <Panel header="颜色配置" key="color" className="site-collapse-custom-panel"

            >
                <ColorConfig config={config.color} storeChange={storeChange}></ColorConfig>
            </Panel>
        </Collapse>
    )

}
export default BarAllConfig

