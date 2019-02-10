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
                initHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

                let formData = new URLSearchParams();
                formData.append('userName', values.userName);
                formData.append('userPass', values.userPass)
                formData.append('userPhone', values.userPhone)
                formData.append('userAge', values.userAge)
                formData.append('userGender', values.userGender)
                console.log(formData);
                let body = formData;

                const init = {
                    method: 'POST',
                    credentials: 'include', // cookies
                    headers: initHeaders,
                    body
                }

                fetch(
                    'https//localhost:5000',
                    init
                )
                    .then(res => res.json())
                    .then(data => {

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