import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react';

class MySider extends React.Component {
  constructor(props) {
    super(props);
    // ES6 类中函数必须手动绑定
    this.handleClick = this.handleClick.bind(this);
    this.pathfood = "/food/" + this.props.userType + "/" + this.props.userId
    this.pathcart = "/cart/" + this.props.userType + "/" + this.props.userId
    this.pathorder = "/order/" + this.props.userType + "/" + this.props.userId
    this.pathcomment = "/comments/" + this.props.userType + "/" + this.props.userId
    this.pathinfo = "/info/" + this.props.userType + "/" + this.props.userId
  }

  componentWillMount() {
    /*f(this.props.userType == null){
      alert("请先登录")
      this.props.history.push("/login")
    }
    else if(this.props.userType == "admin"){
      this.setState(
        {
          isadmin: true
        }
      )

    }*/
  }

  handleClick(event) {
    console.log(event)
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ height:'100%' }}
        defaultSelectedKeys={this.props.siderValue}
        mode="inline"
      >
        <Menu.Item key="food"><Link to={this.pathfood}>餐品列表</Link></Menu.Item>
        <Menu.Item key="cart"><Link to={this.pathcart}>购物车</Link></Menu.Item>
        <Menu.Item key="order"><Link to={this.pathorder}>我的订单</Link></Menu.Item>
        <Menu.Item key="comments"><Link to={this.pathcomment}>留言板</Link></Menu.Item>
        <Menu.Item key="info"><Link to={this.pathinfo}>我的资料</Link></Menu.Item>
      </Menu>
    );
  }
}
export default MySider;