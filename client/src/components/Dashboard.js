import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Col } from 'react-bootstrap';

import Lista from "./Lista";

class Dashboard extends Component {

  render() {
    return (
      <div>
        <Container>
          <Col>
            <Lista />
          </Col>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps,)(Dashboard);

