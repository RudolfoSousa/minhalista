import axios from 'axios';
// import qs from 'qs';

export const FETCHING_LIST = 'fetching_list';
export const FETCH_LIST = 'fetch_list';
export const UNFETCHING_LIST = 'unfetching_list';

export const fecthinglist = () => ({
    type: FETCHING_LIST
});

export const fetchlist = lista => ({
    type: FETCH_LIST,
    payload: { lista }
});

export const unfetchinglist = error => ({
    type: UNFETCHING_LIST,
    payload: { error}
});

const URL = 'http://localhost:5000';

export function getList(user) {
    return dispatch => {
      dispatch(fecthinglist());
      return axios.get(`${URL}/lista`, {headers:{
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

// export function getList(user){
    // axios.get(`${URL}/lista`, {
    //     headers: {
    //         'x-access-token': user,
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // })
    // .then((res) => {
    //     console.log(res.data);
    //     fetchlist(res.data);
    // })
    // .catch((err) => {
    //     console.log(err)
    // })
    // return(dispatch) => {
    //     dispatch({type: FETCHING_LIST});
    //     console.log(user)
    //     // axios.get(`${URL}/lista`, {
    //     //     headers: {
    //     //         'x-access-token': user,
    //     //         'Content-Type': 'application/x-www-form-urlencoded'
    //     //     }
    //     // })
    //     // .then((res) => {
    //     //     console.log(user)
    //     //     console.log(res);
    //     // })
    //     // .catch((err) => {
    //     //     console.log(err)
    //     // })
    // }
// }

// export function getList(user) {

//   return (dispatch) => {
//     dispatch({ type: FETCHING_LIST });
//     console.log('sm');
//     try {
//       axios.post(`${URL}/lista`,{headers: {
//         'x-access-token': user,
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }})
//         .then((res) => {
//           dispatch({ type: FETCH_LIST });
//           console.log(res)
//         })
//     } catch(error) {
//       console.log(error)
//       dispatch({
//         type: UNFETCHING_LIST,
//         payload: 'Invalid email or password'
//       });
//     }
//   };
// };
