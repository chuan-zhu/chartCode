import React, { Component, useState } from 'react'
import { Row, Col, Button, Drawer } from 'antd'
import AceEditor from "react-ace";
import {useSelector,useDispatch} from 'react-redux'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
const CodeBoard = (props) => {
    let { config } = useSelector((state) => ({ config: state.config, }));

    let b = {
        title: {
            text: config.text,
            textStyle:{
                color : config.titleTextColor,
                fontFamily : config.titleTextFontFamily,
                fontSize : config.titleTextFontSize
            },
            subtext  : config.subtext,
            subtextStyle:{
                color :config.subtextColor,
                fontFamily : config.subtextFontFamily,
                fontSize : config.subtextFontSize
            },
            textAlign : config.titleTextAlign,
            textVerticalAlign : config.textVerticalAlign,
            left  : config.titleLeft,
            top : config.titleTop,
            right: config.titleRight,
            bottom :config.titleBottom
        },
        tooltip: {},
        legend: {
            data: ['销量', '库存'],
            show : config.legendShow,
            left  : config.legendLeft,
            top : config.legendTop,
            right: config.legendRight,
            bottom :config.legendBottom,
            orient :config.legendOrient,
            itemGap :config.legendItemGap,
            itemWidth:config.legendItemWidth,
            itemHeight:config.legendItemHeight,
            selectedMode:config.legendSelectedMode,
            textStyle :{
                color :config.legendTextColor,
                fontFamily:config.legendFontFamily,
                fontSize :config.legendFontSize,
            },
            icon:config.legendIcon
        },
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '库存',
            type: 'bar',
            data: [3, 20, 25, 23, 20, 3]
        }]
    }
    const value = { a: 123, c: 'aaa' ,d: { a: { asd: "haiyoshui" } } }
    // d: { a: { asd: "haiyoshui" } }
    let str = JSON.stringify(b, null, 4)
    return (
        <AceEditor
            mode="java"
            theme="github"
            name="UNIQUE_ID_OF_DIV"
            readOnly='true'
            value={str}
            width='100%'
            height='100%'
            editorProps={{ $blockScrolling: true }}
        />
    )

}

export default CodeBoard
