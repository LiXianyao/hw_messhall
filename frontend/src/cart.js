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
          arr:[],
          sum_price:0
        }
    }

    getCart()
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userId'] = this.userId;
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(
            'http://10.108.113.251:8080/cartQuery',
            init
        )
            .then(res => res.json())
            .then(data => {
                data.forEach((ele)=>{
                    ele["checked"]=false;
                })
                console.log(data)
                this.setState(
                    {
                        arr:data
                    }
                )
            })
            .catch(e => console.log('错误:', e))
    }

    cartModify(fid,fnum)
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userId'] = this.userId;
        formData['foodId'] = fid;
        formData['foodNum'] = fnum;
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(
            'http://10.108.113.251:8080/cartModify',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var rstate = data["succeed"];
                var mstr = data["message"];
                if (rstate) {
                }
                else {
                    alert(mstr)
                }
            })
            .catch(e => console.log('错误:', e))

    }

    cartDel(fid)
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userId'] = this.userId;
        formData['foodId'] = fid;
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(
            'http://10.108.113.251:8080/cartDel',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var rstate = data["succeed"];
                var mstr = data["message"];
                if (rstate) {
                }
                else {
                    alert(mstr)
                }
            })
            .catch(e => console.log('错误:', e))

    }

    //获取数据
    componentWillMount(){
        this.getCart();
    }
    //获取输入框的值
    getInputText=(e,i)=>{
        var fid,fnum
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.foodNum=e.target.value  
                    fid=ele.foodId
                    fnum=ele.foodNum                 
                    return ele
                }else {
                    return ele
                }
            })
        },()=>{
            this.cartModify(fid,fnum);
        })
        this.SumPrice()
    }
    //加
    augment=(e,i)=>{
        var fid,fnum
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index===i){
                    ele.foodNum=ele.foodNum*1+1
                    fid=ele.foodId
                    fnum=ele.foodNum 
                    return ele
                }else {
                    return ele
                }
            })
        },()=>{
            this.cartModify(fid,fnum);
        })
        this.SumPrice()
     }
    //减
    reduce=(e,i)=> {
        var fid,fnum,flag=0
        this.setState({
            arr:this.state.arr.map((ele,index)=>{
                if(index==i){
                    if(ele.foodNum != 1){
                        ele.foodNum=ele.foodNum*1-1
                        fid=ele.foodId
                        fnum=ele.foodNum
                        flag=1 
                    }                  
                    return ele
                }else {
                    return ele
                }
            })
        },()=>{
            if(flag == 1){
                this.cartModify(fid,fnum);
            }
        })
        this.SumPrice()
    }
 
    //删除
    del=(e,i)=> {
        var fid
        this.setState({
            arr:this.state.arr.filter((ele,index)=>{
                if(index!==i){
                    return true
                }else {
                    fid = ele.foodId
                    return false
                }
            })
        },this.cartDel(fid)
        )
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
        this.state.arr.forEach((ele,index)=>{
            if(ele.checked===true){
                shopping.push(ele)
            }
        })
        console.log(shopping)

        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let body = JSON.stringify(shopping);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(
            'http://10.108.113.251:8080/orderAdd',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                var rstate = data["succeed"];
                var mstr = data["message"];
                if (rstate) {
                    alert(mstr)
                    console.log("order add succeed!")
                    this.getCart();
                }
                else {
                    alert(mstr)
                }
            })
            .catch(e => console.log('错误:', e))
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
            <dt key={-1}>{theHeader}</dt>
            {this.state.arr.map((ele,index) => {
                return(
                    <dt key={index}>
                    <Card style={{ width: "100%"}}>
                        <Row type="flex" justify="space-between">
                            <Col span={2}><input type="checkbox" checked={ele.checked} onChange={(e)=>{this.CheckAllorNoAll(e,index)}}/></Col>
                            <Col span={4}>{ele.foodName}</Col>
                            <Col span={4}>{ele.belongName}</Col>
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