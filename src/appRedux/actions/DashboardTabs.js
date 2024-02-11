import { ADD_TAB, ACTIVE_TAB_PANES, SET_ACTIVE_PANE, REMOVE_TAB, CLEAR_TABS } from "../../constants/ActionTypes";

export const addTab = (panes, title, content, activeKey) => {
  return {
    type: ADD_TAB,
    payload: { panes, title, content, activeKey },
  };
};

export const getTabs = (panes, activeKey) => {
  return {
    type: ACTIVE_TAB_PANES,
    payload: { panes, activeKey }
  }
}

export const setActivePane = (activeKey, nextKey) => {
  return {
    type: SET_ACTIVE_PANE,
    payload: { activeKey, nextKey }
  }
}

export const removeTab = (panes, removeKey, activeKey) => {
  return {
    type: REMOVE_TAB,
    payload: { panes, removeKey, activeKey }
  }
}

export const clearTabs = () => {
  return {
    type: CLEAR_TABS
  }
}