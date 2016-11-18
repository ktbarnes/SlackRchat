import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap'        
import React from 'react'
import { dispatch, connect } from 'react-redux'
import axios from 'axios'
import { sendProfileInfo } from '../actions/signupActions'
import { close } from '../actions/NavActions'

class Profile extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        first: this.props.currentUser.first || '',
        last: this.props.currentUser.last || '',
        phone: this.props.currentUser.phone || '',
        about: this.props.currentUser.about || '',
        github: this.props.currentUser.github || '',
        facebook: this.props.currentUser.facebook || '',
        twitter: this.props.currentUser.twitter || '',
        linkedin: this.props.currentUser.linkedin || ''
      }
    
    // this.updateInfo = this.updateInfo.bind(this);
    this.handleFirst= this.handleFirst.bind(this);
    this.handleLast= this.handleLast.bind(this);
    // // // this.handleUsername = this.handleUsername.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleGithub = this.handleGithub.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleLinkedin = this.handleLinkedin.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.currentUserIDfromDB;
    // axios.get('/db/getMe', {headers: {"authorization": "Bearer " + localStorage.getItem('id_token')}})
    // .then(data => {
    //   // console.log(data);    
    // })
  }
       
  handleFirst(event){ this.setState({first: event.target.value})}  
  handleLast(event) { this.setState({last: event.target.value})}
  handlePhone(event) { this.setState({phone: event.target.value})}
  handleAbout(event) { this.setState({about: event.target.value})}
  handleGithub(event) { this.setState({github: event.target.value})}
  handleFacebook(event) { this.setState({facebook: event.target.value})}
  handleTwitter(event) { this.setState({twitter: event.target.value})}
  handleLinkedin(event) { this.setState({linkedin: event.target.value})}

  // handleSubmit(event){this.props.dispatch(save(infor))}
  handleSubmit(event) {
    let info = this.state
    // console.log(this.state, "these are the proops")
    this.props.save(info)
    this.props.dispatch(close())
    // this.props.onHide();
  }
  
  render() {
    return (
      <Modal id="profile_modal" show={this.props.toShowModel.showModel} >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content">
          <div>
            <h2>Edit Profile</h2>
          </div>
          <div> 
            <h3>Profile Picture</h3>
            <input type="file" ref='pic' accept="image/*" data-action="profilepicture" />
          </div>
          <div>
            <label>First Name</label>
              <input type='text' value={this.state.first} onChange={this.handleFirst} />
            <label>Last Name</label>
              <input type='text' value={this.state.last} onChange={this.handleLast} />  
          </div>
          <div>
            <label>Phone</label>
              <input type='text' value={this.state.phone} onChange={this.handlePhone} />
          </div>
          <div>
            <label>About Me</label>
              <input type='text' value={this.state.about} onChange={this.handleAbout} />
          </div>
          <div>
            <h4>Social Media</h4>
            <label>github</label>
              <input type='text' value={this.state.github} onChange={this.handleGithub} />
            <label>facebook</label>
              <input type='text' value={this.state.facebook} onChange={this.handleFacebook} />
            <label>twitter</label>
              <input type='text' value={this.state.twitter} onChange={this.handleTwitter} />  
            <label>linkedin</label>
              <input type='text' value={this.state.linkedin} onChange={this.handleLinkedin}/> 
          </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.allReducers.CurrentUserReducer,
    toShowModel: state.allReducers.NavReducer
  }
}

export default connect(mapStateToProps)(Profile)









