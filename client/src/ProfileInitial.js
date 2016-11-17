import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'
import SignUp from './signup.js'
import Nav from './nav.js'
import { dispatch, connect } from 'react-redux'

class Profile extends React.Component {

    constructor(props) {
      super(props)
        console.log(this.props, "what are my propss JUlia")
      // this.state = {
      //   first: 'First Name',
      //   last: 'Last Name',
      //   phone: 'phone',
      //   about: 'about',
      //   github: 'github',
      //   facebook: 'facebook',
      //   twitter: 'twitter',
      //   linkedin: 'linkedin',
      //   submit: 'submit'
      // }
//       var hm= this.state;
// console.log(hm, "this is the state julia of profile")

      // this.handleFirst= this.handleFirst.bind(this);
      // this.handleLast= this.handleLast.bind(this);
      // // this.handleUsername = this.handleUsername.bind(this);
      // this.handlePhone = this.handlePhone.bind(this);
      // this.handleAbout = this.handleAbout.bind(this);
      // this.handleGithub = this.handleGithub.bind(this);
      // this.handleFacebook = this.handleFacebook.bind(this);
      // this.handleTwitter = this.handleTwitter.bind(this);
      // this.handleLinkedin = this.handleLinkedin.bind(this);
      // this.handleSubmit= this.handleSubmit.bind(this);
     }
    //   open = () => {
    //     this.setState({
    //       showModel: true
    //     });
  //   //   }
  // handleFirst(event){ 
  //   // console.log("wer got ittt", event.target.value)
  //   this.setState({first: event.target.value})
  //   // console.log(this.state, "the state is updatedgf")
  // }     

  // handleLast(event) { this.setState({last: event.target.value})}
  // handlePhone(event) { this.setState({phone: event.target.value})}
  // handleAbout(event) { this.setState({about: event.target.value})}
  // handleGithub(event) { this.setState({github: event.target.value})}
  // handleFacebook(event) { this.setState({facebook: event.target.value})}
  // handleTwitter(event) { this.setState({twitter: event.target.value})}
  // handleLinkedin(event) { this.setState({linkedin: event.target.value})}

  // handleSubmit(event){
  //   let info = this.state
  //   // console.log(event, "the state is updated")
  //   this.props.save(info)






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

const mapStateToProps = (state, ownProps) => {
  console.log("what is my current user? Julia wants to know",state.allReducers.CurrentUserReducer)
  return {
    currentUser: state.allReducers.CurrentUserReducer
    // allUsers: state.allReducers.UserReducer 
  }
}

export default connect(mapStateToProps)(Profile)


//SEE NOTES on bottom
import { Modal, 
        Button,
        ModalHeader,
        ModalTitle,
        ModalFooter,
        ModalBody
         } from 'react-bootstrap'        
import React from 'react'
import SignUp from './signup.js'
import Nav from './nav.js'
import { dispatch, connect } from 'react-redux'

class Profile extends React.Component {
    constructor(props) {
      super(props)
      // this.props.currentUser
        // console.log(this.props, "what are my propss JUlia")
      // this.props = this.props.currentUser
     }
   
   
    // this.props = this.props.currentUser
  
    render(){
    return (
      <Modal id="profile_modal" >
        <Modal.Header>
          <Modal.Title id="modal_header">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal_content"> 
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-default">Save</Button>
        </Modal.Footer>
      </Modal>
    
     ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("what is my current user? Julia wants to know",state.allReducers.CurrentUserReducer)
  console.log("what is my current STATE ", state)
  return {
    currentUser: state.allReducers.CurrentUserReducer
    // allUsers: state.allReducers.UserReducer 
  }
}

export default connect(mapStateToProps)(Profile)







//NOTES
//Need to change Button Save onClick functionality
//On Close or Save, then send Profile Information to database, 
//Render Primary Chat
