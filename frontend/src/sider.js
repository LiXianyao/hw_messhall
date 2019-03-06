import { Menu,Button } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react';
import cookie from 'react-cookies'
import {withRouter} from 'react-router'

class MySider extends React.Component {
  logout = () =>
  {
    cookie.remove("userId",{path:'/'});
    cookie.remove("userType",{path:'/'});
    this.props.history.push('/login')
  }

  render() {
    return (
      <Menu
        style={{ height:'100%' }}
        defaultSelectedKeys={this.props.siderValue}
        mode="inline"
      >
        <Menu.Item key="food"><Link to={{ pathname: "/food"}}>餐品列表</Link></Menu.Item>
        <Menu.Item key="cart"><Link to={{ pathname: "/cart"}}>购物车</Link></Menu.Item>
        <Menu.Item key="order"><Link to={{ pathname: "/order"}}>我的订单</Link></Menu.Item>
        <Menu.Item key="report"><Link to={{ pathname: "/report"}}>报表统计</Link></Menu.Item>
        <Menu.Item key="comments"><Link to={{ pathname: "/comments"}}>留言板</Link></Menu.Item>
        <Menu.Item key="info"><Link to={{ pathname: "/info"}}>我的资料</Link></Menu.Item>
        <Menu.Item key="logout"><Button onClick={this.logout}>登出账户</Button></Menu.Item>
      </Menu>
    );
  }
}
export default withRouter(MySider);