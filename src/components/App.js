import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,
   Route, 
   Switch ,
   Redirect,
  } from 'react-router-dom';

import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import { 
  Home, 
  NavBar, 
  Page404,
  LogIn, 
  SignUp,
  Settings,
  UserProfile,
} from './'

import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

//const LogOut = () => <div>LogOut</div>;
//const settings = () => <div>Setting</div>;
const PrivateRoute = (privateRoutProps) => {
  const { isLoggedin, path, component: Component } = privateRoutProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);

      //console.log('user', user);
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
    const { posts, auth } = this.props;
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
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
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
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};


export default connect(mapStoreToProps)(App);
