import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer, Tabs } from 'antd'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import CodeBoard from '@/components/CodeBoard/'
import Canvans from '@/components/Canvas/'
import WordCloudAllConfig from './wordCloudAllConfig'
import WordCloudBaseConfig from './wordCloudBaseConfig'
import * as echarts from 'echarts'
const { TabPane } = Tabs;
const WordCloud = ({ wordCloudConfig, dispatch }) => {
    // return (<div>asdadas</div>)
    console.log(wordCloudConfig)
    let { title, wordCloud, color, tooltip,data } = wordCloudConfig
    
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
                       const colorArr =  colorConfig()
                       const randomIndex =  Math.floor(Math.random()*colorArr.length)
                       return colorArr[randomIndex]
                    }
                },
                emphasis: {
                    focus: wordCloud.emphasisFocus,
                    textStyle: {
                        shadowBlur:wordCloud.emphasisTextStyleShadowBlur,
                        shadowColor: wordCloud.emphasisTextStyleShadowColor
                    }
                },
                data: data
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
                    <Tabs defaultActiveKey="2" centered>
                        <TabPane
                            tab={<span> 数据设置 </span>}
                            key="1"
                        >
                            <WordCloudBaseConfig></WordCloudBaseConfig>
                        </TabPane>
                        <TabPane
                            tab={<span> 详细设置 </span>}
                            key="2"
                        >
                            <WordCloudAllConfig></WordCloudAllConfig>
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
export default connect(mapStateToProps)(WordCloud)

