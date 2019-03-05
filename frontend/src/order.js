import { Table,Input, Button, Icon, Divider,Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import TemplatePage from './template'
import OrderForm from './MyOrderForm';
import moment from 'moment'
import ReactDOM from 'react-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import "./index.css"

const confirm = Modal.confirm;

class Order extends React.Component {
    constructor(props) {
      super(props);
      // 设置 initial state
      this.userType = this.props.match.params.type
      this.userId = this.props.match.params.id
      this.siderValue = ["order"]
      this.state = {
          //operationButton:[],
          //addButton:[],
          visible:false,
          operation:"",
          orderId:"",
          time:"",
          price:"",
          phone:"",
          state:"",
          modal:false,
          delOrder:"",
          data:[
              {
                orderId:"00001",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"等待接单",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00002",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"商家已接单",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00003",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"备餐完成",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00004",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"订单完成",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00005",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"订单关闭",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00006",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"等待接单",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00007",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"商家已接单",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00008",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"备餐完成",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"00009",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"订单完成",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"000010",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"订单关闭",
                content:"米饭*1 麻辣香锅*1"
              },
              {
                orderId:"000011",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                state:"订单关闭",
                content:"米饭*1 麻辣香锅*1"
              }
          ]
      };
      this.handleAdd = this.handleAdd.bind(this);
      this.handleModify = this.handleModify.bind(this);
      this.fs = this.fs.bind(this);
      this.orderDel = this.orderDel.bind(this);
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
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
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
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
          orderId:"",
          time:moment().format("YYYY-MM-DD HH:mm:ss"),
          price:"",
          phone:"",
          state:""
        }
      )
    }

    handleModify(record){
      this.setState(
        {
          visible:true,
          operation:"修改",
          orderId:record["orderId"],
          time:record["time"],
          price:record["price"],
          phone:record["phone"],
          state:record["state"]
        }
      )
    }

    fs(v,flag){
      this.setState(
        {
          visible:v,
          time:"",
          price:"",
          phone:"",
          state:""
        }
      )
      if(flag == 1)
      {
        this.getOrder();
      }
    }

    componentDidMount (){
      const tableCon = ReactDOM.findDOMNode(this.refs['table'])
      const table = tableCon.querySelector('table')
      table.setAttribute('id','table-to-xls')
    }

    getOrder()
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userId'] = this.userId;
        formData['userType'] = this.userType;
        console.log(formData);
        let body = JSON.stringify(formData);
        console.log(body);

        const init = {
            method: 'POST',
            headers: initHeaders,
            body
        }

        fetch(
            'http://10.108.113.251:8080/orderQuery',
            init
        )
            .then(res => res.json())
            .then(data => {
                data.forEach((ele)=>{
                  var foodList = JSON.parse(ele.content);
                  var foodStr = "";
                  foodList.forEach((food)=>{
                    foodStr = foodStr + food.foodName + "*" + food.foodNum + " ";
                  })
                  ele.content = foodStr;
                  console.log(ele.time);
                  ele.time = moment(ele.time).utcOffset(0).format("YYYY-MM-DD HH:mm:ss");
                })
                this.setState({
                  data:data
                })
            })
            .catch(e => console.log('错误:', e))
    }

    componentWillMount()
    {
      this.getOrder();
    }

    hideModal()
    {
      this.setState(
        {
          modal:false
        }
      )
    }

    showModal(oid)
    {
      this.setState(
        {
          delOrder:oid,
          modal:true
        }
      )
    }

    orderDel()
    {
      let initHeaders = new Headers();
      initHeaders.append('Accept', 'application/json, text/plain, */*');
      initHeaders.append('Cache-Control', 'no-cache');
      initHeaders.append('Content-Type', 'application/json');

      let formData = {};
      formData['orderId'] = this.state.delOrder;
      console.log(formData);
      let body = JSON.stringify(formData);
      console.log(body);

      const init = {
          method: 'POST',
          headers: initHeaders,
          body
      }

      fetch(
          'http://10.108.113.251:8080/orderDel',
          init
      )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            var rstate = data["succeed"];
            var mstr = data["message"];
            if (rstate) {
                alert("订单删除成功")
                console.log("order delete succeed!");
                this.hideModal();
                this.getOrder();
            }
            else {
                alert(mstr)
            }
          })
          .catch(e => console.log('错误:', e))
    }

    stateChange(oid,price,phone,state){
      let initHeaders = new Headers();
      initHeaders.append('Accept', 'application/json, text/plain, */*');
      initHeaders.append('Cache-Control', 'no-cache');
      initHeaders.append('Content-Type', 'application/json');

      let formData = {};
      
      formData['orderId'] = oid;
      formData['price'] = price;
      formData['phone'] = phone;
      formData['state'] = state;
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
                  alert("订单状态已变更")
                  console.log("state change succeed!");
                  this.getOrder();
              }
              else {
                  alert(mstr)
              }
          })
          .catch(e => console.log('错误:', e))
    }
  
  
  
    render() {
        const columns = [
            {
                title: "消费者名称",
                dataIndex: "customerName",
                ...this.getColumnSearchProps('customerName')
            },
            {
                title: "商家名称",
                dataIndex: "businessName",
                ...this.getColumnSearchProps('businessName')
            },
            {
                title: "下单时间",
                dataIndex: "time",
                ...this.getColumnSearchProps('time')
            },
            {
                title: "订单总价",
                dataIndex: "price",
                ...this.getColumnSearchProps('price')
            },
            {
                title: "联系电话",
                dataIndex: "phone",
                ...this.getColumnSearchProps('phone')
            },
            {
                title: "订单状态",
                dataIndex: "state",
                ...this.getColumnSearchProps('state')
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text,record) => {
                  if(this.userType == "business" && record['state'] == "等待接单"){
                    return <span>
                    <Button type="primary" onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"商家已接单")}>接单</Button>
                    <Divider type="vertical" />
                    <Button onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"订单关闭")}>退单</Button>
                    </span>
                  }else if(this.userType == "customer" && record['state'] == "等待接单"){
                    return <span>
                    <Button onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"订单关闭")}>取消订单</Button>
                    </span>
                  }
                  else if(this.userType == "business" && record['state'] == "商家已接单"){
                    return <span>
                    <Button onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"备餐完成")}>备餐完成</Button>
                    </span>
                  }else if(this.userType == "customer" && record['state'] =="备餐完成"){
                    return <span>
                    <Button type="primary" onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"订单完成")}>取餐确认</Button>
                    </span>
                  }else if(this.userType == "customer" && record['state'] =="商家已接单"){
                    return <span>
                    <Button onClick={this.stateChange.bind(this,record.orderId,record.price,record.phone,"订单完成")}>取餐确认</Button>
                    </span>
                  }else if(this.userType == "admin"){
                    return <span>
                    <Button  onClick={this.handleModify.bind(this,record)}>修改</Button>
                    <Divider type="vertical" />
                    <Button onClick={this.showModal.bind(this,record.orderId)}>删除</Button>
                    </span>
                  }
                }
            }  
        ];
        var addButton = null;
        if(this.userType == "admin")
        {
          addButton =  <Button type="primary" style={{margin:'10px',float:'left'}} onClick={this.handleAdd}>
                         <Icon type="plus" /> 增加订单
                       </Button>
        }
        
      return (
        <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
          <div style={{height:"40px"}}>
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="订单表格"
            sheet="ordertablexls"
            ref="DownloadButton"
            buttonText="Download as XLS"/>
          </div>
          <Table ref="table" rowKey='orderId' columns={columns} dataSource={this.state.data} bordered onChange={this.handleChange} expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}/>
          <OrderForm visible={this.state.visible} operation={this.state.operation} orderId={this.state.orderId} time={this.state.time} price={this.state.price} phone={this.state.phone} state={this.state.state} fromSon={this.fs}>
          </OrderForm>
          <Modal
            title="Do you want to delete this food?"
            visible={this.state.modal}
            onOk={this.orderDel}
            onCancel={this.hideModal}
            okText="确认"
            okType="danger"
            cancelText="取消"
          >
          <p>确定删除此订单吗？</p>
          </Modal>
        </TemplatePage>
      );
    }
  }

export default Order;

