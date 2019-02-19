import {Radio, Form, Icon, Input, Button, Drawer} from 'antd';
import {withRouter} from 'react-router'
import React from 'react';

class MyFoodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            userId:"",
            foodId:"",
            foodName:"",
            foodPrice:""
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
        /*
        this.setState(
            {
                visible:this.props.visible,
                userId:this.props.userId,
                foodId:this.props.foodId,
                foodName:this.props.foodName,
                foodPrice:this.props.foodPrice,
            },()=>{
                console.log("!!!")
            }
        )*/
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        var foodName = this.props.foodName
        var foodPrice = this.props.foodPrice
        var userName =  this.props.userName
        var userIdInput
        if(this.props.userType == "admin")
        {
            userIdInput = (<Form.Item label="所属商家" {...formItemLayout}>
            {getFieldDecorator('userName', {
                rules: [
                    { required: true, pattern:/^\d+$/, message: 'Please input the userId!'}
                ],
                initialValue: userName
            })(
                <Input className="userName"   placeholder="userName" />
            )}
             </Form.Item>);
        }
        return (
            <Drawer
            title="Food Drawer"
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
                <h1>{this.props.operation}餐品</h1>
                <Form.Item label="餐品名称" {...formItemLayout}>
                    {getFieldDecorator('foodName', {
                        rules: [{ required: true, message: 'Please input your foodName!' }],
                        initialValue: foodName
                    })(
                        <Input className="foodName"   placeholder="foodName" />
                    )}
                </Form.Item>
                <Form.Item label="餐品单价" {...formItemLayout}>
                    {getFieldDecorator('foodPrice', {
                        rules: [
                            { required: true, pattern:/^\d+$/, message: 'Please input integer!'}
                        ],
                        initialValue: foodPrice
                    })(
                        <Input className="foodPrice"   placeholder="foodPrice" />
                    )}
                </Form.Item>
                {userIdInput}
                <Button className="food-form-no" onClick={this.handleClose}>取消</Button>
                <Button type="primary" className="food-form-yes" onClick={this.handleClose}>提交</Button>
            </Form>
          </Drawer>
        );
    }
}

const FoodForm = Form.create()(MyFoodForm);
export default FoodForm;