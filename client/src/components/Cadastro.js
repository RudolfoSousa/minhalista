import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpAction } from '../actions/authActions';
import { connect } from 'react-redux';

import { Button, Container, Form } from 'react-bootstrap';

class Cadastro extends Component {
  submit = (values) => {
    this.props.signUpAction(values, this.props.history);
  }

  render() {
    console.log(this.props.auth)
    const {loading} = this.props.auth;
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <Container>
          <h2>Sign Up</h2>
          <Form onSubmit={ handleSubmit(this.submit) }>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
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

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Field name="password_confirm" 
                  component="input"
                  type="password" 
                  placeholder="Confirm Password" 
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>First Name</Form.Label>
                <Field name="name" 
                  component="input"
                  type="text" 
                  placeholder="Name" 
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
    form: 'signup'
  })(Cadastro);
  export default connect(mapStateToProps, {signUpAction})(reduxFormSignin);
