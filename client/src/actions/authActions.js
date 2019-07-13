import axios from 'axios';
import qs from 'qs';

export const AUTHENTICATED = 'authenticated_user';
export const AUTHENTICATING = 'authenticating_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const URL = 'http://localhost:5000';

export function signInAction({ username, password }, history) {

  return async (dispatch) => {
    dispatch({ type: AUTHENTICATING });
    try {
      axios.post(`${URL}/login`, qs.stringify({username: username, password: password}),{headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }})
        .then((res) => {
          dispatch({ type: AUTHENTICATED });
          localStorage.setItem('user', res.data.token);
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

export function signOutAction(history) {
  localStorage.clear();
  history.push('/login');
  return {
    type: UNAUTHENTICATED
  };
};