import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types';
import axios from 'axios';

export const signUpUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/register', userData)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      history.push('/signIn'); //redirecting to index page after signIn success
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/authenticate', userData)
    .then((res) => {
      const token = `Bearer ${res.data.jwtToken}`;
      localStorage.setItem('token', `Bearer ${res.data.jwtToken}`); //setting token to local storage
      axios.defaults.headers.common['Authorization'] = token; //setting authorize token to header in axios
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log('success');
      history.push('/'); //redirecting to index page after signIn success
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
//for fetching authenticated user information
export const getUserData = () => (dispatch: any) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/data/secured')
    .then((res) => {
      console.log('user data', res.data);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED
  });
  window.location.href = '/signIn'; //redirect to login page
};
