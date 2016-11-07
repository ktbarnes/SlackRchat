import React from 'react';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    this.props.handleSearchInputChange(this.state.value);
    alert('Text field value is: ' + this.state.value);
  }

  render() {
    return (
      <div>
        <form action="">
          <input 
            id="m" 
            type="text"
            value={this.state.value}
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

export default ChatForm