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
import {open, close} from '../actions/ClickedUserProfileActions';


// const OtherUserProfile =({clickedUser})

class OtherUserProfile extends React.Component {
  constructor(props) {
// const OtherUserProfile =({clickedUser}) => {
    super(props)
    // this.state = {
    //   first: ''
    // }
    // let getID = clickedUser.id
    // console.log(clickedUser, 'this is the clicedd')
  
  // console.log(clickedUser, 'this is the clicedd')
  
  let getID = this.props.clickedUser.id
  console.log(getID,"this is the iddddd")

     axios.post('db/getOther', {id: getID})
     .then((response)=> {
      // console.log(response, 'this is the new resposne')
      this.setState({
        id: response.data[0].id,
        email: response.data[0].email,  
        first: response.data[0].first,
        about: response.data[0].about,
        first: response.data[0].first,
        last: response.data[0].last,
        github: response.data[0].github,
        facebook: response.data[0].facebook,
        twitter: response.data[0].twitter,
        linkedin: response.data[0].linkedin,
        // showModel: response.data[0]
      })
    //   console.log(response.data[0].first, 'this is the response.....')
    //   this.setState({
    //     first: response.data[0].first
    //   })
    // })
  }) 
    this.handleSubmit = this.handleSubmit.bind(this) 
}

  handleSubmit(event){
    this.props.dispatch(close())
  }


  render(){
    return (
      <Modal id="profile_modal" show={this.props.clickedUser.showModel} >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content">
      <div className='table'>
        <div>
          <h2 className='tableUsername'>{this.state.username}</h2>
        </div>
        <div>
          <h3>Profile Picture</h3>
        </div>
        <table className='tableOtherUserInformation'>
        <tbody>
          <tr>
            <td className='profileHeading'>First Name</td>
            <td>{this.state.first}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{this.state.last}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{this.state.phone}</td>
          </tr>
          <tr>
            <td>Github</td>
            <td>{this.state.github}</td>
          </tr>
          <tr>
            <td>Linkedin</td>
            <td>{this.state.linkedin}</td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td>{this.state.facebook}</td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>{this.state.twitter}</td>
          </tr>
          <tr>
            <td>About Me</td>
            <td>{this.state.about}</td>
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
  console.log("in otheruserprofile",state.allReducers.ClickedUserProfileReducer)
	return {
    // console.log(clickedUser, 'this is my clickeddd user')
		// allUsers: state.allReducers.UserReducer,
    clickedUser: state.allReducers.ClickedUserProfileReducer
	}
  // console.log(clickedUser, 'this is my clickeddd user')
}

export default connect(mapStateToProps)(OtherUserProfile)
