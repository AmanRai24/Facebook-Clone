import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, NavBar, Page404, LogIn, SignUp } from './';

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
        <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={LogIn} />
            <Route path="/logout" component={LogOut} />
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
