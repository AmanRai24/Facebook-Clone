import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
    return {
      type: LOGIN_FAILED,
      error: errorMessage,
    };
  }
  
  export function loginSuccess(user) {
    return {
      type: LOGIN_SUCCESS,
      user,
    };
  }

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        // we use heder body coz our API require this info
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('login data', data);
      if (data.success) {
        //TODO-dispatch acction to save user
        dispatch(loginSuccess(data.data.user));
        return;
      }
      dispatch(loginFailed(data.message));
    });
  };
}