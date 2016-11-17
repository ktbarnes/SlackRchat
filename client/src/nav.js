import React from 'react'
import { connect, dispatch } from 'react-redux'
import { logoutUser, requestLogout, receiveLogout } from '../actions/logoutActions'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import Profile from './profile.js'
import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap' 
import { sendProfileInfo } from '../actions/signupActions'
import { open } from '../actions/NavActions'
import PrimaryChatroom from './PrimaryChatroom'


class Nav extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   showModel: false,
      // first: "julia",
      // last: "Randall",
      // email: "juliafrandall@gmail.com",
      // phone: "561-271-0104",
      // about: "I am.... "
    }
    // this.open = this.open.bind(this);
    // this.close = this.close.bind(this);
    // this.save = this.save.bind(this);
  // }

onEdit(){
  // console.log("shoot me now")
  console.log(this.props, "sldkfjalfjalsfdjlkflasfjaldf")
  
  this.props.dispatch(open())
  // console.log("what is state now for navKKKK", this.props.toShowModel);
  // this.setState({
  //   showModel: true
  // }) 
}


  // {
    // console.log('inside open')
    // this.setState({
      // showModel: true
    // })

  // };

  // close() {
  //   this.setState({
  //     showModel: false,
  //   })
  // };

  // onEdit(event) {
  //   this.open()
    // var hello = this.props.currentUser
    // console.log(hello, "these are the goods")
    // .then(response=>{
    //   console.log(response, "this is the response from on EDIT")
    // })
    // console.log(yes, "this is from on EDITTT")
    // .then(response => {

    // })
  // }



  // save(info) {
  //   sendProfileInfo(info)
  //   .then(response => {
  //     if(!response) {
  //       console.log('error')
  //     }
  //     else {
  //       this.close();
  //     }
  //   })
  // }
  logout() {
    const { dispatch } = this.props;
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
    // this.props.router.replace('/login');
  }

  render() {
    return (
      <div className="nav">
        <h1 className="title">Slacker</h1>
        <a className="navbutton" href="#" role="button" 
        onClick={(event) => this.onEdit(event)}>Profile</a>
        <Profile show={this.props} 
        m={this.props}
        />
        <a className="navbutton" onClick={() => this.logout()} href="/login">Logout</a>
      </div>
    )
  }
}
  
const mapStateToProps = (state, ownProps) => {
  console.log("w!!!!!!!!!!!!! user? Julia wants to know", state)
  return {
    toShowModel: state.allReducers.NavReducer,
    currentUser: state.allReducers.CurrentUserReducer 
  }
}

export default connect(mapStateToProps)(Nav)

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


