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
          <p>Content</p>
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









