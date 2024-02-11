import { put, call, takeEvery } from "redux-saga/effects";
import { FETCH_AUDIT_LOGS } from "../../constants/ActionTypes";
import { fetchStart, fetchSuccess } from "../../appRedux/actions";
import { fetchedAuditLogs } from "../../appRedux/actions/AuditLogs";
import { auditPostMiddleware } from "../../util/auditLogger";
import { errorHandling } from "../../util/Helper";

const callAuditLogApi = async ({
  current_user,
  pagination,
  limit,
  offset,
  username,
  startDate,
  endDate,
}) => {
  try {
    let body = {
      userId: current_user.authUser.username,
      pagination: pagination,
      limit: limit,
      offset: offset,
      username: username,
    };
    body = startDate && endDate ? { ...body, startDate, endDate } : body;
    return auditPostMiddleware(
      "auditlogs",
      current_user,
      body,
      "Audit Logs",
      `Audit Log Data For: ${current_user.authUser.username}`,
      "Audit Logs Page"
    );
  } catch (error) {
    return error;
  }
};

function* auditLogFetch({ payload }) {
  try {
    const {
      current_user,
      pagination,
      limit,
      offset,
      username,
      startDate,
      endDate,
    } = payload;
    yield put(fetchStart());
    const data = yield call(callAuditLogApi, {
      current_user,
      pagination,
      limit,
      offset,
      username,
      startDate,
      endDate,
    });
    yield put(fetchedAuditLogs(data.data.body, data.data.total));
    yield put(fetchSuccess());
  } catch (error) {
    yield call(errorHandling, error)
  }
}

export default function* AuditLogSaga() {
  yield takeEvery(FETCH_AUDIT_LOGS, auditLogFetch);
}
