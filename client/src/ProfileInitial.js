import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, 
        ModalBody, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'        
import React from 'react'
import SignUp from './signup.js'
import {updateUserPictureInitial} from '../actions/signupActions'
import { dispatch, connect } from 'react-redux'

class ProfileInitial extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        first: 'First Name',
        last: 'Last Name',
        phone: 'Phone',
        about: 'About',
        github: 'http://',
        facebook: 'http://',
        twitter: 'http://',
        linkedin: 'htpp://',
        submit: 'submit'
      }
      

      this.handleFirst= this.handleFirst.bind(this);
      this.handleLast= this.handleLast.bind(this);
      // this.handleUsername = this.handleUsername.bind(this);
      this.handlePhone = this.handlePhone.bind(this);
      this.handleAbout = this.handleAbout.bind(this);
      this.handleGithub = this.handleGithub.bind(this);
      this.handleFacebook = this.handleFacebook.bind(this);
      this.handleTwitter = this.handleTwitter.bind(this);
      this.handleLinkedin = this.handleLinkedin.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this);
      this.handleSubmit2= this.handleSubmit2.bind(this);
     }
      // open = () => {
      //   this.setState({
      //     showModel: true
      //   });
    //   }
  handleFirst(event){ 
    // console.log("wer got ittt", event.target.value)
    this.setState({first: event.target.value})
    // console.log(this.state, "the state is updatedgf")
  }     

  handleLast(event) { this.setState({last: event.target.value})}
  handlePhone(event) { this.setState({phone: event.target.value})}
  handleAbout(event) { this.setState({about: event.target.value})}
  handleGithub(event) { this.setState({github: event.target.value})}
  handleFacebook(event) { this.setState({facebook: event.target.value})}
  handleTwitter(event) { this.setState({twitter: event.target.value})}
  handleLinkedin(event) { this.setState({linkedin: event.target.value})}

  handleSubmit(event){
    let info = this.state
    // console.log(this.props, "the state is updated")
    this.props.save(info)
    this.props.dispatch(close())
}

handleSubmit2(event){
  this.upload2(event, info)
}
  upload2(event, info) {
  
      }
    
  


render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <Modal className='profile_modal' show={this.props.show} >
        <Modal.Header>
          <Modal.Title id='modal_header'>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal_content'>
          <div> 
            <div className='profilePicture'> 
              <img className='pictureImg' src={this.state.picture}></img>
              <input className='pictureInput'type="file" ref='pic' accept="image/*" data-action="profilepicture" />
              <Button className='btn btn-default' onClick={this.handleSubmit2}>Save</Button>
            </div>
          </div>
          <div className='restProfile'>
          <div className='names'>
            <FormGroup>
              <ControlLabel className='label'>First Name</ControlLabel>
                <FormControl type='text' placeholder={this.state.first} onChange={this.handleFirst} />
              <ControlLabel className='label'>Last Name</ControlLabel>
                <FormControl type='text' placeholder={this.state.last} onChange={this.handleLast} />  
              <ControlLabel className='label'>Phone</ControlLabel>
                <FormControl type='text' placeholder={this.state.phone} onChange={this.handlePhone} />
            </FormGroup>
          </div>
            <FormGroup>
              <ControlLabel>Social Media</ControlLabel>
            <div>
              <ControlLabel className='label'>Github</ControlLabel>
                <FormControl type='text' placeholder={this.state.github} onChange={this.handleGithub} />
              <ControlLabel className='label'>Facebook</ControlLabel>
                <FormControl type='text' placeholder={this.state.facebook} onChange={this.handleFacebook} />
            </div>
            <div>  
              <ControlLabel className='label'>Twitter</ControlLabel>
                <FormControl type='text' placeholder={this.state.twitter} onChange={this.handleTwitter} />  
              <ControlLabel className='label'>Linkedin</ControlLabel>
                <FormControl type='text' placeholder={this.state.linkedin} onChange={this.handleLinkedin}/> 
            </div>  
          </FormGroup>  
          <div className='aboutMeContainer'>
            <div>
            <ControlLabel>About Me</ControlLabel>
            </div>
            <div>
              <FormControl className='aboutMeInput' type='text' placeholder={this.state.about} onChange={this.handleAbout} />
            </div>
           </div> 
          </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-default' onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
     </form> 
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("what is my current user? Julia wants to know",state.allReducers.CurrentUserReducer)
  return {
    currentUser: state.allReducers.CurrentUserReducer
    // allUsers: state.allReducers.UserReducer 
  }
}

export default connect(mapStateToProps)(ProfileInitial)






//NOTES
//Need to change Button Save onClick functionality
//On Close or Save, then send Profile Information to database, 
//Render Primary Chat
