// Rendering Layer control (e.g. React Router)
import '../stylesheets/index.css'

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';

import { fetchUser } from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            {!isFetching && <Route exact path="/" component={Landing} />}
            {!isFetching && <Route exact path="/games" component={Dashboard} />}
          </div>
        </BrowserRouter>
        {isFetching && <div className="loading-container">
            <RingLoader
              color={'#41D6B7'}
              size={200}
              loading={isFetching}
              />
        </div>}
      </div>
    );
  }
}

const overlayStyle = {
  height: "100%",
  width: "100%",
  marginHorizontal: "auto",
  marginVertical: "auto"
};

const mapStateToProps = ({ isFetching }) => {
  return { isFetching };
};

export const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    { fetchUser },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
