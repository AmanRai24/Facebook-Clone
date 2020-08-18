import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    //this.emailInputRef = React.createRef();
    //this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log('Email', this.emailInputRef);
    //console.log('Password:', this.passwordInputRef);
    console.log('state', this.state);
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        <div className="field">
          <input 
            type="email" 
            placeholder="Email" 
            required 
            //ref={this.emailInputRef} 
            onChange={this.handleEmailChange}
            value={this.state.email}
            />
        </div>
        <div className="field">
          <input 
            type="password" 
            placeholder="Password" 
            required 
            //ref={this.passwordInputRef} 
            onChange={this.handlePasswordChange}
            value={this.state.password}
            />
        </div>
        <div className="field">
        <button onClick={this.handleFormSubmit}>Log In</button>
        </div>
      </form>
    );
  }
}