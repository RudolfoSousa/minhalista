import axios from 'axios';
import qs from 'qs';
import assert from 'assert';

export const FETCHING_LIST = 'fetching_list';
export const SENDING_LIST_BEGIN = 'sending_list_begin';
export const SENDING_LIST_SUCCESS = 'sending_list_success';
export const FETCH_LIST = 'fetch_list';
export const UNFETCHING_LIST = 'unfetching_list';

export const fecthinglist = () => ({
    type: FETCHING_LIST
});

export const sendinglist = () => ({
  type: SENDING_LIST_BEGIN
});

export const sendedlist = () => ({
  type: SENDING_LIST_SUCCESS
});

export const fetchlist = lista => ({
    type: FETCH_LIST,
    payload: { lista }
});

export const unfetchinglist = error => ({
    type: UNFETCHING_LIST,
    payload: { error}
});

const URL = 'http://localhost:8000';

export function getList(user) {
    return async dispatch => {
      dispatch(fecthinglist());
      return await axios.get(`${URL}/lista`, {headers:{
        'x-access-token': user,
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
        .then((response) => {
          var {data} = response;
          dispatch(fetchlist(data));
          return data;
          })
        .catch(error => dispatch(unfetchinglist(error)));
    };
  }

  export function sendList({listname, produtos}, user){
    return dispatch => {
      dispatch(sendinglist());
      var data = {
        listName: listname,
        products: produtos
      } 
      return axios.post(`${URL}/lista`, data, {headers:{
        'x-access-token': user,
        'Content-Type': 'application/json'
      }})
      .then((res) => {
        dispatch(sendedlist());
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
