import React from 'react';

import {connect} from 'react-redux';
import { fetchPosts } from '../action/posts';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('PROPS', this.props);
    return <div>App</div>;
  }
}

function mapStoreToProps(state) {
  return {
    posts: state.posts,
  };
}
export default connect(mapStoreToProps)(App);
