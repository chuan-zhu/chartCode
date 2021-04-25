import React from 'react'
import styles from './index.less'
const ColorSpan = (props) => {
    const {startColor,endColor} = props
    
    return (
        <div className={styles.colorWrap}>
        {
            startColor.map((item,index)=>{
                return <div className={styles.color} style={{background:'linear-gradient('+startColor[index]+','+endColor[index]+')'}}>{}</div>
            })
        }
        </div>
    )
}
export default ColorSpan
