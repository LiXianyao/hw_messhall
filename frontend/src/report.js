import { Table,Input, Button, Icon, DatePicker, Modal, Card, Row, Col } from 'antd';
import {withRouter} from 'react-router'
import Highlighter from 'react-highlight-words';
import React from 'react';
import TemplatePage from './template'
import moment from 'moment'
import ReactDOM from 'react-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import cookie from 'react-cookies'
import "./index.css"

const { RangePicker } = DatePicker;

class Report extends React.Component {
    constructor(props) {
      super(props);
      // 设置 initial state
      this.userType = cookie.load("userType")
      this.userId = cookie.load("userId")
      this.siderValue = ["report"]
      this.state = {
          startDate:moment().utcOffset(8).format("YYYY-MM-DDTHH:mm:ss"),
          endDate:moment().utcOffset(8).format("YYYY-MM-DDTHH:mm:ss"),
          data:[],
          foodSale:[],
          sortFood:[],
          modal:false,
          sum:0
      };
    }

    onChange = (date, dateString) => {
      console.log(date)
      console.log(dateString)
      var start = moment(date[0]).utcOffset(8).startOf('day').format("YYYY-MM-DDTHH:mm:ss")
      var end = moment(date[1]).utcOffset(8).endOf('day').format("YYYY-MM-DDTHH:mm:ss")
      this.setState({
        startDate:start,
        endDate:end
      })
    }

    hideModal = () =>
    {
      this.setState(
        {
          modal:false
        }
      )
    }

    showModal = () =>
    {
      this.setState(
        {
          modal:true
        }
      )
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

    componentDidMount (){
      const tableCon = ReactDOM.findDOMNode(this.refs['table'])
      const table = tableCon.querySelector('table')
      table.setAttribute('id','table-to-xls')
    }

    getOrder = (flag) =>
    {
        let initHeaders = new Headers();
        initHeaders.append('Accept', 'application/json, text/plain, */*');
        initHeaders.append('Cache-Control', 'no-cache');
        initHeaders.append('Content-Type', 'application/json');

        let formData = {};
        formData['userId'] = this.userId;
        formData['userType'] = this.userType;
        formData['startDate'] = this.state.startDate;
        formData['endDate'] = this.state.endDate;
        formData['state'] = "订单完成";
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
            'http://10.108.113.251:8080/orderStatistic',
            init
        )
            .then(res => res.json())
            .then(data => {
                if(data["loginRequired"] == -1){
                  this.props.history.push("/login")
                }
                if(flag){
                  var foodSale=[];
                  var sum=0;
                  data.forEach((ele)=>{
                    var foodList = JSON.parse(ele.content);
                    var foodStr = "";
                    foodList.forEach((food)=>{
                      foodStr = foodStr + food.foodName + "*" + food.foodNum + " ";
                      if(foodSale[food.foodName] >= 1){
                        foodSale[food.foodName] = foodSale[food.foodName] + food.foodNum;
                      }else{
                        foodSale[food.foodName] = food.foodNum;
                      }
                    })
                    ele.content = foodStr;
                    ele.time = moment(ele.time).utcOffset(0).format("YYYY-MM-DD HH:mm:ss");
                    sum = sum + ele.price;
                    ele.price = ele.price.toFixed(2);
                  })
                  var sortFood = Object.keys(foodSale).sort(function(a,b){ return foodSale[b]-foodSale[a]; })
                  console.log(sortFood);
                  console.log(foodSale);
                  this.setState({
                    data:data,
                    sortFood:sortFood,
                    foodSale:foodSale,
                    sum:sum.toFixed(2)
                  })
                }

            })
            .catch(e => console.log('错误:', e))
    }

    componentWillMount()
    {
      if(this.userId == undefined){
        alert("请先登录")
        this.props.history.push("/login")
      }
      this.getOrder(0);
    } 
  
  
    render() {
        const columns = [
          {
            title: "订单ID",
            dataIndex: "orderId",
            ...this.getColumnSearchProps('orderId')
          },
          {
              title: "消费者",
              dataIndex: "customerName",
              ...this.getColumnSearchProps('customerName')
          },
          {
              title: "商家",
              dataIndex: "businessName",
              ...this.getColumnSearchProps('businessName')
          },
          {
              title: "下单时间",
              dataIndex: "time",
              ...this.getColumnSearchProps('time')
          },
          {
              title: "总价",
              dataIndex: "price",
              ...this.getColumnSearchProps('price')
          },
          {
              title: "联系电话",
              dataIndex: "phone",
              ...this.getColumnSearchProps('phone')
          },
          {
              title: "状态",
              dataIndex: "state",
              ...this.getColumnSearchProps('state')
          }
        ];

        var showList = [];
        for(var key in this.state.sortFood){
          var food = this.state.sortFood[key];
          var num = this.state.foodSale[food];
          showList.push(<dt key={key}>
                    <Card style={{ width: "100%"}}>
                        <Row type="flex" justify="space-between">
                            <Col span={16}>{food}</Col>
                            <Col span={8}>{num}</Col>
                        </Row>
                    </ Card>
                    </dt>)
        }

      return (
        <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
          <RangePicker onChange={this.onChange} />
          <Button type="primary" onClick={this.getOrder.bind(this,1)}>订单查询</Button>
          <div style={{height:"40px"}}>
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="订单表格"
            sheet="ordertablexls"
            ref="DownloadButton"
            buttonText="导出表格"/>
          </div>
          <Table pagination={false} ref="table" rowKey='orderId' columns={columns} dataSource={this.state.data} bordered onChange={this.handleChange} expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}/>
          <Modal
            title="餐品数量统计表"
            visible={this.state.modal}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
          >
          <dl>{showList}</dl>
          </Modal>
          <Button style={{margin:'10px',float:'left'}} onClick={this.showModal}><Icon type="plus"/>餐品数量统计表</Button>
          <div className="G_Price" style={{margin:'10px',float:'right'}}><h3>总金额：{this.state.sum} 元</h3></div>
        </TemplatePage>
      );
    }
  }

export default withRouter(Report);

