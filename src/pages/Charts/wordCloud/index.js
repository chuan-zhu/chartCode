import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import WordCloudAllConfig from './wordCloudAllConfig'

import * as echarts from 'echarts'
const WordCloud = ({ wordCloudConfig, dispatch }) => {
    // return (<div>asdadas</div>)
    console.log(wordCloudConfig)
    let { title, wordCloud, color, tooltip } = wordCloudConfig
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
        var JosnList = [
            { name: "龙头镇", value: "111" },
            { name: "大埔镇", value: "222" },
            { name: "太平镇", value: "458" },
            { name: "沙埔镇", value: "445" },
            { name: "东泉镇", value: "456" },
            { name: "凤山镇", value: "647" },
            { name: "a", value: "189" },
            { name: "s", value: "864" },
            { name: "阿萨德", value: "652" },
            { name: "为", value: "458" },
            { name: "嗯嗯", value: "445" },
            { name: "发给", value: "456" },
            { name: "让他", value: "647" },
            { name: "和好", value: "189" },
            { name: "儿童", value: "864" },
            { name: "医院", value: "652" },
            { name: "看看", value: "458" },
            { name: "微博", value: "445" },
            { name: "你吗", value: "456" },
            { name: "熊是", value: "647" },
            { name: "爱宠", value: "189" },
            { name: "阿沙文", value: "864" },
            { name: "确认单", value: "652" },

        ];
        const seriesConfig = () => {
            let seriesItem = {
                type: 'wordCloud',
                shape: wordCloud.shape,
                left: wordCloud.left,
                top: wordCloud.top,
                width: wordCloud.width,
                height: wordCloud.height,
                sizeRange: wordCloud.sizeRange,
                rotationRange:wordCloud.rotationRange,
                rotationStep: wordCloud.rotationStep,
                gridSize: wordCloud.gridSize,
                drawOutOfBound: wordCloud.drawOutOfBound,
                layoutAnimation: wordCloud.layoutAnimation,
                textStyle: {
                    fontFamily: wordCloud.textStyleFontFamily,
                    fontWeight: wordCloud.textStyleFontWeight,
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    focus: wordCloud.emphasisFocus,
                    textStyle: {
                        shadowBlur:wordCloud.emphasisTextStyleShadowBlur,
                        shadowColor: wordCloud.emphasisTextStyleShadowColor
                    }
                },
                data: JosnList
            }
            return seriesItem
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
                    <div id="wordCloud" className="canvas_wrap">
                        <Canvans option={option}></Canvans>
                    </div>
                </Col>
                <Col span={7} className="graph_part">
                    <WordCloudAllConfig></WordCloudAllConfig>
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
export default connect(mapStateToProps)(WordCloud)

