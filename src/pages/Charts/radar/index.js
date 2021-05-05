import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import RadarAllConfig from './radarAllConfig'

import * as echarts from 'echarts'
import './index.less'
const Radar = ({ radarConfig, dispatch }) => {
    // return (<div>asdadas</div>)
    console.log(radarConfig)
    let { title, legend, radar, color, tooltip } = radarConfig
    console.log(title)
    // 不可编辑的数组
    const data = [{
        name: "蔬菜类型",
        data: [{
            name: '西红柿',
            value: 100
        },
        {
            name: '菠菜',
            value: 120
        },
        {
            name: '香菇',
            value: 130
        },
        {
            name: '白菜',
            value: 150
        }
        ]
    },
    {
        name: "水果类型",
        data: [{
            name: '苹果',
            value: 100
        },
        {
            name: '香蕉',
            value: 260
        },
        {
            name: '菠萝',
            value: 330
        },
        {
            name: '百香果',
            value: 250
        }
        ]
    }
    ]
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
                { name: '销售（Sales）', max: 6500},
                { name: '管理（Administration）', max: 16000},
                { name: '信息技术（Information Technology）', max: 30000},
                { name: '客服（Customer Support）', max: 38000},
                { name: '研发（Development）', max: 52000},
                { name: '市场（Marketing）', max: 25000}
            ]
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
                    radius: radar.RADIUS,
                    // 水球颜色
                    // color: [waveColor[0][index], waveColor[1][index]],
                    itemStyle: {
                        opacity: 0.6
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'red',
                        },
                    },
                    label: {
                        normal: {
                            // formatter: function (params) {
                            //     const { seriesIndex, value } = params
                            //     return dataArr[seriesIndex].name + '\n\n' + (value * 100).toFixed(2) + '%'
                            // },
                            textStyle: {
                                fontSize: 12,
                                // color: color[index], //波浪上文本颜色
                                color: 'blue',
                                // insideColor: color[index], //波浪内部字体颜色
                                align: 'center',
                            },
                            // position: radar.LABLE_POSITION
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
                        name: '预算分配（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '实际开销（Actual Spending）'
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
                    <RadarAllConfig></RadarAllConfig>
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

