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
      <div>
        <input type='text' ref='username' className='form-control' placeholder='Email' />
        <input type='password' ref='password' className='form-control' placeholder='Password' />
        <button onClick={(event) => this.handleClick(event)} className='btn btn-auth'>
        Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
        <a className='btn btn-auth' href='/signup'>Sign Up</a>

      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  console.log("HERE IS THE STATE AS SEEN BY LOGIN.JS", state.allReducers.authReducer)
  return {}
  // return { isFetching: state.allReducers.AuthReducer.isFetching, isAuthenticated: state.allReducers.AuthReducer.isAuthenticated }
};

export default connect(mapStateToProps)(Login);

// Login.propTypes = {
//   onLoginClick: React.PropTypes.func.isRequired,
//   errorMessage: React.PropTypes.string
// }