import { FETCHED_ALERTS, FETCHED_ACTIVE_ALERTS, SHOW_ALERTS_POPUP } from "../../constants/ActionTypes"

const INIT_STATE = {
    activeAlerts: [],
    alerts: [],
    showPopup: false
}

export default (state = INIT_STATE, action) => {
    switch(action.type) {
        case FETCHED_ALERTS:
            return { ...state, alerts: action.payload }
        case FETCHED_ACTIVE_ALERTS:
            return { ...state, activeAlerts: action.payload }
        case SHOW_ALERTS_POPUP:
            return {...state, showPopup: action.payload}
        default:
            return state
    }
}