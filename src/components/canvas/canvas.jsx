import React from 'react'
import { useSelector } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import './canvas.css'

const Canvans = (props) => {
    let { config } = useSelector((state) => ({ config: state.barConfig, }));
    // 不可编辑的数组
    const getOption = () => {
        return {
            title: {
                text: config.title.text,
                textStyle: {
                    color: config.title.titleTextColor,
                    fontFamily: config.title.titleTextFontFamily,
                    fontSize: config.title.titleTextFontSize
                },
                subtext: config.title.subtext,
                subtextStyle: {
                    color: config.title.subtextColor,
                    fontFamily: config.title.subtextFontFamily,
                    fontSize: config.title.subtextFontSize
                },
                textAlign: config.title.titleTextAlign,
                textVerticalAlign: config.title.textVerticalAlign,
                left: config.title.titleLeft,
                top: config.title.titleTop,
                right: config.title.titleRight,
                bottom: config.title.titleBottom
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存'],
                show: config.legend.show,
                left: config.legend.legendLeft,
                top: config.legend.legendTop,
                right: config.legend.legendRight,
                bottom: config.legend.legendBottom,
                orient: config.legend.legendOrient,
                itemGap: config.legend.legendItemGap,
                itemWidth: config.legend.legendItemWidth,
                itemHeight: config.legend.legendItemHeight,
                selectedMode: config.legend.legendSelectedMode,
                textStyle: {
                    color: config.legend.legendTextColor,
                    fontFamily: config.legend.legendFontFamily,
                    fontSize: config.legend.legendFontSize,
                },
                icon: config.legend.legendIcon
            },
            grid: {
                show: config.grid.show,
                left: config.grid.gridLeft,
                top: config.grid.gridTop,
                right: config.grid.gridRight,
                bottom: config.grid.gridBottom,
                containLabel: config.grid.gridContainLabel
            },
            xAxis: {
                show: config.xAxis.show,
                position: config.xAxis.xAxisPosition,
                type: config.xAxis.xAxisType,
                name: config.xAxis.xAxisName,
                location: config.xAxis.xAxisNameLocation,
                nameTextStyle: {
                    color: config.xAxis.xAxisNameTextStyleColor,
                    fontFamily: config.xAxis.xAxisNameTextStyleFontFamily,
                    fontSize: config.xAxis.xAxisNameTextStyleFontSize,
                },
                nameGap: config.xAxis.xAxisNameGap,
                nameRotate: config.xAxis.xAxisNameRotate,
                inverse: config.xAxis.xAxisInverse,
                min: config.xAxis.xAxisMin,
                max: config.xAxis.xAxisMAX,
                // 轴线
                axisLine: {

                    show: config.xAxis.xAxisLineShow,
                    symbol: config.xAxis.xAxisLineSymbol,
                    lineStyle: {
                        color: config.xAxis.lineStylecolor,
                        width: config.xAxis.xAxisLineWidth,
                        type: config.xAxis.xAxisLineType,
                        opacity: config.xAxis.xAxisLineOpacity,
                    }
                },
                axisTick: {

                    // 刻度
                    show: config.xAxis.xAxisTickShow,
                    inside: config.xAxis.xAxisTickInside,
                    length: config.xAxis.xAxisTickLength,
                },
                axisLabel: {
                    show: config.xAxis.xAxisLabelShow,
                    // 刻度标签
                    inside: config.xAxis.xAxisLabelInside,
                    rotate: config.xAxis.xAxisLabelRotate,
                    margin: config.xAxis.xAxisLabelMargin,
                    color: config.xAxis.xAxisLabelColor,
                    fontFamily: config.xAxis.xAxisLabelFontFamily,
                    fontSize: config.xAxis.xAxisLabelFontSize,
                },
                splitLine: {

                    // 分割线
                    show: config.xAxis.xAxiSplitLineShow,
                    lineStyle: {

                        color: config.xAxis.xAxiSplitLineLineStyleColor,
                        width: config.xAxis.xAxiSplitLineLineStyleWidth,
                        type: config.xAxis.xAxiSplitLineLineStyleType,
                        opacity: config.xAxis.xAxiSplitLineLineStyleOpacity,
                    }
                },
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {
                show: config.yAxis.show,
                position: config.yAxis.yAxisPosition,
                type: config.yAxis.yAxisType,
                name: config.yAxis.yAxisName,
                location: config.yAxis.yAxisNameLocation,
                nameTextStyle: {
                    color: config.yAxis.yAxisNameTextStyleColor,
                    fontFamily: config.yAxis.yAxisNameTextStyleFontFamily,
                    fontSize: config.yAxis.yAxisNameTextStyleFontSize,
                },
                nameGap: config.yAxis.yAxisNameGap,
                nameRotate: config.yAxis.yAxisNameRotate,
                inverse: config.yAxis.yAxisInverse,
                min: config.yAxis.yAxisMin,
                max: config.yAxis.yAxisMAX,
                // 轴线
                axisLine: {
                    show: config.yAxis.yAxisLineShow,
                    symbol: config.yAxis.yAxisLineSymbol,
                    lineStyle: {
                        color: config.yAxis.lineStylecolor,
                        width: config.yAxis.yAxisLineWidth,
                        type: config.yAxis.yAxisLineType,
                        opacity: config.yAxis.yAxisLineOpacity,
                    }
                },
                axisTick: {
                    // 刻度
                    show: config.yAxis.yAxisTickShow,
                    inside: config.yAxis.yAxisTickInside,
                    length: config.yAxis.yAxisTickLength,
                },
                axisLabel: {
                    show: config.yAxis.yAxisLabelShow,
                    // 刻度标签
                    inside: config.yAxis.yAxisLabelInside,
                    rotate: config.yAxis.yAxisLabelRotate,
                    margin: config.yAxis.yAxisLabelMargin,
                    color: config.yAxis.yAxisLabelColor,
                    fontFamily: config.yAxis.yAxisLabelFontFamily,
                    fontSize: config.yAxis.yAxisLabelFontSize,
                },
                splitLine: {
                    // 分割线
                    show: config.yAxis.yAxisplitLineShow,
                    lineStyle: {
                        color: config.yAxis.yAxisplitLineLineStyleColor,
                        width: config.yAxis.yAxisplitLineLineStyleWidth,
                        type: config.yAxis.yAxisplitLineLineStyleType,
                        opacity: config.yAxis.yAxisplitLineLineStyleOpacity,
                    }
                },
            },
            series: [{
                name: '销量',
                type: 'bar',
                legendHoverLink: config.barLegendHoverLink,
                label: {
                    show: config.bar.barLabelShow,
                    position: config.bar.barLabelPosition,
                    distance: config.bar.barLabelDistance,
                    rotate: config.bar.barLabelRotate,
                    offset: config.bar.barLabelOffset,
                    color: config.bar.barLabelColor,
                    fontSize: config.bar.barLabelFontSize,
                },
                labelLine: {
                    show: config.bar.barLabelLineShow,
                    smooth: config.bar.barLabelLineSmooth,
                    lineStyle: {
                        color: config.bar.barLabelLineStyleColor,
                        width: config.bar.barLabelLineStyleWidth,
                        type: config.bar.barLabelLineStyleYype,
                    }

                },
                itemStyle: {
                    color: config.bar.barItemStyleColor,
                    borderColor: config.bar.barItemStyleBorderColor,
                    borderWidth: config.bar.barItemStyleBorderWidth,
                },
                barWidth: config.bar.barWidth,
                barMinHeight: config.bar.barMinHeight,
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '库存',
                type: 'bar',
                data: [3, 20, 25, 23, 20, 3]
            }],
            color:["#6F9CEB", "#FEC368"]
        }
    }
    // 删除配置内容为空的值
    const removePropertyOfNull = function (obj) {
        Object.keys(obj).forEach(item => {
            if (obj[item] === null || obj[item] === '' ||obj[item] === undefined) {
                delete obj[item]
            }
            if (obj[item] instanceof Object) {
                removePropertyOfNull(obj[item])
            }
        })
        // console.log("xin", obj)
        return obj;
    }

    return (
        <ReactEcharts className="canvas" option={removePropertyOfNull(getOption())} />
    )

}
export default Canvans
