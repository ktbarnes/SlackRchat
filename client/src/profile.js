//profile page....
//bootstrap modal
import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react';

export default class Profile extends React.Component {

    // constructor(props) {
    //   super(props)
      
    //   this.state = {
    //     showModel: false
    //   }
     
    //   open = () => {
    //     this.setState({
    //       showModel: true
    //     });
    //   }

    //   close = () => {
    //     this.setState({
    //       showModel: false
    //     })
    //   }
    
    // }
    render(){
    return (
      <Modal id="profile_modal" show={this.props.show}>
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
              <input type="text" placeholder={this.props.first}/>
            <label>Last Name</label>
              <input type="text" placeholder={this.props.last}/>  
          </div>
          <div>
            <label>Email</label>
              <input type="text" placeholder={this.props.email} />
            <label>Phone</label>
              <input type="text" placeholder={this.props.phone} />
          </div>
          <div>
            <label>About Me</label>
              <input type="text" placeholder={this.props.about} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default" onClick={this.props.onHide}>Close</Button>
          <Button className="btn btn-default" onClick={this.props.onHide}>Save</Button>
        </Modal.Footer>

      </Modal>
     ) 
  }
}



//Need to change Button Save onClick functionality









