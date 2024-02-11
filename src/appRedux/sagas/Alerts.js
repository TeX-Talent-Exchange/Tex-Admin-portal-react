import { all, put, call, takeEvery } from "redux-saga/effects";
import { forwardTo } from "../../util/NavigationSaga";
import axios from "../../util/Api";
import {
    auditPostMiddleware,
    auditPutMiddleware,
    auditDeleteMiddleware,
  } from "../../util/auditLogger";
import { errorHandling } from "../../util/Helper"
import {FETCH_ALERTS, CREATE_ALERT, EDIT_ALERT, DELETE_ALERT, FETCH_ACTIVE_ALERTS} from "../../constants/ActionTypes"
import {fetchStart, fetchSuccess, showMessage, fetchedAlerts, fetchedActiveAlerts} from "../../appRedux/actions"

const createAlertApi = async ({ alertMessage, check, isActive, priority, rag, current_user }) => {
    try {
      return auditPostMiddleware(
        "alerts",
        current_user,
        { alertMessage, check, isActive, priority, rag },
        "Alert",
        "Create Alert",
        "Winlead - Create Alerts Page"
      );
    } catch (error) {
      return error;
    }
  };
  
  const fetchAlertsApi = async (current_user, active) => {
    try {
      // const ipAddress = await publicIp.v4();
      // const hostName = ipAddress.split(".")[0];
      const params = {
        userId: current_user,
        activity: "Alert",
        description: "Retrieve Alerts",
        page: "Winlead - Alerts Page",
        // ipAddress: ipAddress,
        // hostName: hostName,
      };
      if(active){
        return await axios.get("/alerts?active=true", { params });
      }else{
        return await axios.get("/alerts", { params });
      }
    } catch (error) {
      return Promise.reject(error)
    }
  };

  const updateAlertApi = async ({ id, alertMessage, check, isActive, priority, rag, current_user }) => {
    try {
      return auditPutMiddleware(
        `alerts/${id}`,
        current_user,
        { alertMessage, check, isActive, priority, rag },
        "Alert",
        "Alerts Component",
        "Winlead - Alerts Page"
      );
      //return await axios.put(`/components/${id}`, data);
    } catch (error) {
      return error;
    }
  };

  const deleteAlertApi = async (id, currentUser) => {
    try {
      return auditDeleteMiddleware(
        `alerts/${id}`,
        currentUser,
        // data,
        "Alert",
        "Alerts Component",
        "Winlead - Alerts Page"
      );
      //return await axios.put(`/components/${id}`, data);
    } catch (error) {
      return error;
    }
  };


  function* saveAlert({ payload }) {
    try {
      yield put(fetchStart());
      const alert = yield call(createAlertApi, {
        alertMessage: payload.alertMessage,
        check: payload.check,
        isActive: payload.isActive,
        priority: payload.priority,
        rag: payload.rag,
        current_user: payload.currentUser,
      });
      yield put(fetchSuccess());
      yield put(showMessage(alert.data.body.alert.body.message));
      yield call(forwardTo, "/winlead/alerts");
    } catch (error) {
      yield call(errorHandling, error)
    }
  }
  
  function* getAlertsList({ payload }) {
    try {
      const active = false
      yield put(fetchStart());
      const alerts = yield call(
        fetchAlertsApi,
        payload.authUser.username,
        active
      );
      yield put(fetchSuccess());
      yield put(fetchedAlerts(alerts.data.body.alerts));
    } catch (error) {
      yield call(errorHandling, error)
    }
  }

  function* alertUpdate({ payload }) {
    try {
      yield put(fetchStart());
      const alert = yield call(
        updateAlertApi,
        {
            id: payload.id,
            alertMessage: payload.alertMessage,
            check: payload.check,
            isActive: payload.isActive,
            priority: payload.priority,
            rag: payload.rag,
            current_user: payload.currentUser
        }
      );
      yield put(fetchSuccess());
      yield put(showMessage(alert.data.body.alert.body.message));
      yield call(forwardTo, "/winlead/alerts");
    } catch (error) {
      yield call(errorHandling, error)
    }
  }

  function* alertDelete({payload}){
    const { alertId, currentUser } = payload;
    try {
      yield put(fetchStart());
      const alert = yield call(
        deleteAlertApi,
        alertId,
        currentUser
      );
      yield put(fetchSuccess());
      yield put(showMessage(alert.data.body.alert.body.message));
      yield call(forwardTo, "/winlead/alerts");
    } catch (error) {
      yield call(errorHandling, error)
    }
  }

  function* getActiveAlerts({payload}) {
    try {
      yield put(fetchStart());
      const active = true
      const alerts = yield call(
        fetchAlertsApi,
        payload.authUser.username,
        active
      );
      yield put(fetchSuccess());
      yield put(fetchedActiveAlerts(alerts.data.body.alerts));
    } catch (error) {
      yield call(errorHandling, error)
    }
  }

  export function* createAlert() {
    yield takeEvery(CREATE_ALERT, saveAlert);
  }
  
  export function* fetchAlerts() {
    yield takeEvery(FETCH_ALERTS, getAlertsList);
  }

  export function* updateAlert() {
    yield takeEvery(EDIT_ALERT, alertUpdate);
  }

  export function* deleteAlert() {
    yield takeEvery(DELETE_ALERT, alertDelete);
  }

  export function* fetchActiveAlerts() {
    yield takeEvery(FETCH_ACTIVE_ALERTS, getActiveAlerts)
  }

  export default function* AlertSaga() {
    yield all([
      createAlert(),
      fetchAlerts(),
      updateAlert(),
      deleteAlert(),
      fetchActiveAlerts()
    ]);
  }