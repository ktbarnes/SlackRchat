import React from 'react'
import { connect, dispatch } from 'react-redux'
import { createUser, signupError, signupUser, sendProfileInfo } from '../actions/signupActions'
import { Transition } from 'react-router'
import Profile from './profile.js'
import axios from 'axios'
// import routerdb from '../config/router-DB'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showModel: false,
      // first: 'First Name',
      // last: 'Last Name',
      // username: 'username',
      // phone: 'phone number',
      // about: 'I am.... ',
      // github: 'github account',
      // facebook: 'facebook account',
      // twitter: 'twitter account',
      // linkedin: 'linkedin'
    }
    // this.username = null;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  open() {
    console.log('inside open')
    this.setState({
      showModel: true
    })
  };

  close() {
    this.setState({
      showModel: false,
    })
  };

  onSignup(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const email = this.refs.email;
    const creds = {
      username: username.value.trim(),
      password: password.value.trim(),
      email: email.value.trim()
    }

    signupUser(creds)
    .then(response => {
      console.log(response, "this it the token resposne for katie")
      if(response.data.code === 'ER_DUP_ENTRY') {
        window.alert('Username/Email taken')
        // this.props.dispatch(signupError(message: 'Problem with sign up!'))
      }
      else {
        // console.log("Signup successful - setting a token in local storage")
        localStorage.setItem('id_token', response.data.id_token);
        // console.log(response.data.id_token, "this is the id token julia")
        this.props.dispatch(createUser(response.data.id_token));
        // console.log(response.data.id_token, "this is the id token julia")
        this.open();
      }
    })
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.email.value = '';
    }

  save(info) {
    sendProfileInfo(info)
    .then(response => {
      if(!response) {
        console.log('errorMessage')
      }
      else {
        // localStorage.setItem('id_token', response.data.id_token);

        this.props.router.replace('/')   
      }
    })
  }
 
  render() {
    const { dataStore, errorMessage } = this.props
    return (
      <div>
        <div>Sign Up</div>
          <label>Enter Email</label>
            <input type='text' ref='email' className='form-control' placeholder='Email' />
          <label>Enter Username</label>
            <input type='text' ref='username' className='form-control' placeholder='Username' /> 
          <label>Enter Password</label>
            <input type='password' ref='password' className='form-control' placeholder='Password' />
          <a className='btn btn-auth' href="#" onClick={(event) => this.onSignup(event)}> 
          Signup
          </a>
          <Profile 
            show={this.state.showModel} 
            onHide={this.close}
            // first={this.state.first} 
            // last={this.state.last}
            // username={this.state.username}
            // phone={this.state.phone}
            // about={this.state.about}
            // github={this.state.github}
            // facebook={this.state.facebook}
            // twitter={this.state.twitter}
            // linkedin={this.state.linkedin}
            save={this.save}
            />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(mapStateToProps)(SignUp);

//Need to write code for, onSuccess of signup, profile modal pops up
