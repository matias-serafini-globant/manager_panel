import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import './App.css';
import Reducers from './Reducers/reducers'
import LoginReducer from './Reducers/LoginReducer'
import { connect } from 'react-redux'

import AppBar from 'material-ui/AppBar';
import classnames from 'classnames'



import BarButton from './Components/BarButton';
import SideBar from './Components/SideBar';

import UsersList from './Components/Users/UsersList'
import UserComponent from './Components/Users/UserComponent'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    }


  }
  handleToggleAppBar(state) {
    if (state === true) {
      this.setState({
        open: false
      })
    } else {
      this.setState({
        open: true
      })
    }

  }
  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        open: false
      })
    }
  }

  render() {

    return (

      <div className="app-container">
        {console.log(this.props.responsive, "probando responsive!")}
        <AppBar
          style={{ backgroundColor: '#66BB6A', position: "fixed", top: 0, }}

          onLeftIconButtonClick={() => this.handleToggleAppBar(this.state.open)}
          title="Title"
          iconElementRight={<BarButton />} />
        <div className={classnames('menu-container', { 'menu-expanded': !this.state.open })} >
          <SideBar open={this.state.open} />
          <div className={classnames('app-content content-container', { 'expanded': !this.state.open })}>
            <UsersList />
          </div>

        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    responsive: state.responsive
  }
}
export default connect(mapStateToProps)(App)


