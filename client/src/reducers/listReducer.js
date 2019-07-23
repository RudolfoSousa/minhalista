import { FETCHING_LIST, FETCH_LIST, UNFETCHING_LIST } from '../actions/listaActions';
const initialState = {
  loading: true,
  list: [],
  error: false
}
export default function(state=initialState, action) {
  switch(action.type) {
    case FETCHING_LIST:
      return {...state, loading: true}
    case FETCH_LIST:
      return { ...state, list: action.payload, loading: false };
    case UNFETCHING_LIST:
      return { ...state, loading: false };
      default: 
      return { ...state}
  }
}