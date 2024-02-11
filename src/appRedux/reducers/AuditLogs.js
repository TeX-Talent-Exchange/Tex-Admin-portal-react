import {
  FETCH_AUDIT_LOGS,
  FETCHED_AUDIT_LOGS,
  CLEAR_AUDIT_LOGS,
} from "../../constants/ActionTypes";

export default (
  state = {
    total: 0,
    audituser: "",
    auditLogData: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_AUDIT_LOGS: {
      return {
        ...state,
        audituser: action.payload.current_user
      };
    }
    case FETCHED_AUDIT_LOGS: {
      return {
        ...state,
        auditLogData: { object: action.payload.payload },
        total: action.payload.total
      };
    }
    case CLEAR_AUDIT_LOGS: {
      return {
        ...state,
        audituser: "",
        auditLogData: {}
      }
    }
    default:
      return state;
  }
}