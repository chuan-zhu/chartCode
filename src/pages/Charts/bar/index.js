import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import BarAllConfig from './barAllConfig/'
import { PageContainer } from '@ant-design/pro-layout';

import * as echarts from 'echarts'
import styles from './index.less'
const { TabPane } = Tabs;
const Bar = ({ barConfig, dispatch }) => {
    console.log(barConfig, dispatch)
    let { title, legend, grid, xAxis, yAxis, bar, color, tooltip } = barConfig;
    // 不可编辑的数组
    const data = [{
        name: "销量",
        value: [5, 20, 36, 10, 10, 20]
    },
    {
        name: "库存",
        value: [5, 20, 36, 10, 10, 20]
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
        const gridConfig = {
            show: grid.show,
            left: grid.gridLeft,
            top: grid.gridTop,
            right: grid.gridRight,
            bottom: grid.gridBottom,
            containLabel: grid.gridContainLabel
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
        const xAxisConfig = {
            show: xAxis.show,
            position: xAxis.xAxisPosition,
            type: xAxis.xAxisType,
            name: xAxis.xAxisName,
            location: xAxis.xAxisNameLocation,
            nameTextStyle: {
                color: xAxis.xAxisNameTextStyleColor,
                fontFamily: xAxis.xAxisNameTextStyleFontFamily,
                fontSize: xAxis.xAxisNameTextStyleFontSize,
            },
            nameGap: xAxis.xAxisNameGap,
            nameRotate: xAxis.xAxisNameRotate,
            inverse: xAxis.xAxisInverse,
            min: xAxis.xAxisMin,
            max: xAxis.xAxisMAX,
            // 轴线
            axisLine: {

                show: xAxis.xAxisLineShow,
                symbol: xAxis.xAxisLineSymbol,
                lineStyle: {
                    color: xAxis.lineStylecolor,
                    width: xAxis.xAxisLineWidth,
                    type: xAxis.xAxisLineType,
                    opacity: xAxis.xAxisLineOpacity,
                }
            },
            axisTick: {

                // 刻度
                show: xAxis.xAxisTickShow,
                inside: xAxis.xAxisTickInside,
                length: xAxis.xAxisTickLength,
            },
            axisLabel: {
                show: xAxis.xAxisLabelShow,
                // 刻度标签
                inside: xAxis.xAxisLabelInside,
                rotate: xAxis.xAxisLabelRotate,
                margin: xAxis.xAxisLabelMargin,
                color: xAxis.xAxisLabelColor,
                fontFamily: xAxis.xAxisLabelFontFamily,
                fontSize: xAxis.xAxisLabelFontSize,
            },
            splitLine: {

                // 分割线
                show: xAxis.xAxiSplitLineShow,
                lineStyle: {

                    color: xAxis.xAxiSplitLineLineStyleColor,
                    width: xAxis.xAxiSplitLineLineStyleWidth,
                    type: xAxis.xAxiSplitLineLineStyleType,
                    opacity: xAxis.xAxiSplitLineLineStyleOpacity,
                }
            },
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        }
        const yAxisConfig = {
            show: yAxis.show,
            position: yAxis.yAxisPosition,
            type: yAxis.yAxisType,
            name: yAxis.yAxisName,
            location: yAxis.yAxisNameLocation,
            nameTextStyle: {
                color: yAxis.yAxisNameTextStyleColor,
                fontFamily: yAxis.yAxisNameTextStyleFontFamily,
                fontSize: yAxis.yAxisNameTextStyleFontSize,
            },
            nameGap: yAxis.yAxisNameGap,
            nameRotate: yAxis.yAxisNameRotate,
            inverse: yAxis.yAxisInverse,
            min: yAxis.yAxisMin,
            max: yAxis.yAxisMAX,
            // 轴线
            axisLine: {
                show: yAxis.yAxisLineShow,
                symbol: yAxis.yAxisLineSymbol,
                lineStyle: {
                    color: yAxis.lineStylecolor,
                    width: yAxis.yAxisLineWidth,
                    type: yAxis.yAxisLineType,
                    opacity: yAxis.yAxisLineOpacity,
                }
            },
            axisTick: {
                // 刻度
                show: yAxis.yAxisTickShow,
                inside: yAxis.yAxisTickInside,
                length: yAxis.yAxisTickLength,
            },
            axisLabel: {
                show: yAxis.yAxisLabelShow,
                // 刻度标签
                inside: yAxis.yAxisLabelInside,
                rotate: yAxis.yAxisLabelRotate,
                margin: yAxis.yAxisLabelMargin,
                color: yAxis.yAxisLabelColor,
                fontFamily: yAxis.yAxisLabelFontFamily,
                fontSize: yAxis.yAxisLabelFontSize,
            },
            splitLine: {
                // 分割线
                show: yAxis.yAxiSplitLineIsShow,
                lineStyle: {
                    color: yAxis.yAxisplitLineLineStyleColor,
                    width: yAxis.yAxisplitLineLineStyleWidth,
                    type: yAxis.yAxisplitLineLineStyleType,
                    opacity: yAxis.yAxisplitLineLineStyleOpacity,
                }
            },
        }
        const seriesConfig = () => {
            let seriesArr = []
            data.forEach(item => {
                let seriesItem = {
                    name: item.name,
                    type: 'bar',
                    legendHoverLink: bar.barLegendHoverLink,
                    label: {
                        show: bar.barLabelShow,
                        position: bar.barLabelPosition,
                        distance: bar.barLabelDistance,
                        rotate: bar.barLabelRotate,
                        offset: bar.barLabelOffset,
                        color: bar.barLabelColor,
                        fontSize: bar.barLabelFontSize,
                    },
                    labelLine: {
                        show: bar.barLabelLineShow,
                        smooth: bar.barLabelLineSmooth,
                        lineStyle: {
                            color: bar.barLabelLineStyleColor,
                            width: bar.barLabelLineStyleWidth,
                            type: bar.barLabelLineStyleYype,
                        }

                    },
                    itemStyle: {
                        color: bar.barItemStyleColor,
                        borderColor: bar.barItemStyleBorderColor,
                        borderWidth: bar.barItemStyleBorderWidth,
                        borderRadius: bar.barBorderRadius,
                    },
                    barWidth: bar.barWidth,
                    barMinHeight: bar.barMinHeight,
                    data: item.value
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
            grid: gridConfig,
            xAxis: xAxisConfig,
            yAxis: yAxisConfig,
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

    console.log(option)
    let [showCode, setShowCode] = useState(false)
    return (
        <>
        {/* <PageContainer title={false}></PageContainer> */}
        <div title={false} className={styles.right_wrap}  content={false} pageHeaderRender={undefined}>
            <Row className={styles.graph_wrap} >
                <Col span={17} className={styles.graph_part } >
                    <Canvans option={option}></Canvans>
                </Col>
                <Col span={7} className={styles.config_part}>
                    <Tabs defaultActiveKey="2" centered>
                        <TabPane
                            tab={<span> 基础设置 </span>}
                            key="1"
                        >
                            {/* <BaseConfig></BaseConfig> */}
                        </TabPane>
                        <TabPane
                            tab={<span> 详细设置 </span>}
                            key="2"
                        >
                            <BarAllConfig></BarAllConfig>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row style={{ height: '40px', borderTop: '1px solid #1890ff' }} align="bottom">
                <Col offset={17} span={7}>
                    <Button type="primary" shape="round"
                        icon={<DownloadOutlined />} block onClick={() => setShowCode(true)}> 生成代码 </Button>
                </Col>
            </Row>
            <Drawer
                title="代码内容"
                width={620}
                onClose={() => setShowCode(false)}
                visible={showCode}
                footer={
                    <div className='btn_wrap'>
                        <Button type="primary" icon={<SaveOutlined />} size='middle' >保存至数据库</Button>
                        <Button type="primary" icon={<DownloadOutlined />} size='middle' >导出文件</Button>
                    </div>
                }
            >
                <CodeBoard option={option}></CodeBoard>
            </Drawer>
        </div>
    </>
    )

}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(Bar)
