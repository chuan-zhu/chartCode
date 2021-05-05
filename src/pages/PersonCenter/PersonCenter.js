
import { Row, Col, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import PersonHome from './components/PersonHome'
import PersonInfo from './components/PersonInfo'
import { PageContainer } from '@ant-design/pro-layout';

const PersonCenter = () => {
    return (<PageContainer title={false}>
        <Row gutter={[24, 24]}>
            <Col span={7}>
                <PersonInfo></PersonInfo>
            </Col>
            <Col span={17}>
                <PersonHome></PersonHome>
            </Col>
        </Row>
    </PageContainer>
    )
}

export default PersonCenter
