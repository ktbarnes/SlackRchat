import React from 'react'
import Login from './login'
import Logout from './logout'
import { loginUser, logoutUser } from '../actions'

export default class Nav extends React.Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props
  
    return (

      <nav className='nav'>
        <div className='container-nav'>
          <a className-'nav-name' href='#'>Slacker</a>
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