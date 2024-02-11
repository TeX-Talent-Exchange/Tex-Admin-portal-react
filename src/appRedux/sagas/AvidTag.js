import { all, put, call, takeEvery } from "redux-saga/effects";
import { CREATE_TAG, FETCH_ALLTAGS, EDIT_TAG } from "../../constants/ActionTypes";
import { forwardTo } from "../../util/NavigationSaga";
import axios from "../../util/Api";
import {
    fetchStart,
    fetchSuccess,
    showMessage,
    fetchError
} from "../../appRedux/actions";

import { errorHandling } from "../../util/Helper"
import { fetchedAlltags } from "../actions/AvidTag";
import {
    auditPostMiddleware, auditPutMiddleware
} from "../../util/auditLogger";
const fetchAlltagsApi = async (current_user) => {
    try {
        const params = {
            userId: current_user,
            activity: "AvidTag",
            description: "Retrieve Avidtag",
            page: "Admin - AvidTag Page"
        };
        return await axios.get("/tags", { params });
    } catch (error) {
        return Promise.reject(error)
    }
};
const createTagApi = async (name, type, module, currentUser) => {
    try {
        return auditPostMiddleware(
            "tags",
            currentUser,
            { name, type, module },
            "Roles",
            "Admin - Create Group Roles",
            "Customer Information Page"
        );

        //return await axios.post("/roles", { name, type, module });
    } catch (error) {
        return error;
    }
};
const updateRoleListApi = async (data, currentUser) => {
    try {
        const { id, tagname } = data;
        const dataObj = {
            name: tagname
        }
        return auditPutMiddleware(
            `tags/${id}`,
            currentUser,
            dataObj,
            "AvidTag",
            "Update tags",
            "Admin -Page"
        );
        //return await axios.put(`/groups/${id}`, data);
    } catch (error) {
        return error;
    }
};
function* gettagList({ payload }) {
    try {
        yield put(fetchStart());
        const alltags = yield call(fetchAlltagsApi);
        yield put(fetchSuccess());
        yield put(fetchedAlltags(alltags.data.body.tags));
    } catch (error) {
        yield call(errorHandling, error)
    }
}
function* saveTag({ payload }) {
    try {
        const { tagname } = payload;
        yield put(fetchStart());
        const tag = yield call(createTagApi, tagname);
        yield put(fetchSuccess());
        yield put(showMessage(tag.data.body.tag.body.message));
        yield call(forwardTo, "/admin/Avidtag");
    } catch (error) {
        yield call(errorHandling, error)
    }
}
function* updateTagList({ payload, currentUser }) {
    try {
        yield put(fetchStart());
        const tag = yield call(updateRoleListApi, payload, currentUser);
        yield put(fetchSuccess());
        if (tag.data.body.tags == 1) {
            yield put(showMessage('Tag Updated Sucessfully'));
            yield call(forwardTo, "/admin/Avidtag");
        }
    } catch (error) {
        yield put(fetchError("Tag Already Exist"));
        //  yield call(errorHandling, error)
    }
}
export function* fetchAvidtags() {
    yield takeEvery(FETCH_ALLTAGS, gettagList);
}
export function* createTag() {
    yield takeEvery(CREATE_TAG, saveTag);
}
export function* updateTag() {
    yield takeEvery(EDIT_TAG, updateTagList);
}
export default function* AvidtagSaga() {
    yield all([
        fetchAvidtags(),
        createTag(),
        updateTag(),
    ])
}