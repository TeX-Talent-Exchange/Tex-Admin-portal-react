import {history} from "../appRedux/store"

export const forwardTo = (location, data = null) => {
    // history.push(location)
    history.push({pathname: location, data})
}