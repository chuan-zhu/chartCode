import React from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts'
import './canvas.css'

const Canvans = (props) => {
    let { config: { title, legend, grid, xAxis, yAxis, bar, color } } = useSelector((state) => ({ config: state.barConfig, }));
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
                show: yAxis.yAxisplitLineShow,
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
                        let colorItem = new echarts.graphic.RadialGradient(...color.linearColorDirection, [{
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
            tooltip: {},
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
    console.log(getOption())
    return (
        <ReactEcharts className="canvas" option={removePropertyOfNull(getOption())} />
    )

}
export default Canvans
