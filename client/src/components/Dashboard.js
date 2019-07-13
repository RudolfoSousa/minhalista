import React, { Component } from 'react';
import { signOutAction } from '../actions/authActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
  click = (values) => {
    this.props.signOutAction(this.props.history);
  }
  

  render() {
    return (
      <div>
          <p>Dash</p>
        <button onClick={(this.click)}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, {signOutAction})(Dashboard);

