import { FETCHED_ALLTAGS, } from "../../constants/ActionTypes"
const INIT_STATE = {
    alltags: []
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCHED_ALLTAGS:
            return {
                ...state,
                alltags: action.payload
            }
        default:
            return state
    }
}