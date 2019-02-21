import {Radio, Form, Icon, Input, Button} from 'antd';
import {withRouter} from 'react-router'
import React from 'react';
import './index.css'

class NormalRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        // ES6 类中函数必须手动绑定
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userType = this.props.location.state.userType
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
                formData['userName'] = values.userName;
                formData['userPass'] = values.userPass;
                formData['userPhone'] = values.userPhone;
                formData['userAge'] = values.userAge;
                formData['userGender'] = values.userGender;
                formData['userType'] = this.userType;
                console.log(formData);
                let body = JSON.stringify(formData);
                console.log(body);

                const init = {
                    method: 'POST',
                    credentials: 'include', // cookies
                    headers: initHeaders,
                    body
                }

                fetch(
                    'http://localhost:8080/register',
                    init
                )
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        var rstate = data["succeed"];
                        var mstr = data["message"];
                        if (rstate) {
                            alert("注册成功")
                            console.log("register succeed!");
                            this.props.history.push("/login")
                        }
                        else {
                            alert(mstr)
                        }
                    })
                    .catch(e => console.log('错误:', e))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit}  className="register-form">
                <h1>{this.userType}注册</h1>
                <Form.Item label="用户名称" {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(
                        <Input className="username"  prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item label="用户密码" {...formItemLayout}>
                    {getFieldDecorator('userPass', {
                        rules: [{ required: true, message: 'Please input your password!' }]
                    })(
                        <Input className="userpass"  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item label="联系电话" {...formItemLayout}>
                    {getFieldDecorator('userPhone', {
                        rules: [
                            { required: true, pattern:/^1\d{10}$/, message: 'Please input your correct phone!'}
                        ]
                    })(
                        <Input className="userphone"  prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="Telephone" />
                    )}
                </Form.Item>
                <Form.Item label="用户年龄" {...formItemLayout}>
                    {getFieldDecorator('userAge', {
                        rules: [
                            { required: true, pattern:/^([1-9]|[1-9][0-9])$/, message: 'Please input your correct age!'}
                        ]
                    })(
                        <Input className="userage"  prefix={<Icon type="solution" style={{ fontSize: 13 }} />} placeholder="Age" />
                    )}
                </Form.Item>
                <Form.Item label="用户性别" {...formItemLayout}>
                    {getFieldDecorator('userGender', {
                        rules: [
                            { required: true, message: 'Please choose your gender!'}
                        ]
                    })(
                        <Radio.Group style={{width:"191px"}}>
                            <Radio.Button value="1">Male</Radio.Button>
                            <Radio.Button value="2">Female</Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item >
                    <Button htmlType="submit" type="primary" className="register-form-button" onClick={this.handleSubmit}>注册</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default withRouter(WrappedNormalRegisterForm);