import React from 'react'

export default class Signup extends React.Component {

  onSignup(event) {
    const username = this.refs.username,
    const password = this.refs.password
    const creds = {
      username: username.value.trim(),
      password: password.value.trim()
    }
    this.props.onSignupClick(creds)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='username' className='form-control' style= placeholder="Username" />
        <input type='password' ref='password' className='form-control' style= placeholder="Password" />
        <button onClick={(event) => this.onSignup(event)} className='btn btn-auth'>
        Login
        </button>
        {errorMessage && <p style=>{errorMessage}</p>}
      </div>
    )
  }

}

Signup.propTypes = {
  onSignupClick: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string
}