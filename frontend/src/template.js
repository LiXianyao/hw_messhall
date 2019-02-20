import { Layout, Card } from 'antd';
import React from 'react';
import MySider from './sider'

const { Content, Sider } = Layout;

class TemplatePage extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh', minWidth:'100vh'}}>
        <Sider>
          <MySider siderValue={this.props.siderValue} userType={this.props.userType} userId={this.props.userId}></MySider>
        </Sider>
        <Content>
          <Card style={{ margin: '10px', padding:'10px', minHeight:'100vh'}}>
              {this.props.children}
          </Card>
        </Content>
      </Layout>
    );
  }
}
export default TemplatePage;

