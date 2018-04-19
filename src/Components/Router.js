import React, { Component } from 'react';
import '../App.css';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom';
import App from '../App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Login from './Login/Login';
import Auth from '../lib/Auth/Auth';

const Root = (store) => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      Auth(store) ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login'
        }}/>
      )
    )}/>
  )



  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <div>
          <Route exact path="/login" component={Login} />  
          <PrivateRoute path="/list" component={App} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
  
}
  
  export default Root;
  
  