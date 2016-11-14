import React from 'react'
import { connect, dispatch } from 'react-redux'
import { createUser, signupError, signupUser } from '../actions/signupActions'
import { Transition } from 'react-router'
import Profile from './profile.js'

class SignUp extends React.Component {

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

  close() {
    this.setState({
      showModel: false,
    })
  };

  onSignup(event) {
    const username = this.refs.username;
    const password = this.refs.password;
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
        this.open();
      }
    })
    this.refs.username.value = '';
    this.refs.password.value = '';
    }

  render() {
    // const { errorMessage } = this.props
    return (
      <div>
        <div>Sign Up</div>
          <label>Enter Email</label>
            <input type='text' ref='username' className='form-control' placeholder="Email" />
          <label>Enter Password</label>
            <input type='password' ref='password' className='form-control' placeholder="Password" />
          <a className='btn btn-auth' href="#" onClick={(event) => this.onSignup(event)}> 
          Signup
          </a>
          <Profile 
            show={this.state.showModel} 
            onHide={this.close}
            first={this.state.first} 
            last={this.state.last}
            email={this.state.email}
            phone={this.state.phone}
            about={this.state.about}
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
