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
          orderState:"",
          data:[
              {
                orderId:"00001",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"等待接单"
              },
              {
                orderId:"00002",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"商家已接单"
              },
              {
                orderId:"00003",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"备餐完成"
              },
              {
                orderId:"00004",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"订单完成"
              },
              {
                orderId:"00005",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"订单关闭"
              },
              {
                orderId:"00006",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"等待接单"
              },
              {
                orderId:"00007",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"商家已接单"
              },
              {
                orderId:"00008",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"备餐完成"
              },
              {
                orderId:"00009",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"订单完成"
              },
              {
                orderId:"000010",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"订单关闭"
              },
              {
                orderId:"000011",
                customerName:"w",
                businessName:"第一食堂",
                time:"2019-02-18 18:40:33",
                price:"22",
                phone:"13333333333",
                orderState:"订单关闭"
              }
          ]
      };
      this.handleAdd = this.handleAdd.bind(this);
      this.handleModify = this.handleModify.bind(this);
      this.fs = this.fs.bind(this);
      this.showConfirm = this.showConfirm.bind(this)
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
          orderState:""
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
          orderState:record["orderState"]
        }
      )
    }

    fs(v){
      this.setState(
        {
          visible:v,
          time:"",
          price:"",
          phone:"",
          orderState:""
        }
      )
    }

    showConfirm() {
      confirm({
        title: 'Do you want to delete these items?',
        content: '确定要删除吗？',
        onOk() {
          
        },
        onCancel() {},
      });
    }

    componentDidMount (){
      const tableCon = ReactDOM.findDOMNode(this.refs['table'])
      const table = tableCon.querySelector('table')
      table.setAttribute('id','table-to-xls')
    }
  
  
  
    render() {
        const columns = [
            {
                title: "订单ID",
                dataIndex: "orderId",
            },
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
                dataIndex: "orderState",
                ...this.getColumnSearchProps('orderState')
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text,record) => {
                  if(this.userType == "business" && record['orderState'] == "等待接单"){
                    return <span>
                    <Button type="primary">接单</Button>
                    <Divider type="vertical" />
                    <Button>退单</Button>
                    </span>
                  }else if(this.userType == "customer" && record['orderState'] == "等待接单"){
                    return <span>
                    <Button>取消订单</Button>
                    </span>
                  }
                  else if(this.userType == "business" && record['orderState'] == "商家已接单"){
                    return <span>
                    <Button>备餐完成</Button>
                    </span>
                  }else if(this.userType == "customer" && record['orderState'] =="备餐完成"){
                    return <span>
                    <Button type="primary">取餐确认</Button>
                    </span>
                  }else if(this.userType == "customer" && record['orderState'] =="商家已接单"){
                    return <span>
                    <Button >取餐确认</Button>
                    </span>
                  }else if(this.userType == "admin"){
                    return <span>
                    <Button  onClick={this.handleModify.bind(this,record)}>修改</Button>
                    <Divider type="vertical" />
                    <Button onClick={this.showConfirm}>删除</Button>
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
          <Table ref="table" rowKey='orderId' columns={columns} dataSource={this.state.data} bordered onChange={this.handleChange} expandedRowRender={record => <p style={{ margin: 0 }}>{record.orderId}</p>}/>
          <OrderForm visible={this.state.visible} operation={this.state.operation} orderId={this.state.orderId} time={this.state.time} price={this.state.price} phone={this.state.phone} orderState={this.state.orderState} fromSon={this.fs}>
          </OrderForm>
          {addButton}
        </TemplatePage>
      );
    }
  }

export default Order;

