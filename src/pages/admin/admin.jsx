import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Bar from '../charts/bar/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'

import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './admin.css'

const {  Sider, Content } = Layout
const { Header } = Layout;

/*
后台管理的路由组件
 */
class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const user = this.props.user
    return (
      <Layout style={{height:'100%'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="side-scroll" >
          <div className="logo" />
          <LeftNav />
        </Sider>
        <Layout className="site-layout side-scroll" >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background side-scroll"
            style={{
              margin: '16px 0 16px 16px',
              minHeight: 280,
            }}
          >
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Route component={NotFound} /> {/*上面没有一个匹配, 直接显示*/}
            </Switch>
          </Content>
        </Layout>
      </Layout>


    )
  }
}


export default connect(
  state => ({ user: state.user }),
  {}
)(Admin)