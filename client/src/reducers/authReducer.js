import { AUTHENTICATING, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from '../actions/authActions';
export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATING:
      return {...state, authenticated: false, loading: true}
    case AUTHENTICATED:
      return { ...state, authenticated: true, loading: false };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false, loading: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload, loading: false };
      default: 
      return { ...state}
  }
}