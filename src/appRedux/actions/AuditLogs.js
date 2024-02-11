import {
  FETCH_AUDIT_LOGS,
  FETCHED_AUDIT_LOGS,
  CLEAR_AUDIT_LOGS,
} from "../../constants/ActionTypes";

export const getAuditLogs = (
  current_user,
  pagination = 0,
  limit = 10,
  offset = 0,
  username,
  startDate = null,
  endDate = null
) => {
  return {
    type: FETCH_AUDIT_LOGS,
    payload: {
      current_user,
      pagination,
      limit,
      offset,
      username,
      startDate,
      endDate,
    },
  };
};

export const fetchedAuditLogs = (payload, total) => {
  return {
    type: FETCHED_AUDIT_LOGS,
    payload: { payload, total },
  };
};

export const clearAuditLogs = () => {
  return {
    type: CLEAR_AUDIT_LOGS,
  };
};
