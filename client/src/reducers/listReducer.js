import { FETCHING_LIST, SENDING_LIST_BEGIN, SENDING_LIST_SUCCESS, FETCH_LIST, UNFETCHING_LIST } from '../actions/listaActions';
// import { STATES } from 'mongoose';
const initialState = {
  loading: true,
  loadingSend: false,
  list: [],
  error: false
}
export default function(state=initialState, action) {
  switch(action.type) {
    case FETCHING_LIST:
      return {...state, loading: true}
    case SENDING_LIST_BEGIN: 
      return {...state, loading: false, loadingSend: true}
      case SENDING_LIST_SUCCESS:
        return {...state, loading: false, loadingSend: false}
    case FETCH_LIST:
      return { ...state, list: action.payload, loading: false };
    case UNFETCHING_LIST:
      return { ...state, loading: false };
      default: 
      return { ...state}
  }
}