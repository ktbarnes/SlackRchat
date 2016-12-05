import React from 'react'
import { connect, dispatch } from 'react-redux'
import { loginUser, receiveLogin, loginError } from '../actions/loginActions'
import { Transition } from 'react-router'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { 
      username: username.value.trim(), 
      password: password.value.trim()
    }
    loginUser(creds).then(response => {
      if(!response) {
        this.props.dispatch(loginError('Email and password do not match!'));
      }
      else {
        console.log("Setting a token in local storage")
        localStorage.setItem('id_token', response.data.id_token);
        console.log("Setting a token in local storage", response.data.id_token)
        this.props.dispatch(receiveLogin(response.data.id_token));
        this.props.router.replace('/');
      }
    });
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    const { dataStore, errorMessage } = this.props

    return (
      <div className='background'>
      <div className='logInPage'>
      <h1 className='stayConnected'>Stay Connected</h1>
        <div className='logForm'>
        <label className='logInLabels'>Email</label>
        <input type='text' ref='username' className='logInForm' placeholder='Email' />
        <label className='logInLabels'>Password</label>
        <input type='password' ref='password' className='logInForm' placeholder='Password' />
        <div className='logInButtons'>
        <button onClick={(event) => this.handleClick(event)} className='logInButton'>
        Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <a className='logInSignUpButton' href='/signup'>Sign Up</a>
        </div>
        </div>
      </div> 
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  // console.log("HERE IS THE STATE AS SEEN BY LOGIN.JS", state.allReducers.authReducer)
  return {}
  // return { isFetching: state.allReducers.AuthReducer.isFetching, isAuthenticated: state.allReducers.AuthReducer.isAuthenticated }
};

export default connect(mapStateToProps)(Login);

// Login.propTypes = {
//   onLoginClick: React.PropTypes.func.isRequired,
//   errorMessage: React.PropTypes.string
// }