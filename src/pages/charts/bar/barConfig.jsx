import React, { Component } from 'react'
import { Tabs } from 'antd';
import BaseConfig from '../../../components/baseConfig/baseConfig'
import BarAllConfig from './barAllConfig'
import './barConfig.css'
const { TabPane } = Tabs;
// ant-tabs-nav
export default class barConfig extends Component {
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
                    <BarAllConfig></BarAllConfig>
            </TabPane>
            </Tabs>
        )
    }
}
