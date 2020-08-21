import { 
    LOGIN_START, 
    LOGIN_FAILED, 
    LOGIN_SUCCESS,
    AUTHENTICATE_USER,
    LOG_OUT,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    CLEAR_AUTH_STATE,
    EDIT_USER_FAILED,
    EDIT_USER_SUCCESSFUL,
  } from './actionTypes';

import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';

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
        localStorage.setItem('token', data.data.token);
        dispatch(loginSuccess(data.data.user));
        return;
      }
      dispatch(loginFailed(data.message));
    });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

//---- signup
export function signup(email, password, confirmPassword, name) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({
        email,
        password,
        confirm_password: confirmPassword,
        name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccessful(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccessful(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}

export function editUserFailer(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Profile data', data);
        if (data.success) {
          dispatch(editUserSuccessful(data.data.user));

          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailer(data.message));
      });
  };
}