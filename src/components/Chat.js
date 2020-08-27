import React, { Component } from 'react';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // message format {content: 'some message', self: true}
      typedMessage: '',
    };
  }

  // method to add typed message to state
  handleInputChange = (e) => {
    this.setState({
      typedMessage: e.target.value,
    });
  };

  handleSubmit = () => {};
  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
            alt=""
            height={17}
          />
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Chat;
