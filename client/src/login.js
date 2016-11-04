import React from 'react'

export default class Login extends React.Component {

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { 
      username: username.value.trim(), 
      password: password.value.trim()
    }
    this.props.onLoginClick(creds)
  }

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='username' className='form-control' style= placeholder="Username" />
        <input type='password' ref='password' className='form-control' style= placeholder="Password" />
        <button onClick={(event) => this.handleClick(event)} className='btn btn-auth'>
        Login
        </button>
        {errorMessage && <p style=>{errorMessage}</p>}
      </div>
    )
  }

}

Login.propTypes = {
  onLoginClick: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string
}