import React from 'react';
import {connect} from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostsList } from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    //console.log('PROPS', this.props);
    const { posts } = this.props;
    return (
    <div>
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
export default connect(mapStoreToProps)(App);
