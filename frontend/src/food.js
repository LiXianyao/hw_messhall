import { Table,Input, Button, Icon, Divider,Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import TemplatePage from './template'
import FoodForm from './MyFoodForm';
import ReactDOM from 'react-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import "./index.css"

const confirm = Modal.confirm;

class Food extends React.Component {
    constructor(props) {
      super(props);
      // 设置 initial state
      this.userType = this.props.match.params.type
      this.userId = this.props.match.params.id
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
          data:[
              {
                  foodId:"00001",
                  foodName:"麻辣香锅",
                  userName:"第一食堂",
                  foodPrice:15
              },
              {
                foodId:"00002",
                foodName:"水煮鱼",
                userName:"第一食堂",
                foodPrice:17
              },
              {
                foodId:"00003",
                foodName:"兰州拉面",
                userName:"第一食堂",
                foodPrice:12
              },
              {
                foodId:"00004",
                foodName:"海鲜面",
                userName:"第二食堂",
                foodPrice:15
              },
              {
                foodId:"00005",
                foodName:"米饭",
                userName:"第二食堂",
                foodPrice:2
              },
              {
                foodId:"00006",
                foodName:"馒头",
                userName:"第二食堂",
                foodPrice:1
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

    fs(v){
      this.setState(
        {
          visible:v,
          foodId:"",
          foodName:"",
          foodPrice:""
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
                dataIndex: "userName",
                ...this.getColumnSearchProps('userName')
            },
            {
                title: "餐品单价",
                dataIndex: "foodPrice",
                ...this.getColumnSearchProps('foodPrice')
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text,record) => {
                  if(this.userType == "customer"){
                    return <span>
                    <Button>加入购物车</Button>
                    </span>
                  }
                  else{
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
        if(this.userType != "customer")
        {
          addButton =  <Button type="primary" style={{margin:'10px',float:'left'}} onClick={this.handleAdd}>
                         <Icon type="plus" /> 增加餐品
                       </Button>
        }
        
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
            buttonText="Download as XLS"/>
          </div>
          <Table ref="table" rowKey='foodId' columns={columns} dataSource={this.state.data} bordered onChange={this.handleChange} />
          <FoodForm visible={this.state.visible} operation={this.state.operation} userId={this.userId} userName={this.state.userName} foodId={this.state.foodId} foodName={this.state.foodName} foodPrice={this.state.foodPrice} fromSon={this.fs} userType={this.userType}>
          </FoodForm>
          {addButton}
        </TemplatePage>
      );
    }
  }

export default Food;