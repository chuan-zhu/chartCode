import {FC} from 'react';
import ReactEcharts from 'echarts-for-react'
import styles from './index.less';
import 'echarts-liquidfill'
import 'echarts-wordcloud'

export type canvasProps = {
  option:Object
};

const Canvans:FC<canvasProps> = (props) => {
  console.log(props)
  return (
  <ReactEcharts className={styles.canvas} option={props.option} lazyUpdate={true}></ReactEcharts>
)};

export default Canvans;
