import React, {Component} from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import classnames from 'classnames'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import SideBar from './Components/SideBar';

import UsersList from './Components/Users/UsersList'
import Login from './Components/Login/Login'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    }

    this.handleToggle = this
      .handleToggle
      .bind(this)
  }

  handleToggle(data) {
    this.setState({
      open: !data
    })
  }

  render() {
    return (
      <div>


          <SideBar handleTogg={this.handleToggle}/>
          <div className={classnames('app-content', {'expanded': this.state.open})}>
            <UsersList/>
          </div>
        

      </div>
    );
  }
}

export default App;
