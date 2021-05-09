import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import MapAllConfig from './mapAllConfig'
// import * as MapJson from './china'
require('./china.js')
import * as echarts from 'echarts'
import './index.less'
const Map = ({ mapConfig, dispatch }) => {
    // return (<div>asdadas</div>)
    console.log(mapConfig)
    let { title, legend, map, color, tooltip } = mapConfig
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
        const mapConfig = {
            center: map.center,
            radius: map.radius,
            startAngle: map.startAngle,
            splitNumber: map.splitNumber,
            shape: map.shape,//'polygon' 和 'circle'。
            name: {
                nameShow: map.nameShow,
                nameColor: map.nameColor,
                nameFontSize: map.nameFontSize,
            },
            nameGap: map.nameGap,
            axisLine: {
                show: map.axisLineShow,
                symbol: map.axisLineSymbol,
                symbolSize: map.axisLineSymbolSize,
                symbolOffset: map.axisLineSymbolOffset,
                lineStyle: {
                    color: map.axisLineLineStyleColor,
                    width: map.axisLineLineStyleWidth,
                    type: map.axisLineLineStyleType,
                    cap: map.axisLineLineStyleCap,
                    shadowColor: map.axisLineLineStyleShadowColor,
                    opacity: map.axisLineLineStyleOpacity,
                },
            },
            axisTick: {
                show: map.axisTickShow,
                length: map.axisTickLength,
                lineStyle: {
                    color: map.axisTickLineStyleColor,
                    width: map.axisTickLineStyleWidth,
                    type: map.axisTickLineStyleType,
                    cap: map.axisTickLineStyleCap,
                    shadowColor: map.axisTickLineStyleShadowColor,
                    opacity: map.axisTickLineStyleOpacity,
                },
            },
            axisLabel: {
                show: map.axisLabelShow,
                rotate: map.axisLabelRotate,
                margin: map.axisLabelMargin,
                showMinLabel: map.axisLabelShowMinLabel,
                showMaxLabel: map.axisLabelShowMaxLabel,
                color: map.axisLabelColor,
                fontSize: map.axisLabelFontSize,
                align: map.axisLabelAlign,
                verticalAlign: map.axisLabelVerticalAlign,
            },
            splitLine: {
                show: map.splitLineShow,
                lineStyle: {
                    color: map.splitLineLineStyleColor,
                    width: map.splitLineLineStyleWidth,
                    type: map.splitLineLineStyleType,
                    cap: map.splitLineLineStyleCap,
                    opacity: map.splitLineLineStyleOpacity,
                },
                splitArea: {
                    show: map.splitAreaShow,
                    areaStyle: {
                        color: map.splitAreaAreaStyleColor,
                        shadowBlur: map.splitAreaAreaStyleShadowBlur,
                        shadowColor: map.splitAreaAreaStyleShadowColor,
                        opacity: map.splitAreaAreaStyleOopacity,
                    },
                }
            },
            indicator: [
                { name: '销售（Sales）', max: 6500 },
                { name: '管理（Administration）', max: 16000 },
                { name: '信息技术（Information Technology）', max: 30000 },
                { name: '客服（Customer Support）', max: 38000 },
                { name: '研发（Development）', max: 52000 },
                { name: '市场（Marketing）', max: 25000 }
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
                    radius: map.RADIUS,
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
                            // position: map.LABLE_POSITION
                        }
                    },
                }
                seriesArr.push(seriesItem)
            })
            return seriesArr
        }
        var points = [
            {value: [118.8062, 31.9208],itemStyle:{color:'#4ab2e5'}}
            , {value: [127.9688, 45.368],itemStyle:{color:'#4fb6d2'}}
            , {value: [110.3467, 41.4899],itemStyle:{color:'#52b9c7'}}
            , {value: [125.8154, 44.2584],itemStyle:{color:'#5abead'}}
            , {value: [116.4551, 40.2539],itemStyle:{color:'#f34e2b'}}
            , {value: [123.1238, 42.1216],itemStyle:{color:'#f56321'}}
            , {value: [114.4995, 38.1006],itemStyle:{color:'#f56f1c'}}
            , {value: [117.4219, 39.4189],itemStyle:{color:'#f58414'}}
            , {value: [112.3352, 37.9413],itemStyle:{color:'#f58f0e'}}
            , {value: [109.1162, 34.2004],itemStyle:{color:'#f5a305'}}
            , {value: [103.5901, 36.3043],itemStyle:{color:'#e7ab0b'}}
            , {value: [106.3586, 38.1775],itemStyle:{color:'#dfae10'}}
            , {value: [101.4038, 36.8207],itemStyle:{color:'#d5b314'}}
            , {value: [103.9526, 30.7617],itemStyle:{color:'#c1bb1f'}}
            , {value: [108.384366, 30.439702],itemStyle:{color:'#b9be23'}}
            , {value: [113.0823, 28.2568],itemStyle:{color:'#a6c62c'}}
            , {value: [102.9199, 25.46639],itemStyle:{color:'#96cc34'}}
            , {value: [119.4543, 25.9222]}
]
        return {
            title: titleConfig,
            tooltip: {
                trigger: 'item',
            },
            visualMap: {
                left: '50',
                bottom: '20',
                show: true,
                showLabel: true,
                itemWidth: 10,
                itemHeight: 15,
                inRange: {
                    color: ['#50b3ff', '#4285ff', '#2963cf'] // 渐变色
                },
                pieces: [
                    { gt: 10000, label: '10000以上', color: '#1e7dff' },           // 不指定 max，表示 max 为无限大（Infinity）。
                    { gt: 1000, lte: 9999, label: '1000-9999', color: '#3192ff' },
                    { gt: 100, lte: 999, label: '100-999', color: '#2badff' },
                    { gt: 50, lte: 99, label: '50-99', color: '#51c4ff' },
                    { lte: 49, color: '#79d8ff', label: '0-49' }     // 不指定 min，表示 min 为无限大（-Infinity）。
                ],
                itemSymbol: 'circle',
                textStyle: {
                    color: '#666',
                    fontSize: 14,
                    fontFamily: 'MicrosoftYaHei'
                }
            },
            // geo: {
            //     map: 'china',
            //     label: {
            //         emphasis: {
            //             show: false,
            //         },
            //     },
            //     roam: false,
            //     layoutCenter: ['50%', '50%'],
            //     layoutSize: '80%',
            //     itemStyle: {
            //         normal: {
            //             areaColor: 'red',
            //             borderWidth: 0,
            //             borderColor: '#111',
            //         },
            //         emphasis: {
            //             areaColor: '#2a333d',
            //         },
            //     },
            //     tooltip:{show : true},
            //     silent: true
            // },
            series: [
                {
                    name: '2011全国GDP分布',
                    type: 'map',
                    mapType: 'china',
                    layoutCenter: ['50%', '50%'],
                    layoutSize: '80%',
                    roam: false,
                    label: {
                        show: true,
                        color: '#333',
                        formatter: function (params) {
                            return params.name
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 0
                        },
                        emphasis: { label: { show: true } },
                        borderColor: '#eee',
                    },
                    silent: true,
                    
                    data: [
                        { name: '西藏', value: 605.83 },
                        { name: '青海', value: 10.44 },
                        { name: '宁夏', value: 22.21 },
                        { name: '海南', value: 22.66 },
                        { name: '甘肃', value: 50.37 },
                        { name: '贵州', value: 51.84 },
                        { name: '新疆', value: 60.05 },
                        { name: '云南', value: 883.12 },
                        { name: '重庆', value: 111.37 },
                        { name: '吉林', value: 108.83 },
                        { name: '山西', value: 1127.55 },
                        { name: '天津', value: 1107.28 },
                        { name: '江西', value: 1102.82 },
                        { name: '广西', value: 120.87 },
                        { name: '陕西', value: 512.3 },
                        { name: '黑龙江', value: 182 },
                        { name: '内蒙古', value: 359.88 },
                        { name: '安徽', value: 1500.65 },
                        { name: '北京', value: 1651.93, },
                        { name: '福建', value: 1560.18 },
                        { name: '上海', value: 1995.69,  },
                        { name: '湖北', value: 1932.26 },
                        { name: '湖南', value: 1969.56 },
                        { name: '四川', value: 226.68 },
                        { name: '辽宁', value: 226.7 },
                        { name: '河北', value: 24515.76 },
                        { name: '河南', value: 26931.03 },
                        { name: '浙江', value: 32318.85 },
                        { name: '山东', value: 45361.85 },
                        { name: '江苏', value: 49110.27 },
                        { name: '广东', value: 53210.28, },
                    ],
                },
                
            ],
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

    let aOPtion = {
        backgroundColor: 'transparent',
        title: {
            text: '全国主要城市空气质量',
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center',
            textStyle: {
                color: '#fff',
            },
        },
        tooltip: {
            trigger: 'item',
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false,
                },
            },
            roam: false, // 是否允许缩放
            layoutCenter: ['50%', '50%'],
            layoutSize: '80%',
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111',
                },
                emphasis: {
                    areaColor: '#2a333d',
                },
            },
            silent: true
        },
        series: [
            {
                name: '2011全国GDP分布',
                type: 'map',
                mapType: 'china',
                mapLocation: {
                    x: 'left',
                },
                geoIndex: 0,
                // selectedMode: 'multiple',
                itemStyle: {
                    normal: { label: { show: true, color: '#333' }, borderWidth: 0 },
                    // emphasis: { label: { show: true } },
                    // borderWidth: 0,
                    // borderColor: '#eee',
                },
                data: [
                    { name: '西藏', value: 605.83 },
                    { name: '青海', value: 1670.44 },
                    { name: '宁夏', value: 2102.21 },
                    { name: '海南', value: 2522.66 },
                    { name: '甘肃', value: 5020.37 },
                    { name: '贵州', value: 5701.84 },
                    { name: '新疆', value: 6610.05 },
                    { name: '云南', value: 8893.12 },
                    { name: '重庆', value: 10011.37 },
                    { name: '吉林', value: 10568.83 },
                    { name: '山西', value: 11237.55 },
                    { name: '天津', value: 11307.28 },
                    { name: '江西', value: 11702.82 },
                    { name: '广西', value: 11720.87 },
                    { name: '陕西', value: 12512.3 },
                    { name: '黑龙江', value: 12582 },
                    { name: '内蒙古', value: 14359.88 },
                    { name: '安徽', value: 15300.65 },
                    { name: '北京', value: 16251.93, selected: true },
                    { name: '福建', value: 17560.18 },
                    { name: '上海', value: 19195.69, selected: true },
                    { name: '湖北', value: 19632.26 },
                    { name: '湖南', value: 19669.56 },
                    { name: '四川', value: 21026.68 },
                    { name: '辽宁', value: 22226.7 },
                    { name: '河北', value: 24515.76 },
                    { name: '河南', value: 26931.03 },
                    { name: '浙江', value: 32318.85 },
                    { name: '山东', value: 45361.85 },
                    { name: '江苏', value: 49110.27 },
                    { name: '广东', value: 53210.28, selected: true },
                ],
            },
        ]

    }

    let [showCode, setShowCode] = useState(false)
    return (
        <div className="right_wrap">
            <Row className="graph_wrap">
                <Col span={17} className="graph_part left_part" >
                    <div id="map" className="canvas_wrap">
                        <Canvans option={option}></Canvans>
                    </div>
                </Col>
                <Col span={7} className="graph_part">
                    <MapAllConfig></MapAllConfig>
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
export default connect(mapStateToProps)(Map)

