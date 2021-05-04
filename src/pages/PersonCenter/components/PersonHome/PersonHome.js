import React, { FC } from 'react'
import { Row, Col, Card, Tabs, List, Avatar, Space, Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { connect } from 'umi'
import styles from './PersonHome.less'
const { TabPane } = Tabs;
const { Meta } = Card;

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const description = (descriptionArr) => {
    let tags = descriptionArr.map(item => {
        return <Tag color="#55acee">{item}</Tag>
    })
    return tags
}
const PersonHome = ({ articleList: { list, projectList } }) => {
    return (
        <Tabs defaultActiveKey="1" className={styles.tabs} >
            <TabPane tab={"文章(" + list.length + ')'} key="1">
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={item.href}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                        >
                            <List.Item.Meta
                                title={<a href={item.href} target="_blank">{item.title}</a>}
                                description={description(item.description)}
                            />
                            {item.content}
                            <div style={{ margin: '15px 0' }}>
                                <Avatar size="small" src='./avatar.png'></Avatar>
                                <span style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px' }}>
                                    发布在 <a href={item.href} target="_blank">{item.href}</a>
                                </span>
                            </div>
                        </List.Item>
                    )}
                />
            </TabPane>
            <TabPane tab="项目" key="2" className={styles.project_wrap}>
                {projectList.map(item => {
                    return <Col span={8}><Card
                        hoverable
                        style={{ width: '100%' }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Meta
                            avatar={<Avatar src='./avatar.png' />}
                            title={item.title}
                            description={description(item.description)}
                        />
                    </Card></Col>
                })
                }
            </TabPane>
        </Tabs>
    )
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(PersonHome)
