import React from 'react'
import Login from './login'
import Logout from './logout'
import { loginUser } from '../actions/loginActions'
import { logoutUser } from '../actions/logoutActions'

export default class Nav extends React.Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
  
    return (
      <nav className='nav'>
        <div className='container-nav'>
          <h1>Slacker<h1>
        <div>
        <a className='btn btn-primary' href='#' onClick={this.open}>
          Profile
        </a>
        <a className='btn btn-primary' href='/SignIn'> 
          SignIn
        </a>
        <a className='btn btn-primary' href='/LogOut'>
          LogOut
        </a>    
        </div>
        
        <div className='nav-form'>
           {!isAuthenticated && 
            <Login 
            errorMessage={errorMessage}
            onLoginClick={creds => dispatch(loginUser(creds))}
            />
          }
          {isAuthenticated &&
            <Logout onLogoutClick={() => dispatch(logoutUser())} />
          }
        </div>
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string
}