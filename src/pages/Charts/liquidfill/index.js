import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import LiquidfillAllConfig from './liquidfillAllConfig'

import * as echarts from 'echarts'
import './index.less'
const Liquidfill = ({ liquidfillConfig, dispatch,dataSet }) => {
    // return (<div>asdadas</div>)
    console.log(liquidfillConfig)
    let { title, legend, grid, xAxis, yAxis, liquidfill, color, tooltip } = liquidfillConfig
    console.log(title)
    const {dataSource} = dataSet
    // 图表数据处理
    let data = []
    let legendData = []
    dataSource.forEach(item =>{
        data.push({
            name:item.name,
            data:item.data
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
            data: legendData,
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
        const seriesConfig = () => {
            let seriesArr = []
            let countPart = data.length * 2
            let averageLength = (100 / countPart).toFixed(2)
            data.forEach((item, index) => {
                let positionLeft = averageLength * (2 * index + 1)
                let seriesItem = {
                    name: item.name,
                    type: 'liquidFill',

                    center: [positionLeft + '%', '50%'],
                    data: [0.5, 0.4, 0.3],
                    radius: liquidfill.radius,
                    // 水球颜色
                    // color: [waveColor[0][index], waveColor[1][index]],
                    itemStyle: {
                        opacity: liquidfill.itemStyleOpacity
                    },
                    outline: {
                        borderDistance: liquidfill.outlineBorderDistance,
                        itemStyle: {
                            borderWidth: liquidfill.outlineItemStyleBorderWidth,
                            borderColor: liquidfill.outlineItemStyleBorderColor,
                        },
                    },
                    label: {
                        normal: {
                            // formatter: function (params) {
                            //     const { seriesIndex, value } = params
                            //     return dataArr[seriesIndex].name + '\n\n' + (value * 100).toFixed(2) + '%'
                            // },
                            textStyle: {
                                fontSize: liquidfill.labelTextStyleFontSize,
                                color: liquidfill.labelTextStyleColor,
                                insideColor: liquidfill.labelTextStyleInsideColor, //波浪内部字体颜色
                                align: liquidfill.labelTextStyleAlign,
                            },
                            // position: liquidfill.LABLE_POSITION
                        }
                    },
                }
                seriesArr.push(seriesItem)
            })
            return seriesArr
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
        colorConfig()
        return {
            title: titleConfig,
            tooltip: tooltipConfig,
            legend: legendConfig,
            series: seriesConfig(),
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
                    <div id="liquidfill" className="canvas_wrap">
                        <Canvans option={option}></Canvans>
                    </div>
                </Col>
                <Col span={7} className="graph_part">
                    <LiquidfillAllConfig></LiquidfillAllConfig>
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
export default connect(mapStateToProps)(Liquidfill)

