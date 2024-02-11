import {
  ACTIVE_TAB_PANES,
  CLEAR_TABS,
  SET_ACTIVE_PANE,
} from "../../constants/ActionTypes";

const initialState = {
  panes: [],
  activeKey: { current: "", next: 1 },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_TAB_PANES: {
      return {
        ...state,
        panes: action.payload.panes,
        activeKey: action.payload.activeKey,
      };
    }
    case SET_ACTIVE_PANE: {
      return {
        ...state,
        activeKey: {
          current: action.payload.activeKey,
          next: action.payload.nextKey,
        },
      };
    }
    case CLEAR_TABS: {
      return {
        ...state,
        panes: [],
        activeKey: { current: "", next: 1 },
      };
    }
    default:
      return state;
  }
};
