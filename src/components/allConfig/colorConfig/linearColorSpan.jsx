import React from 'react'
import reactCSS from 'reactcss'
const ColorSpan = (props) => {
    const {startColor,endColor} = props
    const styles = reactCSS({
        'default': {
            color: {
                flex: '1',
                height: '20px',
                borderRadius: '2px',
                lineHeight: '14px',
                textAlign: 'center',
                fontSize: '12px',
                background:'red'  ,   
                float:'left'  ,
                margin:'3px'         
                
            },
            colorWrap:{
                display:'flex',
                flexWap:'nowrap',
                justifyContent: 'space-evenly'
            }
            
        },
    });
    return (
        <div style={styles.colorWrap}>
        {
            startColor.map((item,index)=>{
                return <div style={{...styles.color,background: `linear-gradient(${startColor[index]},${endColor[index]})`}}>{}</div>
            })
        }
        </div>
    )
}
export default ColorSpan
