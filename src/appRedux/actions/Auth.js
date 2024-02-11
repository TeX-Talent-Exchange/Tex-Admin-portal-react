import {
  // FETCH_ERROR,
  // FETCH_START,
  // FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  // USER_DATA,
  // USER_TOKEN_SET,
  SIGNIN_USER,
  GOOGLE_CAPTCHA_TOKEN,
  CHANGE_PWD,
  SIGNOUT_USER,
  REFRESH_GOOGLE_CAPTCHA_TOKEN,
  SEND_USERNAME_FOR_FORGOT_PWD,
  SHOW_CONFIRM_NEW_PWD_FORM,
  RESET_USER_PWD,
  CLEAR_FORGET_PWD_USERNAME,
  ADMIN_CHANGE_USER_PASSWORD,
  MODAL_CONFIRM_LOADER
} from "../../constants/ActionTypes";
// import axios from 'util/Api'

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const saveGoogleCaptchaToken = (googleCaptchaToken) => {
  return {
    type: GOOGLE_CAPTCHA_TOKEN,
    payload: googleCaptchaToken
  }
}

export const userSignIn = ({username, password, token}) => {
  return {
    type: SIGNIN_USER,
    payload: {username, password, token}
  }
};

export const changePassword = ({username, password, newPassword, token}) => {
  return {
    type: CHANGE_PWD,
    payload: {username, password, newPassword, token}
  }
}

export const userSignout = (currentUser) => {
  return {
    type: SIGNOUT_USER,
    payload: currentUser
  }
}

export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS
  }
}

export const refreshGoogleCaptchaToken = (value) => {
  return {
    type: REFRESH_GOOGLE_CAPTCHA_TOKEN,
    payload: value
  }
}

export const sendUserNameForForgotPassword = (username) => {
  return {
    type: SEND_USERNAME_FOR_FORGOT_PWD,
    payload: username
  }
}

export const showConfirmNewPasswordForm = (show) => {
  return {
    type: SHOW_CONFIRM_NEW_PWD_FORM,
    payload: show
  }
}

export const resetUserPassword = (username, confirmationCode, password) => {
  return {
    type: RESET_USER_PWD,
    payload: { username, confirmationCode, password }
  }
}

export const clearForgetPasswordUsername = () => {
  return {
    type: CLEAR_FORGET_PWD_USERNAME
  }
}

export const adminChangeUserPassword = (username, password) => {
  return {
    type: ADMIN_CHANGE_USER_PASSWORD,
    payload: { username, password }
  }
}

export const showModalConfirmLoader = (show) => {
  return {
    type: MODAL_CONFIRM_LOADER,
    payload: show
  }
}