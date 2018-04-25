import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  get content() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/google" className="nav-item">Login With Google</a>
        );
      default:
        return (
          <a href="/api/logout" className="nav-item">Logout</a>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="header">
          <Link to={this.props.user ? '/games' : '/'} className="left brand-logo" className="nav-item logo">
            TerbleTop
          </Link>
          <div className="nav-right">
            {this.content}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);
