import {Radio, Form, Icon, Input, Button} from 'antd';
import React from 'react';
import './register.css'

class NormalRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        // ES6 类中函数必须手动绑定
        this.handleSubmit = this.handleSubmit.bind(this);
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
                console.log(formData);
                let body = JSON.stringify(formData);
                console.log(body)

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
                        console.log(data)
                    })
                    .catch(e => console.log('错误:', e))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}  className="register-form">
                <h1>欢迎注册</h1>
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(
                        <Input className="username"  prefix={<Icon type="user" style={{ fontSize: 13 }} />}  placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userPass', {
                        rules: [{ required: true, message: 'Please input your password!' }]
                    })(
                        <Input className="userpass"  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userPhone', {
                        rules: [
                            { required: true, pattern:/^1\d{10}$/, message: 'Please input your correct phone!'}
                        ]
                    })(
                        <Input className="userphone"  prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="Telephone" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userAge', {
                        rules: [
                            { required: true, pattern:/^([1-9]|[1-9][0-9])$/, message: 'Please input your correct age!'}
                        ]
                    })(
                        <Input className="userage"  prefix={<Icon type="solution" style={{ fontSize: 13 }} />} placeholder="Age" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userGender', {
                        initialValue: "0"
                    })(
                        <Radio.Group>
                            <Radio.Button value="1">Male</Radio.Button>
                            <Radio.Button value="2">Female</Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">注册</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default WrappedNormalRegisterForm;