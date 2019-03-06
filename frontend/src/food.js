import { Table,Input, Button, Icon, Divider,Modal } from 'antd';
import {withRouter} from 'react-router'
import Highlighter from 'react-highlight-words';
import React from 'react';
import TemplatePage from './template'
import FoodForm from './MyFoodForm';
import ReactDOM from 'react-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import cookie from 'react-cookies'
import "./index.css"

const confirm = Modal.confirm;

class Food extends React.Component {
    constructor(props) {
      super(props);
      // 设置 initial state
      this.userType = cookie.load("userType")
      this.userId = cookie.load("userId")
      this.siderValue = ["food"]
      this.state = {
          //operationButton:[],
          //addButton:[],
          visible:false,
          operation:"",
          foodId:"",
          foodName:"",
          foodPrice:"",
          userName:"",
          searchText:"",
          modal:false,
          delFood:"",
          data:[]
      };
      this.handleAdd = this.handleAdd.bind(this);
      this.handleModify = this.handleModify.bind(this);
      this.fs = this.fs.bind(this);
      this.addToCart = this.addToCart.bind(this);
      this.foodDel = this.foodDel.bind(this);
      this.hideModal = this.hideModal.bind(this);
      this.showModal = this.showModal.bind(this);
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={"关键词"}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              搜索
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              重置
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })
    
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
    }

    handleAdd(){
      this.setState(
        {
          visible:true,
          operation:"增加",
          foodId:"",
          foodName:"",
          foodPrice:"",
          userName:""
        }
      )
    }

    handleModify(record){
      this.setState(
        {
          visible:true,
          operation:"修改",
          foodId:record["foodId"],
          foodName:record["foodName"],
          foodPrice:record["foodPrice"],
          userName:record["userName"]
        }
      )
    }

    fs(v,flag){
      this.setState(
        {
          visible:v,
          foodId:"",
          foodName:"",
          foodPrice:""
        }
      )
      if(flag==1)
      {
        this.getAllFood();
      }
    }

    getAllFood()
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userType'] = this.userType;
        formData['userId'] = this.userId;
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
            'http://10.108.113.251:8080/foodQuery',
            init
        )
            .then(res => res.json())
            .then(data => {
                if(data["loginRequired"] == -1){
                    this.props.history.push("/login")
                }
                data.forEach((ele)=>{
                  ele.foodPrice = ele.foodPrice.toFixed(2);
                })
                this.setState(
                    {
                        data:data
                    }
                )
            })
            .catch(e => console.log('错误:', e))
    }

    addToCart(record){
      let initHeaders = new Headers();
      initHeaders.append('Accept', 'application/json, text/plain, */*');
      initHeaders.append('Cache-Control', 'no-cache');
      initHeaders.append('Content-Type', 'application/json');

      let formData = {};
      formData['foodId'] = record.foodId;
      formData['userId'] = this.userId;
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
          'http://10.108.113.251:8080/cartAdd',
          init
      )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            var rstate = data["succeed"];
            var mstr = data["message"];
            if (rstate) {
                alert("加入购物车成功")
                console.log("add to cart succeed!");
            }
            else {
                alert(mstr)
            }
          })
          .catch(e => console.log('错误:', e))
    }

    hideModal()
    {
      this.setState(
        {
          modal:false
        }
      )
    }

    showModal(fid)
    {
      this.setState(
        {
          delFood:fid,
          modal:true
        }
      )
    }

    foodDel()
    {
      let initHeaders = new Headers();
      initHeaders.append('Accept', 'application/json, text/plain, */*');
      initHeaders.append('Cache-Control', 'no-cache');
      initHeaders.append('Content-Type', 'application/json');

      let formData = {};
      formData['foodId'] = this.state.delFood;
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
          'http://10.108.113.251:8080/foodDelete',
          init
      )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            var rstate = data["succeed"];
            var mstr = data["message"];
            if (rstate) {
                alert("菜品删除成功")
                console.log("food delete succeed!");
                this.hideModal();
                this.getAllFood();
            }
            else {
              alert(mstr)
            }
          })
          .catch(e => console.log('错误:', e))
    }

    componentDidMount (){
      const tableCon = ReactDOM.findDOMNode(this.refs['table'])
      const table = tableCon.querySelector('table')
      table.setAttribute('id','table-to-xls')
    }

    componentWillMount()
    {
      if(this.userId == undefined){
        alert("请先登录")
        this.props.history.push("/login")
      }
      this.getAllFood();
    }
  
  
  
    render() {
        const columns = [
            {
                title: "餐品ID",
                dataIndex: "foodId",
            },
            {
                title: "餐品名称",
                dataIndex: "foodName",
                ...this.getColumnSearchProps('foodName')
            },
            {
                title: "所属商家",
                dataIndex: "belongName",
                ...this.getColumnSearchProps('belongName')
            },
            {
                title: "餐品单价",
                dataIndex: "foodPrice",
                ...this.getColumnSearchProps('foodPrice')
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text,record) => {
                  if(this.userType == "customer"){
                    return <span>
                    <Button onClick={this.addToCart.bind(this,record)}>加入购物车</Button>
                    </span>
                  }
                  else{
                    return <span>
                    <Button  onClick={this.handleModify.bind(this,record)}>修改</Button>
                    <Divider type="vertical" />
                    <Button onClick={this.showModal.bind(this,record.foodId)}>删除</Button>
                    </span>
                  }
                }
            }  
        ];
        var addButton = null;
        if(this.userType != "customer")
        {
          addButton =  <Button type="primary" style={{margin:'10px',float:'left'}} onClick={this.handleAdd}>
                         <Icon type="plus" /> 增加餐品
                       </Button>
        }
        var theDrawer = this.state.visible;
        
      return (
        <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
          <div style={{height:"40px"}}>
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="餐品表格"
            sheet="ordertablexls"
            ref="DownloadButton"
            buttonText="导出表格"/>
          </div>
          <Table pagination= {false} ref="table" rowKey='foodId' columns={columns} dataSource={this.state.data} bordered onChange={this.handleChange} />
          {theDrawer && <FoodForm visible={this.state.visible} operation={this.state.operation} userId={this.userId} userName={this.state.userName} foodId={this.state.foodId} foodName={this.state.foodName} foodPrice={this.state.foodPrice} fromSon={this.fs} userType={this.userType}>
          </FoodForm>}
          {addButton}
          <Modal
            title="提示"
            visible={this.state.modal}
            onOk={this.foodDel}
            onCancel={this.hideModal}
            okText="确认"
            okType="danger"
            cancelText="取消"
          >
          <p>确定删除此菜品吗？</p>
          </Modal>
        </TemplatePage>
      );
    }
  }

export default withRouter(Food);