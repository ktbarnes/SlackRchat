import React from 'react'
import Login from './login'
import Logout from './logout'
import Profile from './profile'
import { loginUser } from '../actions/loginActions'
import { logoutUser } from '../actions/logoutActions'

export default class Nav extends React.Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
  
    return (
      <div>
      <nav className='nav'>
        <div className='container-nav'>
          <ul className='header'>
            <li>Slacker</li>
            <li><Link to='Profile' className='btn btn-primary' href='#' onClick={this.open}>Profile</Link></li>
            <li><Link to='SignIn'className='btn btn-primary'> SignIn</Link></li>
            <li><Link to='LogOut' className='btn btn-primary'>LogOut'</Link></li>
          </ul>  
         </div>  
    
        
         <div className='nav-form'>
            {!isAuthenticated && 
            <Login 
            errorMessage={errorMessage}
            onLoginClick={creds => dispatch(loginUser(creds))}
            />}
          {isAuthenticated &&
            <Logout onLogoutClick={() => dispatch(logoutUser())} />}
        </div>
      </nav>
      </div>
    )
  }
}

Nav.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string
}