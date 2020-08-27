import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // message format {content: 'some message', self: true}
      typedMessage: '',
      showChat: false,
    };
    this.socket = io.connect('http://54.237.158.65:5000');
    this.userEmail = props.user.email;
    //console.log('PROPSSSS', props);

    if (this.userEmail) {
      this.setUpConnection();
    }
  }

  // setting up connection with socket
  setUpConnection = () => {
    // first store this property
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('CONNECTION ESTABLISHED');

      // emit use to create an ACTION
      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      // add messgae to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      // settig self to aling the message properly
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      // saving all msg to state
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };

  // method to add typed message to state
  handleInputChange = (e) => {
    this.setState({
      typedMessage: e.target.value,
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  handlecatbox = () => {
    var chat = this.state.showChat;
    {
        chat = chat ? false : true;
    }
    this.setState({
      showChat: chat,
    });
  };

    render() {
    const { typedMessage, messages, showChat } = this.state;
    console.log('chat:', this.state.showChat);
    return showChat ? (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://image.flaticon.com/icons/svg/659/659892.svg"
            alt=""
            height={17}
            onClick={this.handlecatbox}
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
      ) : (
        <div className="chat-container">
          <div className="chat-header collapse">
            Chat
            <img
              src="https://image.flaticon.com/icons/svg/992/992651.svg"
              alt=""
              height={20}
              onClick={this.handlecatbox}
            />
          </div>
        </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
