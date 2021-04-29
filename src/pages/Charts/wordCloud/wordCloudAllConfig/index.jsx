import React from 'react'
import { Collapse,Switch } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import _ from 'lodash'
import TitleConfig from '@/components/AllConfig/TitleConfig'
import WordCloudConfig from '@/components/AllConfig/wordCloudConfig'
import ColorConfig from '@/components/AllConfig/ColorConfig'
import TooltipConfig from '@/components/AllConfig/TooltipConfig'
import { connect } from 'umi'
import style from './index.less'

const { Panel } = Collapse;

const LineAllConfig = ({ wordCloudConfig, dispatch }) => {
    console.log(wordCloudConfig, dispatch)
    let  config  = wordCloudConfig
    console.log(config)
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
            type: 'wordCloudConfig/update',
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
            type: 'wordCloudConfig/update',
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
            <Panel header="提示信息" key="tooltip" className="site-collapse-custom-panel"
             extra={
                <Switch size="small" defaultChecked={config.tooltip.show} onClick={(checked, e) => showConfig(checked, e, 'tooltip')} />
            }
            >
                <TooltipConfig config={config.tooltip} storeChange={storeChange}></TooltipConfig>
            </Panel>
            
            <Panel header="词云图配置" key="wordCloud" className="site-collapse-custom-panel"

            >
                <WordCloudConfig config={config.wordCloud} storeChange={storeChange}></WordCloudConfig>
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

