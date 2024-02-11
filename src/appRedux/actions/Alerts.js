import { CREATE_ALERT, FETCH_ALERTS, FETCHED_ALERTS, EDIT_ALERT, DELETE_ALERT, FETCH_ACTIVE_ALERTS, FETCHED_ACTIVE_ALERTS, SHOW_ALERTS_POPUP } from "../../constants/ActionTypes"

export const createAlert = ({ alertMessage, check, isActive, priority, rag, currentUser }) => {
    return {
        type: CREATE_ALERT,
        payload: { alertMessage, check, isActive, priority, rag, currentUser }
    }
}

export const fetchAlerts = (currentUser) => {
    return {
        type: FETCH_ALERTS,
        payload: currentUser
    }
}

export const fetchedAlerts = (alerts) => {
    return {
        type: FETCHED_ALERTS,
        payload: alerts
    }
}

export const editAlert = (id, { alertMessage, check, isActive, priority, rag, currentUser }) => {
    return {
        type: EDIT_ALERT,
        payload: { id, alertMessage, check, isActive, priority, rag, currentUser }
    }
}

export const deleteAlert = (alertId, currentUser) => {
    return {
        type: DELETE_ALERT,
        payload: { alertId, currentUser }
    }
}

export const fetchActiveAlerts = (currentUser) => {
    return {
        type: FETCH_ACTIVE_ALERTS,
        payload: currentUser
    }
}

export const fetchedActiveAlerts = (alerts) => {
    return {
        type: FETCHED_ACTIVE_ALERTS,
        payload: alerts
    }
}

export const showAlertPopup = (val) => {
    return {
        type: SHOW_ALERTS_POPUP,
        payload: val
    }
}