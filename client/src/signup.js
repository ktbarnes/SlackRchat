import React from 'react'
import { connect, dispatch } from 'react-redux'
import { createUser, signupError, signupUser, sendProfileInfo } from '../actions/signupActions'
import { Transition } from 'react-router'
import ProfileInitial from './ProfileInitial'
import axios from 'axios'
// import routerdb from '../config/router-DB'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showModel: false,
    }
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


  //When user signs up, s/he automatically subscribes to the lobby
  //The lobby in our application is id=1 in the database (this won't change)
  //Also reflected that way in the store. So when the onSignup function is called
  //A post request will be made to subscribe that new user to the Lobby by default
  subscribeToLobby(userID,channelID){
    axios.post('/db/addMyChannel',{
      myUserID: userID,
      channelID: channelID
    })    
  }

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
        this.props.dispatch(createUser(response.data.id_token));
        this.subscribeToLobby(response.data.idInDatabase,1); //Lobby is default room 1, as seen in store and DB, so will hard-code here
        this.open();
      }
    })
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.email.value = '';
    }

  save(info) {
    console.log(info, 'hey this is the info')
    sendProfileInfo(info)
    .then(response => {
      if(!response) {
        console.log('errorMessage')
      }
      else {
        this.props.router.replace('/')   
      }
    })
  }
 
  render() {
    const { dataStore, errorMessage } = this.props
    return (
      <div>
        <div className='background'>
        </div>
        <div className='signUpPage'>
          <h1 className='stayConnected'>Stay Connected</h1>
          <div className='signUpForm'>
            <div>
              <label className='signUpLabelsEmail'>Email</label>
              <input type='text' ref='email' className='form' placeholder='Email' />
            </div>
            <div>
              <label className='signUpLabels'>Username  </label>
              <input type='text' ref='username' className='form' placeholder='Username' /> 
            </div>
            <div>
              <label className='signUpLabels'>Password  </label>
              <input type='password' ref='password' className='form' placeholder='Password' />
            </div>
            <div>  
              <a className='signUpButton' href="#" onClick={(event) => this.onSignup(event)}> 
              SignUp
              </a>
            </div>
          <div>
            <ProfileInitial 
            show={this.state.showModel} 
            onHide={this.close}
            save={this.save}
              /> 
          </div>  
          </div>  
        </div>
      </div> 
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

export default connect(mapStateToProps)(SignUp);

//Need to write code for, onSuccess of signup, profile modal pops up
