import { Table,Input, Button, Icon, DatePicker } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import TemplatePage from './template'
import moment from 'moment'
import ReactDOM from 'react-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./index.css"

const { RangePicker } = DatePicker;

class Report extends React.Component {
    constructor(props) {
      super(props);
      // 设置 initial state
      this.userType = this.props.match.params.type
      this.userId = this.props.match.params.id
      this.siderValue = ["report"]
      this.state = {
          startDate:"",
          endDate:"",
          data:[]
      };
    }

    onChange = (date, dateString) => {
      console.log(dateString[0]);
      console.log(dateString[1]);
      this.setState({
        startDate:dateString[0],
        endDate:dateString[1]
      })
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

    getOrder = () =>
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
            body
        }

        fetch(
            'http://10.108.113.251:8080/orderStatistic',
            init
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.forEach((ele)=>{
                  var foodList = JSON.parse(ele.content);
                  var foodStr = "";
                  foodList.forEach((food)=>{
                    foodStr = foodStr + food.foodName + "*" + food.foodNum + " ";
                  })
                  ele.content = foodStr;
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

      return (
        <TemplatePage userType={this.userType} userId={this.userId} siderValue={this.siderValue}>
          <RangePicker onChange={this.onChange} />
          <Button type="primary" onClick={this.getOrder}>订单查询</Button>
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
        </TemplatePage>
      );
    }
  }

export default Report;

