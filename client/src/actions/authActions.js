import axios from 'axios';
import qs from 'qs';

export const AUTHENTICATED = 'authenticated_user';
export const AUTHENTICATING = 'authenticating_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const headers = {headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
}}

const URL = 'http://localhost:8000';

export function signInAction({ username, password }, history) {

  return async (dispatch) => {
    dispatch({ type: AUTHENTICATING });
    try {
      axios.post(`${URL}/login`, qs.parse({username: username, password: password}, headers))
        .then((res) => {
          dispatch({ type: AUTHENTICATED });
          localStorage.setItem('user', res.data.token);
          localStorage.setItem('name', res.data.name);
          history.push('/dashboard');
        })
    } catch(error) {
      console.log(error)
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
};

export function signUpAction({username, password, password_confirm, name}, history){
  return async (dispatch) => {
    if(password === password_confirm){
      dispatch({ type: AUTHENTICATING });
      axios.post(`${URL}/cadastre`, qs.stringify({username: username, password: password, name: name, role: false}),{headres: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then((res) => {
        dispatch({ type: AUTHENTICATED });
        localStorage.setItem('user', res.data.token);
        history.push('/dashboard');
      })
      .catch((err) => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      })
    }else{
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Passwords is not equals'
      });
    }
  }
}

export function signOutAction() {
  localStorage.clear();
  // history.push('/login');
  window.location.href = "/login";
  return {
    type: UNAUTHENTICATED
  };
};