import React, { Component,useState } from 'react'
import { Row, Col, Button, Drawer } from 'antd'
import { DownloadOutlined } from '@ant-design/icons';
import BarConfig from './barConfig'
import Canvans from '@components/canvas/canvas'
import CodeBoard from '@components/codeBoard/codeBoard'
import './bar.css'
const Bar = () => {
    let [showCode, setShowCode] = useState(false)
    return (
        <>
            <Row className="graph-wrap">
                <Col span={17} id="bar" className="graph-part" >
                    <Canvans></Canvans>
                </Col>
                <Col span={7} className="graph-part">
                    <BarConfig></BarConfig>
                </Col>
            </Row>
            <Row style={{ height: '50px',borderTop: '1px solid #1890ff' }} align="middle">
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
                <CodeBoard></CodeBoard>
                </Drawer>
        </>
    )

}

export default Bar
