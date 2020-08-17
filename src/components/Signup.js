import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <form className="login-form">
          <span className="login-signup-header">SignUp</span>
          <div className="field">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="field">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="field">
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <div className="field">
            <button>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}