import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, NavBar, Page404, LogIn, SignUp } from './';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

//const LogOut = () => <div>LogOut</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    //console.log('PROPS', this.props);
    const { posts } = this.props;
    return (
      <Router>
      <div>
        <NavBar />
        <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={LogIn} />
            {/* <Route path="/logout" component={LogOut} /> */}
            <Route path="/signup" component={SignUp} />
            <Route component={Page404} />
          </Switch>
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
