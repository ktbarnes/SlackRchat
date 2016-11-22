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
      <div>
      <Modal id='profile_modal_other' show={this.props.clickedUser.showModel2} >
        <Modal.Header>
          <Modal.Title id='modal_header_other'>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal_content_other'> 
      <div className='table'>
        <div>
          <h2 className='tableUsername'>{this.props.clickedUser.username}</h2>
        </div>
        <div>
          <h3>Profile Picture</h3>
          <img className='profilePic' src={this.props.clickedUser.picture}></img>
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
            <td>Github1</td>
            <td><a href={this.props.clickedUser.github}>{this.props.clickedUser.github}</a></td>
          </tr>
          <tr>
            <td>Linkedin</td>
            <td><a href={this.props.clickedUser.linkedin}>{this.props.clickedUser.linkedin}</a></td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td><a href={this.props.clickedUser.facebook}>{this.props.clickedUser.facebook}</a></td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td><a href={this.props.clickedUser.twitter}>{this.props.clickedUser.twitter}</a></td>
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
      </div>
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
