import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import RadarAllConfig from './radarAllConfig'
import RadarBaseConfig from './radarBaseConfig'
import * as echarts from 'echarts'
const { TabPane } = Tabs;
const Radar = ({ radarConfig, dispatch, dataSet }) => {
    console.log('radarConfig', radarConfig)
    let { title, legend, radar, color, tooltip } = radarConfig
    const { dataSource } = dataSet
    // 图表数据处理
    let data = []
    let legendData = []
    dataSource.forEach(item => {
        data.push({
            name: item.name,
            data: item.data
        })
        legendData.push(item.name)
    })
    const getOption = () => {
        const titleConfig = {
            show: title.show,
            text: title.text,
            textStyle: {
                color: title.titleTextColor,
                fontFamily: title.titleTextFontFamily,
                fontSize: title.titleTextFontSize
            },
            subtext: title.subtext,
            subtextStyle: {
                color: title.subtextColor,
                fontFamily: title.subtextFontFamily,
                fontSize: title.subtextFontSize
            },
            textAlign: title.titleTextAlign,
            textVerticalAlign: title.textVerticalAlign,
            left: title.titleLeft,
            top: title.titleTop,
            right: title.titleRight,
            bottom: title.titleBottom
        }
        const legendConfig = {
            data: ['销量', '库存'],
            show: legend.show,
            left: legend.legendLeft,
            top: legend.legendTop,
            right: legend.legendRight,
            bottom: legend.legendBottom,
            orient: legend.legendOrient,
            itemGap: legend.legendItemGap,
            itemWidth: legend.legendItemWidth,
            itemHeight: legend.legendItemHeight,
            selectedMode: legend.legendSelectedMode,
            textStyle: {
                color: legend.legendTextColor,
                fontFamily: legend.legendFontFamily,
                fontSize: legend.legendFontSize,
            },
            icon: legend.legendIcon
        }
        const tooltipConfig = {
            show: tooltip.show,
            trigger: tooltip.trigger,
            triggerOn: tooltip.triggerOn,
            formatter: tooltip.formatter,
            backgroundColor: tooltip.backgroundColor,
            borderColor: tooltip.borderColor,
            borderWidth: tooltip.borderWidth,
            padding: tooltip.padding,
        }
        const radarConfig = {
            center: radar.center,
            radius: radar.radius,
            startAngle: radar.startAngle,
            splitNumber: radar.splitNumber,
            shape: radar.shape,//'polygon' 和 'circle'。
            name: {
                nameShow: radar.nameShow,
                nameColor: radar.nameColor,
                nameFontSize: radar.nameFontSize,
            },
            nameGap: radar.nameGap,
            axisLine: {
                show: radar.axisLineShow,
                symbol: radar.axisLineSymbol,
                symbolSize: radar.axisLineSymbolSize,
                symbolOffset: radar.axisLineSymbolOffset,
                lineStyle: {
                    color: radar.axisLineLineStyleColor,
                    width: radar.axisLineLineStyleWidth,
                    type: radar.axisLineLineStyleType,
                    cap: radar.axisLineLineStyleCap,
                    shadowColor: radar.axisLineLineStyleShadowColor,
                    opacity: radar.axisLineLineStyleOpacity,
                },
            },
            axisTick: {
                show: radar.axisTickShow,
                length: radar.axisTickLength,
                lineStyle: {
                    color: radar.axisTickLineStyleColor,
                    width: radar.axisTickLineStyleWidth,
                    type: radar.axisTickLineStyleType,
                    cap: radar.axisTickLineStyleCap,
                    shadowColor: radar.axisTickLineStyleShadowColor,
                    opacity: radar.axisTickLineStyleOpacity,
                },
            },
            axisLabel: {
                show: radar.axisLabelShow,
                rotate: radar.axisLabelRotate,
                margin: radar.axisLabelMargin,
                showMinLabel: radar.axisLabelShowMinLabel,
                showMaxLabel: radar.axisLabelShowMaxLabel,
                color: radar.axisLabelColor,
                fontSize: radar.axisLabelFontSize,
                align: radar.axisLabelAlign,
                verticalAlign: radar.axisLabelVerticalAlign,
            },
            splitLine: {
                show: radar.splitLineShow,
                lineStyle: {
                    color: radar.splitLineLineStyleColor,
                    width: radar.splitLineLineStyleWidth,
                    type: radar.splitLineLineStyleType,
                    cap: radar.splitLineLineStyleCap,
                    opacity: radar.splitLineLineStyleOpacity,
                },
                splitArea: {
                    show: radar.splitAreaShow,
                    areaStyle: {
                        color: radar.splitAreaAreaStyleColor,
                        shadowBlur: radar.splitAreaAreaStyleShadowBlur,
                        shadowColor: radar.splitAreaAreaStyleShadowColor,
                        opacity: radar.splitAreaAreaStyleOopacity,
                    },
                }
            },
            indicator: [
                { name: '销售（Sales）', },
                { name: '管理（Administration）', },
                { name: '信息技术（Information Technology）' },
                { name: '客服（Customer Support）', },
                { name: '研发（Development）', },
                { name: '市场（Marketing）', }
            ]
        }
        const colorConfig = () => {
            // 渐变色配置（线性渐变 linear，径向渐变  radial ）
            if (color.colorType[1] == "linear") {
                const { linearColorStart, linearColorEnd } = color
                let colorArr = []
                if (color.linearType == 'linear') {
                    linearColorStart.forEach((item, index) => {
                        let colorItem = new echarts.graphic.LinearGradient(...color.linearColorDirection, [{
                            offset: 1,
                            color: linearColorStart[index] // 0% 处的颜色
                        }, {
                            offset: 0,
                            color: linearColorEnd[index] // 100% 处的颜色
                        }], false)
                        colorArr.push(colorItem)
                    })
                } else {
                    linearColorStart.forEach((item, index) => {
                        let colorItem = new echarts.graphic.RadialGradient(...color.radialColorDirection, [{
                            offset: 1,
                            color: linearColorStart[index] // 0% 处的颜色
                        }, {
                            offset: 0,
                            color: linearColorEnd[index] // 100% 处的颜色
                        }], false)
                        colorArr.push(colorItem)
                    })
                }
                // console.log(color.linearColorDirection, JSON.stringify(colorItem))
                return colorArr
            } else {
                // 纯色配置
                return color.color
            }
        }
        return {
            title: titleConfig,
            tooltip: tooltipConfig,
            legend: legendConfig,
            radar: radarConfig,
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '销量'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '库存'
                    }
                ]
            }],
            color: colorConfig()
        }
    }
    // 删除配置内容为空的值
    const removePropertyOfNull = function (obj) {
        Object.keys(obj).forEach(item => {
            if (obj[item] === null || obj[item] === '' || obj[item] === undefined) {
                delete obj[item]
            }
            if (obj[item] instanceof Object) {
                removePropertyOfNull(obj[item])
            }
        })
        return obj;
    }
    const option = removePropertyOfNull(getOption())

    let [showCode, setShowCode] = useState(false)
    return (
        <div className="right_wrap">
            <Row className="graph_wrap">
                <Col span={17} className="graph_part left_part" >
                    <div id="radar" className="canvas_wrap">
                        <Canvans option={option}></Canvans>
                    </div>
                </Col>
                <Col span={7} className="graph_part">
                    <Tabs defaultActiveKey="2" centered>
                        <TabPane
                            tab={<span> 数据设置 </span>}
                            key="1"
                        >
                            <RadarBaseConfig></RadarBaseConfig>
                        </TabPane>
                        <TabPane
                            tab={<span> 详细设置 </span>}
                            key="2"
                        >
                            <RadarAllConfig></RadarAllConfig>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row style={{ height: '50px', borderTop: '1px solid #1890ff' }} align="middle">
                <Col offset={17} span={7}>
                    <Button type="primary" shape="round"
                        icon={<DownloadOutlined />} block onClick={() => setShowCode(true)}> 生成代码 </Button>
                </Col>
            </Row>
            <Drawer
                title="代码内容"
                width={720}
                onClose={() => setShowCode(false)}
                visible={showCode}
                bodyStyle={{ paddingBottom: 80 }}>
                <CodeBoard option={option}></CodeBoard>
            </Drawer>
        </div>
    )

}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(Radar)

