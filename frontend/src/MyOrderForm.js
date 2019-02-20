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
            orderState:""
        } 
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClose()
    {
        this.props.fromSon(false);
        this.setState(
            {
                visible:false
            }
        )
    }

    handleSubmit()
    {

    }

    componentWillMount()
    {
    }

    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
          this.setState({ orderState:currency });
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
        var orderState = this.props.orderState
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
                <h1>{this.props.operation}订单{this.props.orderId}</h1>
                <Form.Item label="下单时间" {...formItemLayout}>
                {getFieldDecorator('date-time-picker', {
                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                    initialValue: time
                })(
                    <DatePicker style={{width:200}} showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
                </Form.Item>
                <Form.Item label="订单总价" {...formItemLayout}>
                    {getFieldDecorator('price', {
                        rules: [
                            { required: true, pattern:/^\d+$/, message: 'Please input integer!'}
                        ],
                        initialValue: price
                        
                    })(
                        <Input style={{width:200}} className="price" placeholder="price" />
                    )}
                </Form.Item>
                <Form.Item label="联系电话" {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, pattern:/^1\d{10}$/, message: 'Please input the correct phone!'}
                        ],
                        initialValue: phone
                    })(
                        <Input style={{width:200}} className="phone" placeholder="phone" />
                    )}
                </Form.Item>
                <Form.Item label="订单状态" {...formItemLayout}>
                    {getFieldDecorator('gender', {
                    rules: [{ required: true, message: 'Please select state!' }],
                    initialValue: orderState
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
                  <Button type="primary" className="order-form-yes" onClick={this.handleClose}>提交</Button>
                </Form.Item>
            </Form>
          </Drawer>
        );
    }
}

const OrderForm = Form.create()(MyOrderForm);
export default OrderForm;