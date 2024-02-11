import { EDIT_ALLTAGS, FETCHED_ALLTAGS, FETCH_ALLTAGS, CREATE_TAG, EDIT_TAG } from "../../constants/ActionTypes"
export const fetchAlltags = (currentUser) => {
    return {
        type: FETCH_ALLTAGS,
        payload: currentUser
    }
}
export const fetchedAlltags = (alltags) => {
    return {
        type: FETCHED_ALLTAGS,
        payload: alltags
    }
}

export const editAlltags = (payload, currentUser) => {
    return {
        type: EDIT_ALLTAGS,
        payload: payload,
        currentUser
    }
}
export const createTag = (tagname) => {
    return {
        type: CREATE_TAG,
        payload: { tagname }
    }
}
export const editTag = (payload, currentUser) => {
    return {
        type: EDIT_TAG,
        payload: payload,
        currentUser
    }
}
