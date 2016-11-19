 import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'
import { dispatch, connect } from 'react-redux';


const OtherUserProfile = ({clickedUser}) => {
    return (
      <div className='table'>
        <div>
          <h2 className='tableUsername'>{clickedUser.username}</h2>
        </div>
      <div>
        <h3>Profile Picture</h3>
      </div>
      <table className='tableOtherUserInformation'>
        <tbody>
          <tr>
            <td className='profileHeading'>First Name</td>
            <td>{clickedUser.first}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{clickedUser.last}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{clickedUser.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{clickedUser.phone}</td>
          </tr>
          <tr>
            <td>Github</td>
            <td>{clickedUser.github}</td>
          </tr>
          <tr>
            <td>Linkedin</td>
            <td>{clickedUser.linkedin}</td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td>{clickedUser.facebook}</td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>{clickedUser.twitter}</td>
          </tr>
          <tr>
            <td>About Me</td>
            <td>{clickedUser.about}</td>
          </tr>
        </tbody>   
      </table> 
      <button>Close</button> 
      </div>  
     ) 
  }

const mapStateToProps = (state, ownProps) => {
	return {
		// allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
	}
}

export default connect(mapStateToProps)(OtherUserProfile)