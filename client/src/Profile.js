import { Modal, Button, ModalHeader, ModalTitle, ModalFooter, ModalBody } from 'react-bootstrap'        
import React from 'react'
import { dispatch, connect } from 'react-redux'
import axios from 'axios'
import { sendProfileInfo } from '../actions/signupActions'
import { updateUser } from '../actions/CurrentUserActions'
import { close } from '../actions/NavActions'

class Profile extends React.Component {

  constructor(props) {
    super(props);

    console.log('here are the currentUser props in Profile.js ', this.props.currentUser);

    this.state = {
      first: this.props.currentUser.first,
      photo: this.props.currentUser.photo,
      last: this.props.currentUser.last,
      phone: this.props.currentUser.phone,
      about: this.props.currentUser.about,
      github: this.props.currentUser.github,
      facebook: this.props.currentUser.facebook,
      twitter: this.props.currentUser.twitter,
      linkedin: this.props.currentUser.linkedin
    }
    
    // this.updateInfo = this.updateInfo.bind(this);
    this.handleFirst= this.handleFirst.bind(this);
    this.handleLast= this.handleLast.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleGithub = this.handleGithub.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleLinkedin = this.handleLinkedin.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (nextProps.toShowModel.showModel !== this.props.toShowModel.showModel) return true;
    if (nextState.first !== this.state.first) return true;
    if (nextState.last !== this.state.last) return true;
    if (nextState.phone !== this.state.phone) return true;
    if (nextState.picture !== this.state.picture) return true;
    if (nextState.about !== this.state.about) return true;
    if (nextState.github !== this.state.github) return true;
    if (nextState.facebook !== this.state.facebook) return true;
    if (nextState.twitter !== this.state.twitter) return true;
    if (nextState.linkedin !== this.state.linkedin) return true;

    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      first: nextProps.currentUser.first,
      last: nextProps.currentUser.last,
      phone: nextProps.currentUser.phone,
      picture: nextProps.currentUser.picture,
      about: nextProps.currentUser.about,
      github: nextProps.currentUser.github,
      facebook: nextProps.currentUser.facebook,
      twitter: nextProps.currentUser.twitter,
      linkedin: nextProps.currentUser.linkedin
    });
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
    // console.log('inside handlSubmit in profile')
    let info = this.state
    this.props.save(info)
    this.upload(event);
    this.props.dispatch(close())
    // this.props.onHide();
  }
  
  upload(event) {
    const dispatch = this.props.dispatch;
    let file = this.refs.pic.files[0];
    if(!file) return;
  
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(event) {
      console.log("WE ARE UPLODING NOW")
      updateUser(reader.result);
    }
  }

  render() {
    return (
      <div>
      <Modal id='profile_modal'show={this.props.toShowModel.showModel} >
        <Modal.Header>
          <Modal.Title >Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modal_content'>
        <div>
          <div>
            <h2>Edit Profile</h2>
          </div>   
          <div> 
            <h3>Profile Picture</h3>
            <input type="file" ref='pic' accept="image/*" data-action="profilepicture" />
            <img src={this.state.picture}></img>
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
        </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default" onClick={(event)=>this.handleSubmit(event)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('julia these', state.allReducers.CurrentUserReducer)
  return {
    currentUser: state.allReducers.CurrentUserReducer,
    toShowModel: state.allReducers.NavReducer
  }
}

export default connect(mapStateToProps)(Profile)
// export default Profile









