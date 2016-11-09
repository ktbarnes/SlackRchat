// WORKING CODE. SCROLL DOWN TO SEE REFACTORED SOLUTION USING REDUX
// import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { addMessage } from '../actions/ChatActions';

// class ChatForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: ''
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleInputChange(e) {
//     this.setState({
//       value: e.target.value
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.handleSearchInputChange(this.state.value);
//     this.setState({
//       value: ''
//     });
//   }

//   render() {
//     return (
//       <div>
//         <form action="">
//           <input 
//             id="m" 
//             type="text"
//             value={this.state.value}
//             onChange={this.handleInputChange.bind(this)}
//           />
//           <button onClick={this.handleSubmit}>Send</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default ChatForm;











import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/ChatActions';
// import { bindActionCreators } from 'redux';

let socket = io();

//DAN'S TODO LIST
const ChatForm = ( { value, dispatch } ) => {
  let input;
  console.log({dispatch});

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          console.log("INPUT VALUE",input.value);
          console.log("store? btw store = value",value);
          dispatch(addMessage(input.value));
          socket.emit('chat message', input.value);
          input.value = '';
        }}
      >
        <input ref={node => 
          { input = node; }} 
        />
        <button type="submit">
          Send Message 
        </button>
      </form>
    </div>
  );
};

ChatForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { text: state.text }
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({addMessage},dispatch)
// };

export default connect(mapStateToProps)(ChatForm);
