import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'

export default class OtherProfile extends React.Component {

    constructor(props) {
      super(props)
      
      this.state = {
        // first: 'First Name',
        // last: 'Last Name',
        // phone: 'phone',
        // about: 'about',
        // github: 'github',
        // facebook: 'facebook',
        // twitter: 'twitter',
        // linkedin: 'linkedin',
        // submit: 'submit'
      }  
     }
    //   open = () => {
    //     this.setState({
    //       showModel: true
    //     });
    //   }
  }

    render(){
    return (
      <Modal id="profile_modal" show={this.props.show} >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content">
          <div>
            <h2>Edit Profile</h2>
          </div>
          <div> 
            <h3>Profile Picture</h3>
          </div>
          <div>
            <label>First Name</label>
            <label>Last Name</label>
          </div>
          <div>
            <label>Phone</label>
          </div>
          <div>
            <label>About Me</label>
          </div>
          <div>
            <h4>Social Media</h4>
            <label>github</label>
            <label>facebook</label>
            <label>twitter</label>
            <label>linkedin</label>
          </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default">Close</Button>
        </Modal.Footer>
      </Modal>
     ) 
  }
}




render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <Modal id="profile_modal" show={this.props.show} >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content">
          <div>
            <h2>Edit Profile</h2>
          </div>
          <div> 
            <h3>Profile Picture</h3>
            <input type="file" accept="image/*" data-action="profilepicture" />
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
     </form> 
     ) 
  }
}