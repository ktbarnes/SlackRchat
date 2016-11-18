import React from 'react'
import { connect, dispatch } from 'react-redux'
import { logoutUser, requestLogout, receiveLogout } from '../actions/logoutActions'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import Profile from './Profile2'
import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap' 
import { sendProfileInfo } from '../actions/signupActions'
import { open, close } from '../actions/NavActions'
import { UpdateProfile } from '../actions/CurrentUserActions'
import PrimaryChatroom from './PrimaryChatroom'
import axios from 'axios'
import { Transition } from 'react-router'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props, 'these are my props')
  }

  onEdit() {
    console.log(this.props, "alksdfjjjjjjjj")
    this.props.dispatch(open())
  }

// onClose(){
//   dispatch(close())
// }

save(user) {
    let information1 = {
    id: user.id,
    username: user.username,
    email: user.email,
    currentUserToggle: user.currentUserToggle, 
    about: user.about,
    first: user.first,
    last: user.last,
    github: user.github,
    facebook: user.facebook,
    twitter: user.twitter,
    linkedin: user.linkedin
    }
    axios.post('/db/usersInfo', information1)
    .then(response => {
      if(!response) {
        console.log('errorMessage')
      } else {
        
      }
    });
  }

    // this.props.dispatch(UpdateProfile(info))
    // .then(response => {
    //   if(!response) {
    //     console.log('error')
    //   }
    //   else {
    //    this.props.dispatch(close());
    //   }
    // })
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
        <Profile save={this.save} onHide={this.onClose}/>
        <a className="navbutton" onClick={() => this.logout()} href="/login">Logout</a>
      </div>
    )
  }
}
  
const mapStateToProps = (state, ownProps) => {
  return {
    toShowModel: state.allReducers.NavReducer
    // currentUser: state.allReducers.CurrentUserReducer 
  }
}

export default connect(mapStateToProps)(Nav)

