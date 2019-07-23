import React, { Component } from 'react';
import { signOutAction } from '../actions/authActions';
import { connect } from 'react-redux';

import Lista from "./Lista";

class Dashboard extends Component {
  click = (values) => {
    this.props.signOutAction(this.props.history);
  }
  

  render() {
    return (
      <div>
          <p>Dash</p>
          <Lista />
        <button onClick={(this.click)}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, {signOutAction})(Dashboard);

