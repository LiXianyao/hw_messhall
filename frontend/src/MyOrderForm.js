import {DatePicker, Form, Select, Input, Button, Drawer} from 'antd';
import React from 'react';
import moment from 'moment'

class MyOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            orderId:"",
            time:"",
            price:"",
            phone:"",
            state:""
        } 
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClose()
    {
        this.props.fromSon(false,0);
        this.setState(
            {
                visible:false
            }
        )
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
                
                formData['orderId'] = this.props.orderId;
                formData['price'] = values.price * 1.0;
                formData['phone'] = values.phone;
                formData['state'] = values.state;
                console.log(formData);
                let body = JSON.stringify(formData);
                console.log(body);

                const init = {
                    method: 'POST',
                    headers: initHeaders,
                    body
                }

                fetch(
                    'http://10.108.113.251:8080/orderModify',
                    init
                )
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        var rstate = data["succeed"];
                        var mstr = data["message"];
                        if (rstate) {
                            alert("订单修改成功")
                            console.log("order modify succeed!");
                            this.props.fromSon(false,1);
                            this.setState(
                                {
                                    visible:false
                                }
                            ) 
                        }
                        else {
                            alert(mstr)
                        }
                    })
                    .catch(e => console.log('错误:', e))
            }
        });
    }

    componentWillMount()
    {
    }

    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
          this.setState({ state:currency });
        }
        this.triggerChange({ currency });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
      }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        var time = moment(this.props.time,'YYYY-MM-DD HH:mm:ss')
        var price = this.props.price
        var phone = this.props.phone
        var state = this.props.state
        return (
            <Drawer
            title="Order Drawer"
            width={360}
            onClose={this.handleClose}
            visible={this.props.visible}
            style={{
              overflow: 'auto',
              height: 'calc(100% - 108px)',
              paddingBottom: '108px',
            }}
          >
            <Form layout="horizontal" onSubmit={this.handleSubmit}  className="food-form">
                <h1>{this.props.operation}订单</h1>
                <Form.Item label="订单总价" {...formItemLayout}>
                    {getFieldDecorator('price', {
                        rules: [
                            { required: true, pattern:/^([1-9]\d*|0)(\.\d{1,2})?$/, message: '请输入订单总价!'}
                        ],
                        initialValue: price
                        
                    })(
                        <Input style={{width:200}} className="price" placeholder="订单总价" />
                    )}
                </Form.Item>
                <Form.Item label="联系电话" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, pattern:/^1\d{10}$/, message: '请输入联系方式!'}
                        ],
                        initialValue: phone
                    })(
                        <Input style={{width:200}} className="phone" placeholder="联系方式" />
                    )}
                </Form.Item>
                <Form.Item label="订单状态" {...formItemLayout}>
                    {getFieldDecorator('state', {
                    rules: [{ required: true, message: '请选择订单状态!' }],
                    initialValue: state
                    })(
                        <Select
                            onChange={this.handleCurrencyChange}
                            style={{width:200}}
                        >
                            <Select.Option value="等待接单">等待接单</Select.Option>
                            <Select.Option value="商家已接单">商家已接单</Select.Option>
                            <Select.Option value="备餐完成">备餐完成</Select.Option>
                            <Select.Option value="订单完成">订单完成</Select.Option>
                            <Select.Option value="订单关闭">订单关闭</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item >
                  <Button className="order-form-no" onClick={this.handleClose}>取消</Button>
                  <Button type="primary" className="order-form-yes" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>
          </Drawer>
        );
    }
}

const OrderForm = Form.create()(MyOrderForm);
export default OrderForm;