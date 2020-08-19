import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, clearAuthState } from '../actions/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    //this.emailInputRef = React.createRef();
    //this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
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
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    if (isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        {error && <div className="alert error-dailog">{error}</div>}
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
        {/* <button onClick={this.handleFormSubmit}>Log In</button> */}
        {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);