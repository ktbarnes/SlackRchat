import React from 'react';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  // handleInputChange(e) {
  //   // this.props.handleSearchInputChange(e.target.value);
  //   // this.setState({
  //   //   value: e.target.value
  //   // });
  // }

  render() {
    return (
      <div>
        <form action="">
          <input 
            id="m" 
            autoComplete="off" 
            type="text"
            value={this.state.value}
            // onChange={this.handleInputChange.bind(this)}
          />

          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default ChatForm