import {List,Input,Button, Row, Col, Checkbox, Card} from 'antd';
import React from 'react';
import TemplatePage from './template';


class MyCart extends React.Component {
    constructor(props) {
        super(props);
        this.userType = this.props.match.params.type
        this.userId = this.props.match.params.id
        this.siderValue = ["cart"]
        this.state={
          arr:[
            {
                "checked":false,
                "foodId": "00001",
                "foodName": "麻辣香锅",
                "userName" : "第一食堂",
                "userId" : "10001",
                "foodPrice": 20,
                "foodNum": 1,
            },
            {
                "checked":false,
                "foodId": "00002",
                "foodName": "麻辣拌",
                "userName" : "第二食堂",
                "userId" : "10002",
                "foodPrice": 15 ,
                "foodNum": 1,
            },
            {
                "checked":false,
                "foodId": "00003",
                "foodName": "米饭",
                "userName" : "第一食堂",
                "userId" : "10001",
                "foodPrice": 2 ,
                "foodNum": 1,
            }
          ],
          sum_price:0
        }
    }

    //获取数据
    componentWillMount(){
        /*
        var url="./js/shopping.json"
        fetch(url).then((res)=>{
            return res.json()
        }).then((res)=>{
            this.setState({
                arr:res
            })
        })*/
    }
    //获取输入框的值
    getInputText=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.foodNum=e.target.value
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }
    //加
    augment=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.foodNum=ele.foodNum*1+1
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
     }
    //减
    reduce=(e,i)=> {
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    if(ele.foodNum != 1){
                        ele.foodNum=ele.foodNum*1-1
                    }                  
                    return ele
                }else {
                    return ele
                }
            })
        })
        this.SumPrice()
    }
 
    //删除
    del=(e,i)=> {
        this.setState({
            arr:this.state.arr.filter((ele,index)=>{
                if(index!==i){
                    return true
                }else {
                    return false
                }
            })
        })
        setTimeout(()=>{
            this.SumPrice()
        },1)
    }
 
    // 实现全选与反选的操作
    CheckAllorNoAll=(e,i)=>{
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.checked=!ele.checked
                }
                return ele
            })
        })
        var flag=this.state.arr.every((ele,index)=>{
            if(ele.checked===false){
                return false
            }else {
                return true
            }
        })
        console.log(flag)
        if(flag===true){
            this.refs.checkALL.checked=true
        }else {
            this.refs.checkALL.checked=false
        }
        this.SumPrice()
    }
    //全选全不选,判断全选状态
    CheckedAll=(e)=>{
        if(e.target.checked==true){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=true
                    return ele
                })
            })
        }else  if(e.target.checked==false){
            this.setState({
                arr:this.state.arr.map((ele,index)=>{
                    ele.checked=false
                    return ele
                })
            })
        }
        this.SumPrice()
 
    }
    //计算总合计
    SumPrice=()=>{
        var sum=0
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
             sum+=ele.foodNum*ele.foodPrice
            }
        })
        this.setState({
            sum_price:sum
        })
    }
    //结算传值
    SettleAccounts=()=>{
        var shopping=[]
        var bought = []
        this.state.arr.sort("userId")
        var last = this.state.arr[0].userId
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        })
        console.log(shopping)
        //window.localStorage.setItem("shopping",JSON.stringify(shopping))
        //window.localStorage.setItem("sumprice",JSON.stringify(this.state.sum_price))
        //this.props.history.push('/tab4')
    }

    render() {
        var theHeader = (
            <Card style={{ width: "100%"}}>
            <Row type="flex" justify="space-between">
            <Col span={2}><input type="checkbox" ref="checkALL" onChange={(e)=>{this.CheckedAll(e)}}/>全选</Col>
            </Row>
            </ Card>
        )
            
        return( 
            <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
            <dl>  
            <dt>{theHeader}</dt>
            {this.state.arr.map((ele,index) => {
                return(
                    <dt>
                    <Card style={{ width: "100%"}}>
                        <Row type="flex" justify="space-between">
                            <Col span={2}><input type="checkbox" checked={ele.checked} onChange={(e)=>{this.CheckAllorNoAll(e,index)}}/></Col>
                            <Col span={4}>{ele.foodName}</Col>
                            <Col span={4}>{ele.userName}</Col>
                            <Col span={3}>单价:{ele.foodPrice}</Col>
                            <Col span={6}><Button icon="minus" onClick={(e)=>{this.reduce(e,index)}}/><Input type="text" onChange={(e)=>this.getInputText(e,index)} value={ele.foodNum} style={{ width: "50px"}}/><Button icon="plus" onClick={(e)=>{this.augment(e,index)}}/></Col>
                            <Col span={3}>小计:{ele.foodNum * ele.foodPrice}</Col>
                            <Col span={2}><Button icon="delete" shape="circle" onClick={(e)=>{this.del(e,index)}}/></Col>
                        </Row>
                    </ Card>
                    </dt>
                )
                })
            }
            </dl> 
            <div className="G_Price"><h3>合计：{this.state.sum_price} 元</h3></div>
            <div className="G_Button" style={{top:'10px'}}><Button type="primary" onClick={()=>{this.SettleAccounts()}}>结算</Button></div>
            </TemplatePage>
        )   
    }
}
export default MyCart;