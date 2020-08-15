import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostsList } from './';
import { NavBar } from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    //console.log('PROPS', this.props);
    const { posts } = this.props;
    return (
    <div>
      <NavBar />
      <PostsList posts={posts} />
    </div>
    );
  }
}

function mapStoreToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};


export default connect(mapStoreToProps)(App);
