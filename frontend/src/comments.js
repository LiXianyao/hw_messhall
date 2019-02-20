import {List,Input,Button} from 'antd';
import React from 'react';
import TemplatePage from './template'

const { TextArea } = Input;

const data = [
    '吹爆老食堂的红薯',
    '强烈推荐第二食堂的鱼',
    '前两天在麻辣烫窗口吃出菜虫 呕',
    '支持楼上维权',
    '第一食堂新菜出炉啦 欢迎大家来品尝',
];

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.userType = this.props.match.params.type
        this.userId = this.props.match.params.id
        this.siderValue = ["comments"]
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit()
    {

    }

    render() {
        return (
            <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
                <h1>留言板</h1>
                <List
                size="large"
                bordered
                dataSource={data}
                pagination={{ pageSize: 10 }}
                renderItem={item => {
                    if(this.userType == "admin"){
                        return (<List.Item actions={[<Button icon="delete" shape="circle"/>]}><p>{item}</p></List.Item>)
                    }else{
                        return (<List.Item><p>{item}</p></List.Item>)
                    }
                }}
                />
                <TextArea rows={4} style={{top:"20px"}}/>
                <Button type="primary" onClick={this.handleSubmit} style={{top:"30px",float:"right"}}>提交评论</Button>
            </TemplatePage>
        )
    }
}

export default Comments;