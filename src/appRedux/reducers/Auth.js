import {
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
  GOOGLE_CAPTCHA_TOKEN,
  REFRESH_GOOGLE_CAPTCHA_TOKEN,
  SEND_USERNAME_FOR_FORGOT_PWD,
  SHOW_CONFIRM_NEW_PWD_FORM,
  CLEAR_FORGET_PWD_USERNAME,
  MODAL_CONFIRM_LOADER
} from "../../constants/ActionTypes";

const INIT_STATE = {
  idToken: JSON.parse(localStorage.getItem("idToken")),
  refreshToken: null,
  initURL: "",
  authUser: null,
  googleCaptchaToken: "",
  refreshGoogleCaptchaToken: false,
  forgotPasswordUsername: null,
  showConfirmNewPasswordForm: false,
  modalConfirmLoader: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GOOGLE_CAPTCHA_TOKEN: {
      return { ...state, googleCaptchaToken: action.payload };
    }

    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        idToken: null,
        authUser: null,
        refreshToken: null,
        initURL: "",
        state:{}
      };
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        idToken: action.payload.idToken,
        refreshToken:action.payload.refreshToken
      };
    }

    case REFRESH_GOOGLE_CAPTCHA_TOKEN: {
      return {
        ...state,
        refreshGoogleCaptchaToken: action.payload
      }
    }

    case SEND_USERNAME_FOR_FORGOT_PWD: {
      return {
        ...state,
        forgotPasswordUsername: action.payload
      }
    }

    case SHOW_CONFIRM_NEW_PWD_FORM: {
      return {
        ...state,
        showConfirmNewPasswordForm: action.payload
      }
    }

    case CLEAR_FORGET_PWD_USERNAME: {
      return {
        ...state,
        forgotPasswordUsername: null
      }
    }

    case MODAL_CONFIRM_LOADER: {
      return {
        ...state,
        modalConfirmLoader: action.payload
      }
    }

    default:
      return state;
  }
};
