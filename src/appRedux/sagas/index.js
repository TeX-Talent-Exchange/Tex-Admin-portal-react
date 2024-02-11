import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import AuthorizationSaga from "./Authorization";
import DashboardTabsSaga from "./DashboardTabs";
import AvidtagSaga from "./AvidTag"
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    AuthorizationSaga(),
    DashboardTabsSaga(),
    AvidtagSaga(),
  ]);
}
