import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions/authActions';
import { connect } from 'react-redux';

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
        <div className="container">
          <h2>Sign In</h2>
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="username"
                  component="input"
                  type="text"
                  placeholder="User" 
            />
            <Field name="password" 
                  component="input"
                  type="password" 
                  placeholder="Password" 
            />
            <button type="submit" className="blue">Sign In</button>
            { loading ? <p>Loading...</p> : ""}
          </form>
        </div>
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
