import React, { Component } from 'react'
import { Tabs } from 'antd';
import BaseConfig from '@components/baseConfig/baseConfig'
import LineAllConfig from './lineAllConfig'
const { TabPane } = Tabs;
// ant-tabs-nav
export default class lineConfig extends Component {
    render() {
        return (
            <Tabs defaultActiveKey="2" centered>
                <TabPane
                    tab={ <span> 基础设置 </span> }
                    key="1"
                >
                    <BaseConfig></BaseConfig>
                </TabPane>
                <TabPane
                    tab={ <span> 详细设置 </span> }
                    key="2"
                >
                    <LineAllConfig></LineAllConfig>
            </TabPane>
            </Tabs>
        )
    }
}
