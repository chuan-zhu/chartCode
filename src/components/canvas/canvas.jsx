import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './canvas.css'
const Canvans = (props) => {
    return (
        <ReactEcharts className="canvas" option={props.option} />
    )
}
export default Canvans
