import React from 'react'
import { Row, Col, Card, Avatar, Tag, Divider } from 'antd';
import { UserOutlined ,TwitterOutlined,GithubOutlined,} from '@ant-design/icons'
const { Meta } = Card;
import styles from './PersonInfo.less'
const PersonInfo = () => {
    return (
        <div className={styles.account}>
            <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta
                    title="CHUAN_ZHU(老衲不生气)"
                />
                <Row >
                    <Col span={2}>
                        <UserOutlined />
                    </Col>
                    <Col span={20}>
                        <Tag>男</Tag>
                        <Tag>25岁</Tag>
                        <Tag >山西</Tag>
                        <Tag >前端</Tag>
                    </Col>
                </Row>
                <Divider style={{borderColor:"#1890ff"}} dashed orientation="left">快速链接</Divider>
                <Row>

                <Tag icon={<TwitterOutlined />} color="#55acee"><a href="https://www.baidu.com/" target="_blank">轻音乐</a></Tag>
                <Tag icon={<GithubOutlined />} ><a href="https://github.com/" target="_blank">github</a></Tag>
                </Row>
            </Card>

        </div>
    )
}
export default PersonInfo