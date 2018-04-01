// Rendering Layer control (e.g. React Router)

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/games" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      fetchUser,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(App);
