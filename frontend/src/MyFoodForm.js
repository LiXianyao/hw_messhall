import {Radio, Form, Icon, Input, Button, Drawer} from 'antd';
import {withRouter} from 'react-router'
import React from 'react';

class MyFoodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
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

                var url;
                let formData = {};
                if(this.props.operation == "增加")
                {
                    url = 'http://10.108.113.251:8080/foodAdd';
                    if(this.props.userType == "admin"){
                        formData['belongId'] = values.belongId;
                    }else{
                        formData['belongId'] = this.props.userId;
                    }
                    
                }else{
                    url = 'http://10.108.113.251:8080/foodModify'; 
                    formData['foodId'] = this.props.foodId;
                }
                
                formData['foodName'] = values.foodName;
                formData['foodPrice'] = values.foodPrice;
                console.log(formData);
                let body = JSON.stringify(formData);
                console.log(body);

                const init = {
                    method: 'POST',
                    headers: initHeaders,
                    body
                }

                fetch(
                    url,
                    init
                )
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        var rstate = data["succeed"];
                        var mstr = data["message"];
                        if (rstate) {
                            alert("操作成功")
                            console.log("modify or add succeed!");
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
        console.log("mount")
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
        )
        */
    }


    render() {
        const { getFieldDecorator,setFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        var foodName = this.props.foodName
        var foodPrice = this.props.foodPrice
        var userName =  this.props.userName
        var userIdInput
        console.log("render!!!!")
        console.log(foodName)
        if(this.props.userType == "admin" && this.props.operation == "增加")
        {
            userIdInput = (<Form.Item label="所属商家" {...formItemLayout}>
            {getFieldDecorator('belongId', {
                rules: [
                    { required: true, message: 'Please input the userId!'}
                ]
            })(
                <Input className="belongId"   placeholder="belongId" />
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
                    })
                    (
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
                <Button type="primary" className="food-form-yes" htmlType='submit'>提交</Button>
            </Form>
          </Drawer>
        );
    }
}

const FoodForm = Form.create()(MyFoodForm);
export default FoodForm;