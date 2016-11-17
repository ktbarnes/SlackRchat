import React from 'react'
import { connect, dispatch } from 'react-redux'
import { logoutUser, requestLogout, receiveLogout } from '../actions/logoutActions'
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'
import Profile from './profile.js'
// import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap' 

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModel: false,
      first: "julia",
      last: "Randall",
      email: "juliafrandall@gmail.com",
      phone: "561-271-0104",
      about: "I am.... "
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    console.log('inside open')
    this.setState({
      showModel: true
    })
  };

  close(pic) {
    this.setState({
      showModel: false,
    })
    
  };

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
        onClick={this.open}>Profile</a>
        <Profile 
          show={this.state.showModel} 
          onHide={this.close}
          first={this.state.first} 
          last={this.state.last}
          uersname={this.state.username}
          phone={this.state.phone}
          about={this.state.about}
          github={this.state.github}
          facebook={this.state.facebook}
          twitter={this.state.twitter}
          />
        <a className="navbutton" onClick={() => this.logout()} href="/login">Logout</a>
      </div>
    )
  }
}
  
const mapStateToProps = (state, ownProps) => {
  return {}
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


