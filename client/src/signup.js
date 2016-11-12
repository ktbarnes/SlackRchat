import React from 'react'
import { connect, dispatch } from 'react-redux'
import { createUser, signupError, signupUser } from '../actions/signupActions'

export default class SignUp extends React.Component {

  onSignup(event) {
    const username = this.refs.username,
    const password = this.refs.password
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    }
    signupUser(creds)
    .then(response => {
      if(!response) {
        this.props.dispatch(signupError(message: 'Problem with sign up!'))
      }
      else {
        console.log("Signup successful - setting a token in local storage")
        localStorage.setItem('id_token', response.data.id_token);
        this.props.dispatch(createUser(response.data.id_token));
      }
    })
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='username' className='form-control' placeholder="Email" />
        <input type='password' ref='password' className='form-control' placeholder="Password" />
        <button onClick={(event) => this.onSignup(event)} className='btn btn-auth'>
        Login
        </button>
        {errorMessage && <p style=>{errorMessage}</p>}
      </div>
    )
  }

}

// Signup.propTypes = {
//   onSignupClick: React.PropTypes.func.isRequired,
//   errorMessage: React.PropTypes.string
// }