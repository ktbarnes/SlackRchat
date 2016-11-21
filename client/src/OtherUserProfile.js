 import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'
import { dispatch, connect } from 'react-redux';
import axios from 'axios'
import {open2, close2} from '../actions/ClickedUserProfileActions';


// const OtherUserProfile =({clickedUser})

class OtherUserProfile extends React.Component {
  constructor(props) {
// const OtherUserProfile =({clickedUser}) => {
    super(props)
    // this.state = {
    //   // first: this.prop
    // }
    // let getID = clickedUser.id
    // console.log(clickedUser, 'this is the clicedd')
  
  // console.log(clickedUser, 'this is the clicedd')
  
  // let getID = this.props.clickedUser.id
  // console.log(getID,"this is the iddddd")

    this.handleSubmit = this.handleSubmit.bind(this) 
}

  handleSubmit(event){
    this.props.dispatch(close2())
  }


  render(){
    return (
      <Modal id="profile_modal" show={this.props.clickedUser.showModel2} >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content">
      <div className='table'>
        <div>
          <h2 className='tableUsername'>{this.props.clickedUser.username}</h2>
        </div>
        <div>
          <h3>Profile Picture</h3>
        </div>
        <table className='tableOtherUserInformation'>
        <tbody>
          <tr>
            <td className='profileHeading'>First Name</td>
            <td>{this.props.clickedUser.first}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{this.props.clickedUser.last}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{this.props.clickedUser.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{this.props.clickedUser.phone}</td>
          </tr>
          <tr>
            <td>Github</td>
            <td>{this.props.clickedUser.github}</td>
          </tr>
          <tr>
            <td>Linkedin</td>
            <td>{this.props.clickedUser.linkedin}</td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td>{this.props.clickedUser.facebook}</td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>{this.props.clickedUser.twitter}</td>
          </tr>
          <tr>
            <td>About Me</td>
            <td>{this.props.clickedUser.about}</td>
          </tr>
        </tbody>   
      </table> 
      </div> 
      </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default" onClick={(event)=>this.handleSubmit(event)}>Close</Button>
        </Modal.Footer>
      </Modal> 
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("in otheruserprofile",state.allReducers.ClickedUserProfileReducer)
  return {
    // console.log(clickedUser, 'this is my clickeddd user')
    // allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
  }
  // console.log(clickedUser, 'this is my clickeddd user')
}

export default connect(mapStateToProps)(OtherUserProfile)
