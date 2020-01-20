import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions/authActions';
import { connect } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';

class Login extends Component {
  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }

  render() {
    console.log(this.props.auth)
    const {loading} = this.props.auth;
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <Container>
          <h2>Sign In</h2>
          <Form onSubmit={ handleSubmit(this.submit) }>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Field name="username"
                  component="input"
                  type="text"
                  placeholder="User" 
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Field name="password" 
                  component="input"
                  type="password" 
                  placeholder="Password" 
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            { loading ? <p>Loading...</p> : ""}
          </Form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { auth: state.auth};
  }
  const reduxFormSignin = reduxForm({
    form: 'signin'
  })(Login);
  export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
