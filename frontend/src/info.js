import {Radio, Form, Icon, Input, Button} from 'antd';
import {withRouter} from 'react-router'
import React from 'react';
import TemplatePage from './template'
import './index.css'

class MyInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.userType = this.props.match.params.type
        this.userId = this.props.match.params.id
        this.siderValue = ["info"]
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userName:"",
            userAge:"",
            userPhone:"",
            userGender:"",
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let initHeaders = new Headers();
                initHeaders.append('Accept', 'application/json, text/plain, */*');
                initHeaders.append('Cache-Control', 'no-cache');
                initHeaders.append('Content-Type', 'application/json');

                let formData = {};
                formData['userId'] = this.userId;
                formData['userName'] = values.userName;
                formData['userPhone'] = values.userPhone;
                formData['userAge'] = values.userAge;
                formData['userGender'] = values.userGender;
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
                    'http://10.108.113.251:8080/infoModify',
                    init
                )
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        var rstate = data["succeed"];
                        var mstr = data["message"];
                        if (rstate) {
                            alert("资料修改成功")
                            console.log("info modify succeed!");
                            this.getInfo();
                        }
                        else {
                            alert(mstr)
                        }
                    })
                    .catch(e => console.log('错误:', e))
            }
        });
    }

    getInfo()
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData["userId"] = this.userId
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
            'http://10.108.113.251:8080/infoQuery',
            init
        )
            .then(res => res.json())
            .then(data => {
                if(data["loginRequired"] == -1){
                    alert("请先登录")
                    this.props.history.push("/login")
                }
                console.log(data);
                this.setState(
                    {
                        userName:data["userName"],
                        userAge:data["userAge"],
                        userPhone:data["userPhone"],
                        userGender:data["userGender"],
                    }
                )
            })
            .catch(e => console.log('错误:', e))
    }

    componentWillMount()
    {
        this.getInfo();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        var defaultUserName = this.state.userName;
        var defaultUserPhone = this.state.userPhone;
        var defaultUserAge = this.state.userAge;
        var defaultUserGender = this.state.userGender;
        var theUserType = "消费者";
        if(this.userType=="admin")
        {
            theUserType = "管理员";
        }else if(this.userType=="business"){
            theUserType = "商家";
        }
        return (
          <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}  className="info-form">
                <h1>我的资料</h1>
                <Form.Item label="用户类型" {...formItemLayout}>
                    <h4>{theUserType}</h4>
                </Form.Item>
                <Form.Item label="用户名称" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                        initialValue: defaultUserName
                    })(
                        <Input className="username"  prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item label="联系电话" {...formItemLayout}>
                    {getFieldDecorator('userPhone', {
                        rules: [
                            { required: true, pattern:/^1\d{10}$/, message: '请输入正确的手机号!'}
                        ],
                        initialValue: defaultUserPhone
                    })(
                        <Input className="userphone"  prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="手机号" />
                    )}
                </Form.Item>
                <Form.Item label="用户年龄" {...formItemLayout}>
                    {getFieldDecorator('userAge', {
                        rules: [
                            { required: true, pattern:/^([1-9]|[1-9][0-9])$/, message: '请选择你的年龄!'}
                        ],
                        initialValue: defaultUserAge
                    })(
                        <Input className="userage"  prefix={<Icon type="solution" style={{ fontSize: 13 }} />} placeholder="年龄" />
                    )}
                </Form.Item>
                <Form.Item label="用户性别" {...formItemLayout}> 
                    {getFieldDecorator('userGender', {
                        rules: [
                            { required: true, message: '请选择你的性别!'}
                        ],
                        initialValue: defaultUserGender
                    })(
                        <Radio.Group>
                            <Radio.Button value={1}>男</Radio.Button>
                            <Radio.Button value={2}>女</Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="info-modify-button" htmlType="submit">提交修改</Button>
                </Form.Item>
            </Form>
          </TemplatePage>
        );
    }
}

const InfoForm = Form.create()(MyInfoForm);
export default withRouter(InfoForm);