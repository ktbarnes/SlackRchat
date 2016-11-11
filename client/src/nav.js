import React from 'react'
import Logout from "./logout.js"
import { loginUser } from '../actions/loginActions'
import { logoutUser } from '../actions/logoutActions'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

export default class Nav extends React.Component {

  render() {
    return (
      <div className="nav">
        <h1 className="title">Slacker</h1>
        <a className="navbutton" href="#" onClick={this.open}>Profile</a>
        <a className="navbutton" href="/Login"> Login </a>
        <a className="navbutton" href="/Logout">LogOut</a>
      </div>
    );
  }
}
  
    // <Route path='LogOut' component={Logout} />
  
//Login Component should switch to Logout
//User should see Logout once logged in, User should see Login when Logged Out

// var Modal = React.createClass({
//   render() {
//     return (
//       <div> 
//     <button type="button">
//       <span class="hide">Close</span>
//     </button>
//   </div>;
//   }
// });


