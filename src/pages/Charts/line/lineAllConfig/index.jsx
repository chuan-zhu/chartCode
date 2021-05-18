import React from 'react'
import { Collapse,Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import _ from 'lodash'
import TitleConfig from '@/components/AllConfig/TitleConfig'
import LegendConfig from '@/components/AllConfig/LegendConfig'
import GridConfig from '@/components/AllConfig/GridConfig'
import XAxisConfig from '@/components/AllConfig/XAxisConfig'
import YAxisConfig from '@/components/AllConfig/YAxisConfig'
import LineConfig from '@/components/AllConfig/LineConfig'
import ColorConfig from '@/components/AllConfig/ColorConfig'
import TooltipConfig from '@/components/AllConfig/TooltipConfig'
import { connect } from 'umi'
import style from './index.less'

const { Panel } = Collapse;

const LineAllConfig = ({ lineConfig, dispatch }) => {
    let  config  = lineConfig
    /**
     * 是否展示点击回调
     * @param {*} checked 
     * @param {*} e 
     * @param {*} key 
     */
    const showConfig = (checked, e, key) => {
        e.stopPropagation();//阻止冒泡
        let newLineConfig = _.cloneDeep(config)
        newLineConfig[key].show = checked
        dispatch({
            type: 'lineConfig/update',
            payload: newLineConfig
        });
    }

    /**
     * 公共方法，派发修改store内容
     */
    const storeChange = (target, targetVal) => {
        // console.log(this.arguments)
        let newLineConfig = _.cloneDeep(config)
        newLineConfig[target] = targetVal
        dispatch({
            type: 'lineConfig/update',
            payload: newLineConfig
        });
    }
    return (
        <Collapse
            bordered={false}
            // defaultActiveKey={['title', 'legend', 'grid','tooltip', 'xAxis', 'yAxis', 'line']}
            defaultActiveKey={['color']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className={style.collapse_wrap}
            ghost
        >
            <Panel header="标题配置" key="title" className="site-collapse-custom-panel"
            extra={
                <Switch size="small" defaultChecked={config.title.show} onClick={(checked, e) => showConfig(checked, e, 'title')} />
            }>
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
            <Panel header="提示信息" key="tooltip" className="site-collapse-custom-panel"
             extra={
                <Switch size="small" defaultChecked={config.tooltip.show} onClick={(checked, e) => showConfig(checked, e, 'tooltip')} />
            }
            >
                <TooltipConfig config={config.tooltip} storeChange={storeChange}></TooltipConfig>
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
            <Panel header="线图配置" key="line" className="site-collapse-custom-panel"

            >
                <LineConfig config={config.line} storeChange={storeChange}></LineConfig>
            </Panel>
            <Panel header="颜色配置" key="color" className="site-collapse-custom-panel"

            >
                <ColorConfig config={config.color} storeChange={storeChange}></ColorConfig>
            </Panel>
        </Collapse>
    )

}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(LineAllConfig) 

