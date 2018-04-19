import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500,blue500, red500, greenA200} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import DataTables from 'material-ui-datatables';
import FontIcon from 'material-ui/FontIcon';

import apiService from '../../lib/apiService/apiService';

import ModalFormUser from './ModalFormUser'
import Alert from '../Alert.js'

const styles = {
  
  container: {
    textAlign: 'center',

  },
  component: {
    margin: '60px 20px',
    paddingTop: '20px',
  },
  titleStyle: {
    fontSize: 16,
    color: deepOrange500,
  },
  footerToolbarStyle: {
    padding: '0 100px',
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


const tableStyle = [
  {
    key: 'id',
    label: 'ID',
  },{
    key: 'nickname',
    label: 'Nick Name',
    sortable: true,
  },{
    key: 'name',
    label: 'Name',
    sortable: true,
    style: {
      width: 250,
    }
  },{
    key: 'surname',
    label: 'Surname',
    alignRight: true,
  },{
    key: 'email',
    label: 'Email',
  },
  {
    key: 'action',
    label: 'Action',
  },  
];

var dataTable = [];

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function(chunkSize) {
      var array=this;
      return [].concat.apply([],
          array.map(function(elem,i) {
              return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
          })
      );
  }
});
Array.prototype.indexOfForArrays = function(search, flag)
{
  var objAux;
  if(flag){
    this[0].forEach((element, i) => {
      if(element !== search.data && i == search.page ){
        objAux = {
          data:element,
          page: ++i
        }
      }
       
    });
  }else{
    this[0].forEach((element, i) => {
      if(element !== search.data && i < search.page ){
        objAux = {
          data:element,
          page: ++i
        }
      }
       
    });
  }

  return objAux;
};


class UserList extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePersonClick = this.handlePersonClick.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUsers();

    this.state = {
      data: dataTable,
      page: 1,
      showModal:false,
      showAlert:false,
      totalUser:0,
      deleteId:null,
      user:null
    };   
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order);
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
    let searchData = []
    if(value !== '')  {
      dataTable[0].forEach((i,index)=>{
        i.map((e)=>{
          
          if (e.id.toString().indexOf(value) >= 0 || e.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 || e.nickname.toLowerCase().indexOf(value.toLowerCase()) >= 0){
            searchData.push(e)
          }
        })
      })
      this.setState({
        data: searchData,
        totalUser:searchData.length
      });
      //logica
    }else{
      this.handleUsers();
    }


  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    let data = dataTable.indexOfForArrays(this.state);
    if(data){
      this.setState({
        data: data.data,
        page: data.page,
      });
    }
    console.log('handlePreviousPageClick');
  }

  handleNextPageClick() {
    let data = dataTable.indexOfForArrays(this.state,1);
    if(data){
      this.setState({
        data: data.data,
        page: data.page,
      });
    }
    
  }

  addUser(data,e){   
    if(e!==true){
        data.action = [<IconButton
        iconClassName="material-icons"
        tooltipPosition="top-center"
        tooltip="Edit"
        key={data.id}
        onClick={() => this.handlePersonClick(data.id)}
      >
        mode_edit
      </IconButton>,<IconButton
        iconClassName="material-icons"
        tooltipPosition="top-center"
        tooltip="Delete"
        onClick={()=>this.handleAlert(data.id)}
      >
        delete
      </IconButton>]
      let pos = dataTable[0].length -1

      if (dataTable[0][pos].length < 10){
        dataTable[0][pos].push(data)
        this.setState({
          data: dataTable[0][pos],
          page: this.state.page,
          totalUser: this.state.totalUser + 1,
        });
      }else{
        dataTable[0].push([data])
        this.setState({
          data: dataTable[0][pos + 1],
          page: this.state.page + 1,
          totalUser: this.state.totalUser + 1,
        });
      }
    }else{
      dataTable[0].forEach((i,index)=>{
        i.forEach((e)=>{
          if (e.id == data){
            this.handleUsers(index);
          }
        })
      })
    }
  }

  handlePersonClick(id) {
    if(Number.isInteger(id)){
      apiService('GET','/user/id?id='+id)
        .then((res) => {
            if(res.data){
                this.setState({user:res.data[0],showModal:!this.state.showModal})
            }
        })
        .catch(function (reason) {
            console.error(reason);
        });
    }else{
      this.setState({user:null,showModal:!this.state.showModal})
    } 
  }



  handleDelete(flag){
    let id = this.state.deleteId;
    if(flag === true){
      apiService('DELETE','/user/id?id='+id)
      .then((res)=>{
        this.setState({deleteId:null,showAlert:!this.state.showAlert})
        if(res){
          dataTable[0].forEach((i,index)=>{
            i.forEach((e)=>{
              if (e.id === id){
                this.handleUsers(index);
              }
            })
          })
        }else{
          return 'error'
        }
      })
    }else{
      this.setState({deleteId:null,showAlert:!this.state.showAlert})
    }
  }
  handleAlert(id){
    this.setState({showAlert:!this.state.showAlert,deleteId:id})    
  }
  handleInfoClick() {
    console.log('handleInfoClick');
  }

  handleUsers(index){
    apiService('GET','/user/all')
      .then((succes) => {
        succes.data.map(i =>{
          
          i.action = [<IconButton
            iconClassName="material-icons"
            tooltipPosition="top-center"
            tooltip="Edit"
            key={i.id}
            onClick={() => this.handlePersonClick(i.id)}
          >
            mode_edit
          </IconButton>,<IconButton
            iconClassName="material-icons"
            tooltipPosition="top-center"
            tooltip="Delete"
            onClick={()=>this.handleAlert(i.id)}
          >
            delete
          </IconButton>]
        })
        this.setState({users:succes.data})
        
        if(index >= 0){
          dataTable = []
          dataTable.push(succes.data.chunk_inefficient(10))
          this.setState({
            data: dataTable[0][index],
            totalUser:succes.data.length
          });
        }else{
          dataTable.push(succes.data.chunk_inefficient(10))
          this.setState({
            data: dataTable[0][0],
            totalUser:succes.data.length
          });
        }

      })
      .catch(function (reason) {
      console.error(reason);
    });
  }

  render() {

    return (
      
        <div style={styles.container}>

          <div style={styles.component}>
            <h2>User information</h2>
            <Card style={{margin: 12}}>
            
              <DataTables
                title={'User Table'}
                titleStyle={styles.titleStyle}
                height={'auto'}
                selectable={true}
                showRowHover={true}
                enableSelectAll={true}
                columns={tableStyle}
                data={this.state.data}
                page={this.state.page}
                showHeaderToolbar={true}
                onFilterValueChange={this.handleFilterValueChange}
                footerToolbarStyle={styles.footerToolbarStyle}
                tableBodyStyle={styles.tableBodyStyle}
                tableStyle={styles.tableStyle}
                onNextPageClick={this.handleNextPageClick}
                onPreviousPageClick={this.handlePreviousPageClick}
                tableWrapperStyle={styles.tableWrapperStyle}
                count={this.state.totalUser}
                toolbarIconRight={[
                  <IconButton onClick={() =>this.handlePersonClick()} >
                    <PersonAdd />
                  </IconButton>,
                  <IconButton onClick={this.handleInfoClick} >
                    <InfoOutline />
                  </IconButton>
                ]}
              />
            </Card>
          </div>
          {this.state.showModal && <ModalFormUser user={this.state.user} showModal={this.handlePersonClick} userData={this.addUser}/>}
          {this.state.showAlert && <Alert showAlert={this.handleDelete} info={'Desea eliminar al usuario?'}/>}
        </div>
 
    );
  }
}

export default UserList;