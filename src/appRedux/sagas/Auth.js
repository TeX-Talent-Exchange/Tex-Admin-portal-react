import { all, call, put, takeEvery } from "redux-saga/effects";
import { forwardTo } from "../../util/NavigationSaga";
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  CHANGE_PWD,
  USER_DATA,
  USER_TOKEN_SET,
  SEND_USERNAME_FOR_FORGOT_PWD,
  RESET_USER_PWD,
  ADMIN_CHANGE_USER_PASSWORD,
} from "../../constants/ActionTypes";
import {
  userSignOutSuccess,
  refreshGoogleCaptchaToken,
  showConfirmNewPasswordForm,
  clearForgetPasswordUsername,
  showModalConfirmLoader,
} from "../../appRedux/actions/Auth";
import { showMessage } from "../../appRedux/actions";
import { errorHandling } from "../../util/Helper";
// yield call(errorHandling, error)

import { fetchStart, fetchSuccess } from "../../appRedux/actions/Common";
import { encrypt, decryptLoginResponse } from "../../util/PasswordEncryption";
import { auditPostMiddleware } from "../../util/auditLogger";

const signInUserWithUsernamePasswordRequest = async (
  username,
  password,
  token
) => {
  try {
    return auditPostMiddleware(
      "auth/login",
      { authUser: { username: username } },
      { username, password, token },
      "Login",
      `Login: ${username}`,
      "Customer Information Page"
    );
    // return await auditPostMiddleware("/auth/login",{username,password,token},"login","login:","login page")
    //return await axios.post("/auth/login", { username, password, token });
  } catch (error) {
    console.error(error);
  }
};

const changeUserPassword = async (username, password, newPassword, token) => {
  try {
    return auditPostMiddleware(
      "auth/changePassword",
      { authUser: { username: username } },
      {
        username,
        password,
        newPassword,
        token,
      },
      "Reset Password",
      `Reset Password User ID:${username}`,
      "Customer Information Page"
    );
    // return await axios.post("/auth/changePassword", {
    //   username,
    //   password,
    //   newPassword,
    //   token,
    // });
  } catch (error) {
    console.error(error);
  }
};

const signOutRequest = async (current_user) => {
  try {
    return auditPostMiddleware(
      "auth/signout",
      current_user,
      {},
      "Logout",
      `Logout: ${current_user.authUser.username}`,
      "Customer Information Page"
    );
    // return auditPostMiddleware(
    //   "auth/signout",
    //   current_user,
    //   {},
    //   "Logout",
    //   "Logout:",
    //   "Customer Information Page"
    // );
    //return await axios.post("/auth/signout")
  } catch (error) {
    console.error(error);
  }
};

const forgotPasswordRequest = async (username) => {
  try {
    return auditPostMiddleware(
      "auth/forgotPassword",
      { authUser: { username: username } },
      { username },
      "Forgot Password",
      `Forgot Password User ID:${username}`,
      "Forgot Password Page"
    );
  } catch (error) {
    console.error(error);
  }
};

const resetUserPasswordRequest = async (
  username,
  confirmationCode,
  password
) => {
  try {
    return auditPostMiddleware(
      "auth/confirmForgotPassword",
      { authUser: { username: username } },
      { username, confirmationCode, password },
      "Confirm Forgot Password",
      `Confirm Forgot Password User ID:${username}`,
      "Confirm Forgot Password Page"
    );
  } catch (error) {
    console.error(error);
  }
};

const adminChangeUserPasswordRequest = async (username, password) => {
  try {
    return auditPostMiddleware(
      "auth/adminResetPassword",
      { authUser: { username: username } },
      { username, password },
      "Admin Change User Password",
      `Admin Change Password for User ID:${username}`,
      "Admin Change User Password from User List Page"
    );
  } catch (error) {
    console.error(error);
  }
};

function* signInUser({ payload }) {
  const { username, password, token } = payload;
  try {
    const encryptedPassword = encrypt(password);
    yield put(fetchStart());
    const user = yield call(
      signInUserWithUsernamePasswordRequest,
      username,
      encryptedPassword,
      token
    );    
    yield put(fetchSuccess());
    if (user.data.body.passwordChangeRequired) {
      yield put(refreshGoogleCaptchaToken(true));
      yield call(forwardTo, "/resetPassword", username);
    } else {
      const decryptedResponse = decryptLoginResponse(user.data.body);
      yield put({ type: USER_DATA, payload: decryptedResponse.user });
      yield put({
        type: USER_TOKEN_SET,
        payload: {
          idToken: decryptedResponse.idToken,
          refreshToken: decryptedResponse.refreshToken,
        },
      });
      yield call(forwardTo, "/");
    }
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* passwordChange({ payload }) {
  const { username, password, newPassword, token } = payload;
  try {
    const encryptedPassword = encrypt(password);
    const encryptedNewPassword = encrypt(newPassword);
    yield put(fetchStart());
    const user = yield call(
      changeUserPassword,
      username,
      encryptedPassword,
      encryptedNewPassword,
      token
    );
    yield put(fetchSuccess());
    yield put(refreshGoogleCaptchaToken(true));
    yield put(showMessage(user.data.body.message));
    yield call(forwardTo, "/");
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* signOutUser({ payload }) {
  try {
    yield put(fetchStart());
    yield call(signOutRequest, payload);
    yield put(fetchSuccess());
    yield put(refreshGoogleCaptchaToken(true));
    yield call(forwardTo, "/login");
    yield put(userSignOutSuccess());
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* userForgotPassword({ payload }) {
  try {
    yield put(fetchStart());
    const response = yield call(forgotPasswordRequest, payload);
    yield put(fetchSuccess());
    yield put(showMessage(response.data.body.message));
    yield put(showConfirmNewPasswordForm(true));
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* resetUserPassword({ payload }) {
  const { username, confirmationCode, password } = payload;
  try {
    const encryptedPassword = encrypt(password);
    yield put(fetchStart());
    const response = yield call(
      resetUserPasswordRequest,
      username,
      confirmationCode,
      encryptedPassword
    );
    yield put(fetchSuccess());
    yield put(showConfirmNewPasswordForm(false));
    yield put(clearForgetPasswordUsername());
    yield put(showMessage(response.data.body.message));
    yield call(forwardTo, "/login");
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* adminChangePassword({ payload }) {
  const { username, password } = payload;
  try {
    const encryptedPassword = encrypt(password);
    const response = yield call(
      adminChangeUserPasswordRequest,
      username,
      encryptedPassword
    );
    yield put(showModalConfirmLoader(false));
    yield put(showMessage(response.data.body.message));
  } catch (error) {
    yield put(showModalConfirmLoader(false));
    yield call(errorHandling, error);
  }
}

export function* login() {
  yield takeEvery(SIGNIN_USER, signInUser);
}

export function* changePassword() {
  yield takeEvery(CHANGE_PWD, passwordChange);
}

export function* signOut() {
  yield takeEvery(SIGNOUT_USER, signOutUser);
}

export function* forgotPassword() {
  yield takeEvery(SEND_USERNAME_FOR_FORGOT_PWD, userForgotPassword);
}

export function* resetPassword() {
  yield takeEvery(RESET_USER_PWD, resetUserPassword);
}

export function* adminChangeUserPassword() {
  yield takeEvery(ADMIN_CHANGE_USER_PASSWORD, adminChangePassword);
}


export default function* rootSaga() {
  yield all([
    login(),
    changePassword(),
    signOut(),
    forgotPassword(),
    resetPassword(),
    adminChangeUserPassword(),
  ]);
}
