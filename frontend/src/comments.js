import {List,Input,Button} from 'antd';
import {withRouter} from 'react-router'
import React from 'react';
import cookie from 'react-cookies'
import TemplatePage from './template'

const { TextArea } = Input;

const defaultData = [];

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.userType = cookie.load("userType")
        this.userId = cookie.load("userId")
        this.siderValue = ["comments"]
        this.state = {
            data:defaultData,
            textvalue:""
        }
    }

    handleSubmit = () =>
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData["content"] = this.state.textvalue
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            credentials:"include",
            body
        }

        fetch(
            'http://10.108.113.251:8080/commentAdd',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var rstate = data["succeed"];
                var mstr = data["message"];
                if (rstate) {
                    alert("留言发表成功")
                    console.log("comment add succeed!");
                    this.setState({textvalue:""})
                    this.getAllComments();
                }
                else {
                    alert(mstr)
                }
            })
            .catch(e => console.log('错误:', e))
    }

    handleDelete = (commentId) =>
    {
        this.setState({
            data:this.state.data.filter((item)=>{
                if(item.commentId !== commentId){
                    return true
                }else {
                    return false
                }
            })
        })
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData["commentId"] = commentId
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            credentials:"include",
            body
        }

        fetch(
            'http://10.108.113.251:8080/commentDelete',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var rstate = data["succeed"];
                var mstr = data["message"];
                if (rstate) {
                    alert("留言删除成功")
                    console.log("comment delete succeed!");
                    this.getAllComments();
                }
                else {
                    alert(mstr)
                }
            })
            .catch(e => console.log('错误:', e))
    }

    onChange = (e) =>{
        this.setState(
            {
                textvalue:e.target.value
            }
        )
    }

    getAllComments()
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            credentials:"include",
            body
        }

        fetch(
            'http://10.108.113.251:8080/commentQuery',
            init
        )
            .then(res => res.json())
            .then(data => {
                if(data["loginRequired"] == -1){
                    this.props.history.push("/login")
                }
                console.log(data);
                this.setState(
                    {
                        data:data
                    }
                )
            })
            .catch(e => console.log('错误:', e))
    }

    componentWillMount(){
        if(this.userId == undefined){
            alert("请先登录")
            this.props.history.push("/login")
        }
        this.getAllComments();
    }

    render() {
        return (
            <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
                <h1>留言板</h1>
                <List
                size="large"
                bordered
                dataSource={this.state.data}
                pagination={{ pageSize: 10 }}
                renderItem={ item => {
                    if(this.userType == "admin"){
                        return (<List.Item actions={[<Button icon="delete" shape="circle" onClick={()=>this.handleDelete(item.commentId)}/>]}><p>{item.content}</p></List.Item>)
                    }else{
                        return (<List.Item><p>{item.content}</p></List.Item>)
                    }
                }}
                />
                <TextArea rows={4} style={{top:"20px"}} onChange={this.onChange} value={this.state.textvalue}/>
                <Button type="primary" onClick={this.handleSubmit} style={{top:"30px",float:"right"}}>提交评论</Button>
            </TemplatePage>
        )
    }
}

export default withRouter(Comments);