import { put, takeEvery } from "redux-saga/effects";
import { getTabs } from "../../appRedux/actions/DashboardTabs";
import { ADD_TAB, REMOVE_TAB } from "../../constants/ActionTypes";

function* addTab({ payload }) {
  try {
    let a;
    const p = payload.panes;
    const panePresent = p.findIndex(item => item.title === payload.title);
    const key = payload.activeKey.next;
    if (panePresent === -1) {
      a = { current: `newTab${key}`, next: key + 1 };
      const newPane = {
        title: payload.title,
        content: payload.content,
        key: a.current
      };
      p.push(newPane);
    }
    else {
      a = { current: p[panePresent].key, next: key };
    }
    yield put(getTabs(p, a));
  } catch (error) {
    return error
  }
}

function* removeTab({ payload }) {
  try {
    let panes = payload.panes;
    let activeIndex = panes.findIndex(item => item.key === payload.activeKey.current);
    const lastIndex = panes.findIndex(item => item.key === payload.removeKey);
    let newActiveIndex = (activeIndex === lastIndex)
      ? panes[lastIndex + 1]
        ? panes[lastIndex + 1].key
        : (lastIndex - 1) >= 0
          ? panes[(lastIndex - 1)].key
          : ""
      : panes[activeIndex].key
    panes = panes.filter(item => item.key !== payload.removeKey);
    const activeKey = { current: newActiveIndex, next: payload.activeKey.next }
    yield put(getTabs(panes, activeKey));
  }
  catch (error) {
    return error
  }
}

export default function* DashboardTabsSaga() {
  yield takeEvery(ADD_TAB, addTab);
  yield takeEvery(REMOVE_TAB, removeTab);
}