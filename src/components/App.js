import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostsList,NavBar } from './';

const Home = () => <div>Home</div>;

const LogIn = () => <div>LogIn</div>;

const LogOut = () => <div>LogOut</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    //console.log('PROPS', this.props);
    const { posts } = this.props;
    return (
      <Router>
      <div>
        <NavBar />
        {/* <PostsList posts={posts} /> */}

        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
          <li>
            <Link to="/logout">LogOut</Link>
          </li>
        </ul>

        <Route exact path="/" component={Home} />
        <Route path="/login" component={LogIn} />
        <Route path="/logout" component={LogOut} />
      </div>
    </Router>
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
