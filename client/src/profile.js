//profile page....
//bootstrap modal
import {Modal, 
        ModalHeader, 
        ModalTitle, 
        ModalClose, 
        ModalBody} from 'react-modal-bootstrap'
import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // this.state= {
    // 	first: '',
    // 	last: '',
    // 	phone: '',
    // 	email: '',
    // 	photo:
    // 	//these might be filled in initially in signup
    // 	this.handleSubmit = this.handleSubmit.bind(this);
    // }

    // handleInputChange(e) {
    // 	this.setState({
    // 		first: e.target.first,
    // 		last: e.target.last,
    // 		phone: e.target.phone,
    // 		email: e.target.email,
    // 		photo: 
    // 	})
    // }
    this.state = {
      isOpen: false
    };
  
  openModal = () => {
  	this.setState({
  	  isOpen: true
  	});
  };

  hideModal = () => {
  	this.setState({
  	  isOpen: false
  	});
  };


  render() {
  	return (
  	  <div>
  		<h2>Edit your profile</h2>
  	  </div>
  	  <div>
  	  	<h3>Profile Picture</h3>
  		<input type='file' accept='image/*' 
  		 data-action='profilepicture' />
  	  </div>
  	  <div>
  	  	<label for='first_name'>First Name</label>
  	  		<input type='text' name='first_name' placeholder='First Name' value={this.state.first} 
  	  		onChange={this.handleInputChange.bind(this)} />
  	  	<label for='last_name'>Last Name</label>
  	  		<input type='text' name='last_name' placeholder='Last Name' value={this.state.last} 
  	  		onChange={this.handleInputChange.bind(this)} />
  	  	<label for='phone_number'>Phone Number</label>
  	  		<input type='text' name='phone_number' placeholder='Phone Number' value={this.state.value} />	
  	  
  	  	<button onClick={this.handleSubmit}>Submit Profile </button>
  	  	//will this submit all fields?
  	  </div>
    )
  }
}


  //   this.state = {
  //     isOpen: false
  //   };
  
  // openModal = () => {
  // 	this.setState({
  // 	  isOpen: true
  // 	});
  // };

  // hideModal = () => {
  // 	this.setState({
  // 	  isOpen: false
  // 	});
  // };

  //versus
  NAVBAR COMPONENT
  getInitialState(){
  	return {showModal: false};
  },
  close(){
  	this.setState({showModal:false});
  },
  open(){
  	this.setState({showModal:true});
  }
  render(){
  	return (
  	  <div className='nav'>
  	  <h1>Slacker<h1>
  	  <a className='btn btn-primary'
  	  	href='#'
  	  	onClick={this.open}>Profile
  	  </a>
  	  <a className='btn btn-primary'
  	  	href='/Signin'>Signin
  	  </a>
  	  <a className='btn btn-primary'
  	  	href='Logout'>Logout
  	  </a>
  	  <Modal show={this.state.showModal} onHide={this.close} />
  	  </div>				
  		)
  }


// <button type="button" className="close" onClick{this.props.onHide}></button>
//   	  	<div>Profile Information from User will Go Here</div>














