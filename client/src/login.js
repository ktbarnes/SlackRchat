import React from 'react'
import { connect, dispatch } from 'react-redux'
import { loginUser, receiveLogin, loginError } from '../actions/loginActions'

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick(event) {
    let that = this;
    const username = this.refs.username
    const password = this.refs.password
    const creds = { 
      username: username.value.trim(), 
      password: password.value.trim()
    }
    // console.log("HERE ARE CREDS IN login.js ", creds)
    loginUser(creds).then(response => {
      // console.log('what is the login response? ', response.data);
      if(!response) {
        that.props.dispatch(loginError('Email and password do not match!'))
        // return Promise.reject()
      }
      else {
        console.log("Setting a token in local storage")
        localStorage.setItem('id_token', response.data.id_token)
        that.props.dispatch(receiveLogin(response.data.id_token))
      }
    });
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    const { dataStore, errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='username' className='form-control' placeholder="Email" />
        <input type='password' ref='password' className='form-control' placeholder="Password" />
        <button onClick={(event) => this.handleClick(event)} className='btn btn-auth'>
        Login
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  }

}

// export default Login
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