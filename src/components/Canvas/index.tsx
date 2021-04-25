import {FC} from 'react';
import ReactEcharts from 'echarts-for-react'
import styles from './index.less';

export type canvasProps = {
  option:Object
};

const Canvans:FC<canvasProps> = (props) => (
  <ReactEcharts className={styles.canvas} option={props.option}></ReactEcharts>
);

export default Canvans;
