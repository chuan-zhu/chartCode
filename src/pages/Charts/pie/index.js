import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import PieAllConfig from './pieAllConfig'

import * as echarts from 'echarts'
import './index.less'
const Pie = ({ pieConfig, dispatch, dataSet }) => {
    console.log(pieConfig)
    let { title, legend, grid, xAxis, yAxis, pie, color, tooltip } = pieConfig
    console.log(title)
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
                    type: 'pie',
                    legendHoverLink: pie.legendHoverLink,
                    clockwise: pie.clockwise,
                    startAngle: pie.startAngle,
                    minAngle: pie.minAngle,
                    roseType: pie.roseType,
                    avoidLabelOverlap: pie.avoidLabelOverlap,
                    // left: pie.left: 'center',
                    // top: pie.top: 'center',
                    // right:0,
                    // bottom:0,
                    center: [positionLeft + '%', '50%'],
                    radius: pie.radius,
                    label: {
                        show: pie.lableShow,
                        position: pie.labelPosition,//'inside'  'center'
                        formatter: pie.labelFormatter,
                        color: pie.labelColor,
                        fontSize: pie.labelFontSize,
                        alignTo: pie.labelAlignTo,//'labelLine','edge'    标签的对齐方式，仅当 position 值为 'outer' 时有效。
                    },
                    labelLine: {
                        show: pie.labelLineShow,
                        length: pie.length,
                        length2: pie.length2,
                        smooth: pie.smooth,
                        lineStyle: {
                            color: pie.labelLineLineStyleColor,
                            width: pie.LabelLineStyleWidth,
                            type: pie.LabelLineStyleType,
                        }
                    },
                    itemStyle: {
                        color: pie.itemStyleColor,
                        borderColor: pie.itemStyleBorderColor,
                        borderWidth: pie.itemStyleBorderWidth,
                        borderType: pie.itemStyleBorderType,
                        shadowBlur: pie.itemStyleShadowBlur,
                        shadowColor: pie.itemStyleShadowColor,
                        borderRadius: pie.itemStyleBorderRadius,
                    },
                    emphasis: {
                        scale: pie.emphasisScale,
                        scaleSize: pie.emphasisScaleSize,
                        focus: pie.emphasisFocus,//'self','series' 
                        label: {
                            show: pie.emphasisLabelShow,
                            color: pie.emphasisLabelColor,
                            fontSize: pie.emphasisLabelFontSize,
                        },
                    },
                    data: item.data
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
                    <div id="pie" className="canvas_wrap">
                        <Canvans option={option}></Canvans>
                    </div>
                </Col>
                <Col span={7} className="graph_part">
                    <PieAllConfig></PieAllConfig>
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
export default connect(mapStateToProps)(Pie)

