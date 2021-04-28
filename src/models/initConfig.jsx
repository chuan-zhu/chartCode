export const initTitleConfig ={
    show: true,
    text: '标题内容',
    titleTextColor: '#333',
    titleTextFontStyle: 'normal',  //斜体，常规
    titleTextFontWeight: 'bolder',
    titleTextFontFamily: 'sans-serif',
    titleTextFontSize: 18,
    subtext: '副标题内容',
    subtextColor: '#aaa',
    subtextFontStyle: 'normal',
    subtextFontWeight: 'normal',
    subtextFontFamily: 'sans-serif',
    subtextFontSize: 12,
    titleTextAlign: 'auto',
    textVerticalAlign: "auto",
    titleLeft: 'center',
    titleTop: 'auto',
    titleRight: 'auto',
    titleBottom: 'auto',
}
export const initLegendConfig = {
    show: true,
    legendLeft: 'auto',
    legendTop: 'auto',
    legendRight: 'auto',
    legendBottom: 'auto',
    legendOrient: 'vertical',
    legendItemGap: 10,
    legendItemWidth: 25,
    legendItemHeight: 14,
    legendSelectedMode: true,
    legendTextColor: '#333',
    legendFontStyle: 'normal',
    legendFontWeight: 'normal',
    legendFontFamily: 'sans-serif',
    legendFontSize: 12,
    legendIcon: 'rect',
    legendData: []
}
export const initGridConfig = {
    show: true,
    gridLeft: '10%',
    gridTop: 60,
    gridRight: '10%',
    gridBottom: 60,
    gridContainLabel: false
}
export const initXAxisConfig = {
    show: true,
    xAxisPosition: 'bottom',
    xAxisType: 'category',
    xAxisName: '种类',
    xAxisNameLocation: 'end',
    xAxisNameTextStyleColor: 'red',
    xAxisNameTextStyleFontFamily: 'sans-serif',
    xAxisNameTextStyleFontSize: 12,
    xAxisNameGap: 15,
    xAxisNameRotate: 0,
    xAxisInverse: false,
    xAxisMin: '',
    xAxisMAX: '',
    // 轴线
    xAxisLineShow: true,
    xAxisLineSymbol: 'none',
    lineStylecolor: '#333',
    xAxisLineWidth: 1,
    xAxisLineType: 'solid',
    xAxisLineOpacity: 1,
    // 刻度
    xAxisTickShow: true,
    xAxisTickInside: true,
    xAxisTickLength: 5,
    // 刻度标签
    xAxisLabelShow: true,
    xAxisLabelInside: false,
    xAxisLabelRotate: 0,
    xAxisLabelMargin: 8,
    xAxisLabelColor: 'green',
    xAxisLabelFontFamily: 'sans-serif',
    xAxisLabelFontSize: 12,
    // 分割线
    xAxiSplitLineShow: true,
    xAxiSplitLineLineStyleColor: ['#ccc'],
    xAxiSplitLineLineStyleWidth: 1,
    xAxiSplitLineLineStyleType: 'solid',
    xAxiSplitLineLineStyleOpacity: 1
}
export const initYAxisConfig = {
    show: true,
    yAxisPosition: 'left',
    yAxisType: 'value',
    yAxisName: '单位：元',
    yAxisNameLocation: 'end',
    yAxisNameTextStyleColor: 'red',
    yAxisNameTextStyleFontFamily: 'sans-serif',
    yAxisNameTextStyleFontSize: 12,
    yAxisNameGap: 0,
    yAxisNameRotate: 0,
    yAxisInverse: false,
    yAxisMin: null,
    yAxisMAX: null,
    // 轴线
    yAxisLineShow: true,
    yAxisLineSymbol: ["none", "arrow"],
    lineStylecolor: '#333',
    yAxisLineWidth: 1,
    yAxisLineType: 'solid',
    yAxisLineOpacity: 1,
    // 刻度
    yAxisTickShow: false,
    yAxisTickInside: false,
    yAxisTickLength: 5,
    // 刻度标签
    yAxisLabelShow: true,
    yAxisLabelInside: false,
    yAxisLabelRotate: 0,
    yAxisLabelMargin: 0,
    yAxisLabelColor: 'black',
    yAxisLabelFontFamily: 'sans-serif',
    yAxisLabelFontSize: 12,
    // 分割线
    yAxiSplitLineIsShow: true,
    yAxisplitLineLineStyleColor: ['green'],
    yAxisplitLineLineStyleWidth: 1,
    yAxisplitLineLineStyleType: 'dashed',
    yAxisplitLineLineStyleOpacity: 1
}
export const initColorConfig = {
    colorType:["define", "solid"],
    color:["#6F9CEB", "#FEC368"],
    linearType:'linear',
    linearColorDirection:'0,0,0,1',
    radialColorDirection:'0.5,0.5,1',
    linearColorStart:["#7EAAF9","#FEC368","#B6A1E5","#7CC6D1"],
    linearColorEnd:["#3F77DB","#DC8901","#8C6BD4","#388F98"],
    linearColorSeries: 0
}
export const initTooltipConfig = {
    show: true,
    trigger : 'item',
    triggerOn : 'mousemove',
    formatterType:"string",//模板字符串  回调函数
    formatter :'{a}<br />{b}:{c}',
    backgroundColor :'rgba(250,250,250,0.7)',
    borderColor : '#333',
    borderWidth:null,
    padding : 5
}
export const initBarConfig = {
    barName: '',
    barLegendHoverLink: true,
    barLabelShow: true,
    barLabelPosition: 'inside',
    barLabelDistance: 5,
    barLabelRotate: 0,
    barLabelOffset: [10, 30],
    barLabelColor: "#fff",
    barLabelFontSize: 12,
    barLabelLineShow: false,
    barLabelLineSmooth: true,
    barLabelLineStyleColor: "blue",
    barLabelLineStyleWidth: 1,
    barLabelLineStyleYype: 'solid',
    barItemStyleColor: null,
    barItemStyleBorderColor: '#000',
    barItemStyleBorderWidth: 1,
    barBorderRadius:[15, 5, 10, 0],
    barWidth: null,
    barMinHeight: null,
}
export const initLineConfig = {
    lineName: '',
    lineLegendHoverLink: true,
    lineShowSymbol:true,
    lineSymbol:'emptyCircle',
    lineSymbolSize:10,
    lineSymbolRotate:0,
    lineSymbolOffset:[0,0],

    lineLabelShow: true,
    lineLabelPosition: 'top',
    lineLabelDistance: 5,
    lineLabelRotate: 0,
    lineLabelOffset: [0, 0],
    lineLabelFormatter:'{c}',
    lineLabelColor: "#fff",
    lineLabelFontSize: 12,

    lineEndLabelShow:false,
    lineEndLabelDistance: 5,
    lineEndLabelRotate: 0,
    lineEndLabelOffset: [0, 0],
    lineEndLabelFormatter:'{c}',
    lineEndLabelColor: "#000",
    lineEndLabelFontSize: 12,

    lineLabelLineShow: false,
    lineLabelLineShowAbove: false,
    lineLabelLineSmooth: false,
    lineLabelLineStyleColor: "blue",
    lineLabelLineStyleWidth: 1,
    lineLabelLineStyleType: 'solid',
    
    // lineItemStyleBorderColor: '#000',
    lineItemStyleBorderWidth: 1,
    lineItemStyleBorderType:'solid',
    
    lineStyleWidth:2,
    lineStyleType:'solid',
    lineStyleOpacity:1,

    lineAreaStyleColor:'#fff',
    lineAreaStyleOrigin :'auto',
    lineAreaStyleOpacity:0,

    lineEmphasisScale:true,
    lineEmphasisFocus:'none',
    lineEmphasisBlurScope:'coordinateSystem',

}
export const initPieConfig = {
    legendHoverLink: true,
    clockwise:true,
    startAngle:90,
    minAngle:0,
    roseType:'radius' ,//'area'
    avoidLabelOverlap :true,
    left:'center',
    top:'center',
    // right:0,
    // bottom:0,
    // center:['50%', '50%'],
    radius : [0, '45%'],
    
    lableShow:true,
    labelPosition : 'outside',//'inside'  'center'
    labelFormatter:'{b}: {d}',
    labelColor:'#000',
    labelFontSize:12,
    labelAlignTo:  'none'  ,//'labelLine','edge'    标签的对齐方式，仅当 position 值为 'outer' 时有效。

    labelLineShow:true,
    length:null,
    length2:null,
    smooth:0,
    labelLineLineStyleColor :"#000",
    LabelLineStyleWidth: 1,
    LabelLineStyleType: 'solid',

    itemStyleColor: '',
    itemStyleBorderColor: 'red',
    itemStyleBorderWidth: 1,
    itemStyleBorderType:'solid',
    itemStyleShadowBlur:10,
    itemStyleShadowColor:'rgba(0, 0, 0, 0.5)',
    itemStyleBorderRadius:[10, 20],

    emphasisScale : true,
    emphasisScaleSize : 10,
    emphasisFocus:'none',//'self','series' 
    emphasisLabelShow:true,
    emphasisLabelColor:'#FFF',
    emphasisLabelFontSize:16,

    // lineStyleWidth:2,
    // lineStyleType:'solid',
    // lineStyleOpacity:1,












}
export const initLiquidfillConfig ={
    show:true
}
export const initWordCloudConfig ={
    show:true
}




































