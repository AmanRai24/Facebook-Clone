import React, { Component } from 'react';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  //method to add post on click
  handleOnClick = () => {};

  //method to keep adding the content of post in state
  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  //render start
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <div>
          <button id="add-post-btn" onClick={this.handleOnClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default CreatePost;