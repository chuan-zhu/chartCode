
import { Row, Col, Card } from 'antd';
import {UserOutlined} from '@ant-design/icons'
const { Meta } = Card;
const PersonCenter = () => {
    return (
        <Row gutter={[24, 24]}>
            <Col span={7}>
                <Card
                    hoverable
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    {/* // <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                    <UserOutlined />CHUANZHU(乔木落叶)
                </Card>
            </Col>
            <Col span={19}></Col>
        </Row>
    )
}

export default PersonCenter
