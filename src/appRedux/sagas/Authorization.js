import { all, put, call, takeEvery } from "redux-saga/effects";
import {
  CREATE_COMPONENT,
  FETCH_COMPONENTS,
  CREATE_POLICY,
  FETCH_POLICIES,
  CREATE_GROUP,
  CREATE_ROLE,
  FETCH_ROLES,
  FETCH_GROUPS,
  FETCH_GROUP_POLICIES,
  CREATE_USER,
  FETCH_ADMIN_ROLES_LIST,
  FETCH_SUB_ROLES,
  FETCH_ADMIN_GROUPS,
  FETCH_POLICIES_AND_COMPONENTS,
  FETCH_GROUPS_AND_POLICIES,
  FETCH_USERS_LIST,
  FETCH_USERNAMES_LIST,
  EDIT_COMPONENT,
  EDIT_ROLE,
  EDIT_GROUP,
  EDIT_POLICY,
  FETCH_USER_GROUPS_AND_POLICIES,
  UPDATE_USER,
  TOGGLE_COMPONENT,
  TOGGLE_USER,
  TOGGLE_ROLE,
  TOGGLE_POLICY,
  TOGGLE_GROUP,
  FETCH_USER_DETAILS,
  USER_DATA,
  DELETE_USER,
  FETCH_DOWNLOAD_USER_LIST
} from "../../constants/ActionTypes";
import { forwardTo } from "../../util/NavigationSaga";
import axios from "../../util/Api";
import {
  fetchStart,
  fetchSuccess,
  fetchedComponents,
  fetchedPolicies,
  fetchedRoles,
  fetchedGroups,
  fetchedGroupPolicies,
  fetchedAdminRolesList,
  fetchedSubRolesList,
  fetchedAdminGroupsList,
  showMessage,
  fetchedPoliciesAndComponents,
  fetchedGroupsAndPolicies,
  fetchedUsersList,
  fetchedUsernamesList,
  fetchedUserGroups,
  fetchedUserPolicies,
  fetchError,
  fetchedDownloadUsersList
} from "../../appRedux/actions";
import {
  auditPostMiddleware,
  auditPutMiddleware,
  auditDeleteMiddleware,
} from "../../util/auditLogger";
// import publicIp from "public-ip";
import { errorHandling } from "../../util/Helper"
import { decryptLoginResponse } from "../../util/PasswordEncryption";


const createComponentApi = async ({ name, current_user }) => {
  try {
    return auditPostMiddleware(
      "components",
      current_user,
      { name },
      "Component",
      "Create Component",
      "Admin - Create Components Page"
    );
  } catch (error) {
    return error;
  }
};

const fetchComponentsApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "Component",
      description: "Retrieve Componets",
      page: "Admin - Components Page",
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/components", { params });
  } catch (error) {
    return Promise.reject(error)
  }
};

const createPolicyApi = async (name, selectedComponents, currentUser) => {
  try {
    return auditPostMiddleware(
      "policies",
      currentUser,
      { name, components: selectedComponents },
      "Policies",
      "Create Policies:",
      "Admin - Create Policy Page"
    );

    // return await axios.post("/policies", {
    //   name,
    //   components: selectedComponents,
    // });
  } catch (error) {
    return error;
  }
};

const fetchPoliciesApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "Policies",
      description: "Retrieve Policies",
      page: "Admin - Policies Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/policies", { params });
  } catch (error) {
    return Promise.reject(error)
  }
};

const createGroupApi = async (name, selectedPolicies, currentUser) => {
  try {
    return auditPostMiddleware(
      "groups",
      currentUser,
      { name, policies: selectedPolicies },
      "Groups",
      "Admin - Create Group Page",
      "Customer Information Page"
    );

    //return await axios.post("/groups", { name, policies: selectedPolicies });
  } catch (error) {
    return error;
  }
};

const createRoleApi = async (name, type, module, currentUser) => {
  try {
    return auditPostMiddleware(
      "roles",
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

const fetchRolesApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "Roles",
      description: "Retrieve Roles",
      page: "Admin - Roles Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/roles", { params });
    // return await axios.get(
    //   `/roles?userId=1&activity=Roles&description=Retrieve Roles&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchGroupsApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "Groups",
      description: "Retrieve Groups",
      page: "Admin - Groups Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/groups", { params });
    // return await axios.get(
    //   `/groups?userId=1&activity=Groups&description=Retrieve Groups&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchGroupPoliciesApi = async (values, current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "Group Policies",
      description: "Retrieve Group Policies",
      page: "Admin - Group Policies Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get(`/policies?groups=${values}`, { params });
    // return await axios.get(
    //   `/policies?groups=${values}&userId=1&activity=Policies&description=retrieve Policies&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get(`/policies?groups=${values}`);
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchUsersApi = async (current_user, roleType, roleId, column, value) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    if (roleType === "superadmin") {
      if (column && value) {
        const params = {
          field: column,
          value: value,
          userId: current_user,
          activity: "Users List",
          description: "Retrieve Users List",
          page: "Admin - Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        // return await axios.get(`/users?field=${column}&value=${value}`);
      } else {
        const params = {
          userId: current_user,
          activity: "Users List",
          description: "Retrieve Users List",
          page: "Admin - Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        //return await axios.get("/users");
      }
    }
    else if (roleType === "dcaadmin" || roleType === "dcaagency") {
      if (column && value) {
        const params = {
          field: column,
          value: value,
          userId: current_user,
          roleId: roleId,
          activity: "DCA Users List",
          description: "Retrieve DCA Users List",
          page: "Admin - DCA Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        // return await axios.get(`/users?field=${column}&value=${value}`);
      } else {
        const params = {
          userId: current_user,
          roleId: roleId,
          activity: "DCA Users List",
          description: "Retrieve DCA Users List",
          page: "Admin - DCA Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        //return await axios.get("/users");
      }
    }
    else if (roleType === "admin") {
      if (column && value) {
        const params = {
          type: roleType,
          roleId: roleId,
          field: column,
          value: value,
          userId: current_user,
          activity: "Users List",
          description: "Retrieve Users List",
          page: "Admin - Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        // return await axios.get(
        //   `/users?type=${roleType}&roleId=${roleId}&field=${column}&value=${value}`
        // );
      } else {
        const params = {
          type: roleType,
          roleId: roleId,
          userId: current_user,
          activity: "Users List",
          description: "Retrieve Users List",
          page: "Admin - Users Page"
          // ipAddress: ipAddress,
          // hostName: hostName,
        };
        return await axios.get("/users", { params });
        // return await axios.get(`/users?type=${roleType}&roleId=${roleId}`);
      }
    }
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchUsernamesApi = async () => {
  try {
    return await axios.post("/users/usernameList");
  } catch (error) {
    return Promise.reject(error);
  }
};

const createUserApi = async (values, current_user) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      contactNumber,
      agencyCode,
      agencyName,
      agencyPIC,
      loginTime,
      logoutTime,
      //agencyLimit,
      employeeId,
      roleId,
      selectedGroups,
      selectedPolicies,
      notes,
    } = values;
    return auditPostMiddleware(
      "users",
      current_user,
      {
        username,
        firstName,
        lastName,
        email,
        contactNumber,
        agencyCode,
        agencyName,
        agencyPIC,
        loginTime,
        logoutTime,
        //agencyLimit,
        employeeId,
        roleId,
        selectedGroups,
        selectedPolicies,
        notes,
      },
      "users",
      "Create User",
      "Admin - Create Users Page"
    );
    // return await axios.post("/users", {
    //   username,
    //   firstName,
    //   lastName,
    //   email,
    //   contactNumber,
    //   roleId,
    //   selectedGroups,
    //   selectedPolicies,
    //   notes,
    // });
  } catch (error) {
    return error;
  }
};

const updateUserApi = async (values, current_user) => {
  try {
    const {
      username,
      firstName,
      lastName,
      email,
      contactNumber,
      agencyCode,
      agencyName,
      agencyPIC,
      loginTime,
      logoutTime,
      //agencyLimit,
      employeeId,
      roleId,
      selectedGroups,
      selectedPolicies,
      notes,
    } = values;
    return auditPutMiddleware(
      `users/${username}`,
      current_user,
      {
        username,
        firstName,
        lastName,
        email,
        contactNumber,
        agencyCode,
        agencyName,
        agencyPIC,
        loginTime,
        logoutTime,
        //agencyLimit,
        employeeId,
        roleId,
        selectedGroups,
        selectedPolicies,
        notes,
      },
      "User",
      "Update User",
      "Admin - Create Users Page"
    );
    // return await axios.put(`/users/${username}`, {
    //   username,
    //   firstName,
    //   lastName,
    //   email,
    //   contactNumber,
    //   roleId,
    //   selectedGroups,
    //   selectedPolicies,
    //   notes,
    // });
  } catch (error) {
    return error;
  }
};

const fetchAdminRolesListApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      type: "admin",
      userId: current_user,
      activity: "Admin Roles List",
      description: "Retrieve Admin Roles List",
      page: "Admin - Roles Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/roles", { params });
    // return await axios.get(
    //   `/roles?type=admin&userId=1&activity=Roles&description=Retrieve roles&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get("/roles?type=admin");
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchSubRolesListApi = async (roleId, current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "SubRoles List",
      description: "Retrieve SubRoles list",
      page: "Admin - Create Users Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get(`/roles/${roleId}/subRoles`, { params });
    // return await axios.get(
    //   `/roles/${roleId}/subRoles?userId=1&activity=Subroles&description=Retrieve Subroles&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get(`/roles/${roleId}/subRoles`);
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchAdminGroupsListApi = async (userId, current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      user: userId,
      userId: current_user,
      activity: "SubRoles List",
      description: "Retrieve SubRoles list",
      page: "Admin - Create Users Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/groups", { params });
    // return await axios.get(
    //   `/groups/?user=${userId}&userId=1&activity=Policies&description=Retrieve Policies&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get(`/groups?user=${userId}`);
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchPoliciesAndComponentsApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      components: true,
      userId: current_user,
      activity: "SubRoles List",
      description: "Retrieve SubRoles list",
      page: "Admin - Create Users Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/policies", { params });
    // return await axios.get(
    //   `/policies?components=true&userId=1&activity=Policies&description=Retrieve Policies&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    //);
    //return await axios.get("/policies?components=true");
  } catch (error) {
    return Promise.reject(error)
  }
};

const fetchGroupsAndPoliciesApi = async (current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      policies: true,
      userId: current_user,
      activity: "Groups and Policies",
      description: "Retrieve Groups and Polices",
      page: "Admin - Create Users Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get("/groups", { params });
    // return await axios.get(
    //   `/groups?policies=true&userId=1&activity=Policies&description=Retrieve Policies&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get("/groups?policies=true");
  } catch (error) {
    return Promise.reject(error)
  }
};

const updateComponentApi = async (id, data, currentUser) => {
  try {
    return auditPutMiddleware(
      `components/${id}`,
      currentUser,
      data,
      "Component",
      "Update Component",
      "Admin - Components Page"
    );
    //return await axios.put(`/components/${id}`, data);
  } catch (error) {
    return error;
  }
};

const updateRoleListApi = async (data, current_user) => {
  try {
    return auditPostMiddleware(
      "roles/edit",
      current_user,
      data,
      "Roles",
      "Edit Roles:",
      "Admin - Roles Page"
    );
    //return await axios.post(`/roles/edit`, data);
  } catch (error) {
    return error;
  }
};

const updateGroupListApi = async (data, currentUser) => {
  try {
    const { id } = data;
    return auditPutMiddleware(
      `groups/${id}`,
      currentUser,
      data,
      "Groups",
      "Update Groups",
      "Admin - Groups Page"
    );
    //return await axios.put(`/groups/${id}`, data);
  } catch (error) {
    return error;
  }
};

const updatePolicyListApi = async (data, currentUser) => {
  try {
    const { id } = data;
    return auditPutMiddleware(
      `policies/${id}`,
      currentUser,
      data,
      "Policies",
      "Update Polices",
      "Admin - Policy Page"
    );
    //return await axios.put(`/policies/${id}`, data);
  } catch (error) {
    return error;
  }
};

const getUserGroupsAndPoliciesApi = async (username, current_user) => {
  try {
    // const ipAddress = await publicIp.v4();
    // const hostName = ipAddress.split(".")[0];
    const params = {
      userId: current_user,
      activity: "User Groups and Policies",
      description: "Retrieve User Groups and Polices",
      page: "Admin - Create User Page"
      // ipAddress: ipAddress,
      // hostName: hostName,
    };
    return await axios.get(`/users/${username}`, { params });
    // return await axios.get(
    //   `/users/${username}?userId=1&activity=Policies&description=Retrieve Policies&page=Customer Information Page&ipAddress=${await publicIp.v4()}&hostName=${
    //     (await publicIp.v4()).split(".")[0]
    //   }`
    // );
    //return await axios.get(`/users/${username}`);
  } catch (error) {
    return Promise.reject(error)
  }
};

const toggleComponentApi = async (id, enabled, currentUser) => {
  try {
    const description =
      enabled === true ? "Activate Component" : "Deactivate Component";
    return auditDeleteMiddleware(
      `components/${id}?status=${enabled}`,
      currentUser,
      "Components",
      description,
      "Admin - Components Page"
    );
    //return await axios.delete(`/components/${id}?status=${enabled}`);
  } catch (error) {
    return error;
  }
};

const toggleUserApi = async (username, enabled, current_user, reason) => {
  try {
    const description = `${enabled === true ? "Activate User" : "Deactivate User"
      } - ${username} : ${reason}`;
    return auditDeleteMiddleware(
      `users/${username}?status=${enabled}`,
      current_user,
      "User",
      description,
      "Admin - User Page"
    );
    //return await axios.delete(`/users/${username}?status=${enabled}`);
  } catch (error) {
    return error;
  }
};

const toggleRoleApi = async (id, enabled, current_user) => {
  try {
    const description = enabled === true ? "Activate Role" : "Deactivate Role";
    return auditDeleteMiddleware(
      `roles/${id}?status=${enabled}`,
      current_user,
      "Roles",
      description,
      "Admin - Roles Page"
    );
    //return await axios.delete(`/roles/${id}?status=${enabled}`);
  } catch (error) {
    return error;
  }
};

const togglePolicyApi = async (id, enabled, current_user) => {
  try {
    const description =
      enabled === true ? "Activate Policy" : "Deactivate Policy";
    return auditDeleteMiddleware(
      `policies/${id}?status=${enabled}`,
      current_user,
      "Policies",
      description,
      "Admin - Policies Page"
    );
    //return await axios.delete(`/policies/${id}?status=${enabled}`);
  } catch (error) {
    return error;
  }
};

const toggleGroupApi = async (id, enabled, current_user) => {
  try {
    const description =
      enabled === true ? "Activate Group" : "Deactivate Group";
    return auditDeleteMiddleware(
      `groups/${id}?status=${enabled}`,
      current_user,
      "Group",
      description,
      "Admin - Group Page"
    );
    //return await axios.delete(`/groups/${id}?status=${enabled}`);
  } catch (error) {
    return error;
  }
};

const getUserDetailsApi = async () => {
  try {
    return await axios.get("/users/userDetails");
  } catch (error) {
    return Promise.reject(error)
  }
}


const deleteUserApi = async (username, currentUser, reason) => {
  try {
    const description = `Delete User - ${username} : ${reason}`;

    return auditPostMiddleware(
      "users/delete",
      currentUser,
      { username },
      "Delete User",
      description,
      "Admin - User Page"
    );
  } catch (error) {
    return error;
  }
};

const callDownloadUsersListApi = async (currentUser, roleId) => {
  try {
    return auditPostMiddleware(
      `users/downloadUserList?userId=${currentUser.authUser.username}&roleId=${roleId}`,
      currentUser,
      {},
      "Download Users List",
      "Download Users List",
      "Admin - Users Page"
    );
  } catch (error) {
    throw error;
  }
};

function* saveComponent({ payload }) {
  try {
    yield put(fetchStart());
    const component = yield call(createComponentApi, {
      name: payload.name,
      current_user: payload.currentUser,
    });
    yield put(fetchSuccess());
    yield put(showMessage(component.data.body.component.body.message));
    yield call(forwardTo, "/admin/components");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getComponentsList({ payload }) {
  try {
    yield put(fetchStart());
    const components = yield call(
      fetchComponentsApi,
      payload.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedComponents(components.data.body.components));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* savePolicy({ payload }) {
  try {
    const { name, selectedComponents, currentUser } = payload;
    yield put(fetchStart());
    const policy = yield call(
      createPolicyApi,
      name,
      selectedComponents,
      currentUser
    );
    yield put(fetchSuccess());
    yield put(showMessage(policy.data.body.policy.body.message));
    yield call(forwardTo, "/admin/policies");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getPoliciesList({ payload }) {
  try {
    yield put(fetchStart());
    const policies = yield call(fetchPoliciesApi, payload.authUser.username);
    yield put(fetchSuccess());
    yield put(fetchedPolicies(policies.data.body.policies));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* saveGroup({ payload }) {
  try {
    const { name, selectedPolicies, currentUser } = payload;
    yield put(fetchStart());
    const group = yield call(
      createGroupApi,
      name,
      selectedPolicies,
      currentUser
    );
    yield put(fetchSuccess());
    yield put(showMessage(group.data.body.group.body.message));
    yield call(forwardTo, "/admin/groups");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* saveRole({ payload }) {
  try {
    const { name, type, module, currentUser } = payload;
    yield put(fetchStart());
    const role = yield call(createRoleApi, name, type, module, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(role.data.body.roles.body.message));
    yield call(forwardTo, "/admin/roles");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getRolesList({ payload }) {
  try {
    yield put(fetchStart());
    const roles = yield call(fetchRolesApi, payload.authUser.username);
    yield put(fetchSuccess());
    yield put(fetchedRoles(roles.data.body.roles));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getGroupsList({ payload }) {
  try {
    yield put(fetchStart());
    const groups = yield call(fetchGroupsApi, payload.authUser.username);
    yield put(fetchSuccess());
    yield put(fetchedGroups(groups.data.body.groups));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getGroupPoliciesList({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const policies = yield call(
      fetchGroupPoliciesApi,
      payload,
      currentUser.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedGroupPolicies(policies.data.body.policies));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getUsersList({ payload }) {
  const { currentUser, roleType, roleId, column, value } = payload;
  try {
    yield put(fetchStart());
    const users = yield call(
      fetchUsersApi,
      currentUser.authUser.username,
      roleType,
      roleId,
      column,
      value
    );
    yield put(fetchSuccess());
    yield put(fetchedUsersList(users.data.body.users));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getUsernamesList() {
  try {
    yield put(fetchStart());
    const usernames = yield call(fetchUsernamesApi);
    yield put(fetchSuccess());
    yield put(fetchedUsernamesList(usernames.data.body.usersList.body.data));
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* updateComponentList({ payload }) {
  const { name, id, currentUser } = payload;
  try {
    yield put(fetchStart());
    const component = yield call(
      updateComponentApi,
      id,
      { name: name },
      currentUser
    );
    yield put(fetchSuccess());
    yield put(showMessage(component.data.body.component.body.message));
    yield call(forwardTo, "/admin/components");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* updateRoleList({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const role = yield call(updateRoleListApi, payload, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(role.data.body.roles.body.message));
    yield call(forwardTo, "/admin/roles");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* updateGroupList({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const group = yield call(updateGroupListApi, payload, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(group.data.body.group.body.message));
    yield call(forwardTo, "/admin/groups");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* updatePolicyList({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const policy = yield call(updatePolicyListApi, payload, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(policy.data.body.policy.body.message));
    yield call(forwardTo, "/admin/policies");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* saveUser({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    yield call(createUserApi, payload, currentUser);
    yield put(fetchSuccess());
    yield call(forwardTo, "/admin/users");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* updateUserData({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const user = yield call(updateUserApi, payload, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(user.data.body.message));
    yield call(forwardTo, "/admin/users");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getAdminRolesList({ payload }) {
  try {
    yield put(fetchStart());
    const roles = yield call(fetchAdminRolesListApi, payload.authUser.username);
    yield put(fetchSuccess());
    yield put(fetchedAdminRolesList(roles.data.body.roles));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getSubRolesList({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const roles = yield call(
      fetchSubRolesListApi,
      payload,
      currentUser.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedSubRolesList(roles.data.body.roles));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getAdminGroups({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const groups = yield call(
      fetchAdminGroupsListApi,
      payload,
      currentUser.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedAdminGroupsList(groups.data.body.groups));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getPoliciesAndComponents({ payload }) {
  try {
    yield put(fetchStart());
    const policies = yield call(
      fetchPoliciesAndComponentsApi,
      payload.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedPoliciesAndComponents(policies.data.body.policies));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getGroupsAndPolicies({ payload }) {
  try {
    yield put(fetchStart());
    const groups = yield call(
      fetchGroupsAndPoliciesApi,
      payload.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedGroupsAndPolicies(groups.data.body.groups));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getUserGroupsAndPolicies({ payload, currentUser }) {
  try {
    yield put(fetchStart());
    const groupsAndPolicies = yield call(
      getUserGroupsAndPoliciesApi,
      payload,
      currentUser.authUser.username
    );
    yield put(fetchSuccess());
    yield put(fetchedUserGroups(groupsAndPolicies.data.body.groupIds));
    yield put(fetchedUserPolicies(groupsAndPolicies.data.body.policyIds));
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* toggleComponentData({ payload }) {
  try {
    const { id, enabled, currentUser } = payload;
    yield put(fetchStart());
    const component = yield call(toggleComponentApi, id, enabled, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(component.data.body.component.body.message));
    yield call(forwardTo, "/admin/components");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* toggleUserData({ payload }) {
  try {
    const { username, enabled, currentUser, reason } = payload;

    yield put(fetchStart());
    const user = yield call(
      toggleUserApi,
      username,
      enabled,
      currentUser,
      reason
    );
    yield put(fetchSuccess());
    if (user.data.body.resultcode === '01') {
      yield put(fetchError());
      yield put(fetchError(user.data.body.body.message));
      //fetchError(user.data.body.message)
    } else {
      yield put(showMessage(user.data.body.user.body.message));
    }
    // yield put(showMessage(user.data.body.user.body.message));
    yield call(forwardTo, "/admin/users");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* toggleRoleData({ payload }) {
  try {
    const { id, enabled, currentUser } = payload;
    yield put(fetchStart());
    const role = yield call(toggleRoleApi, id, enabled, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(role.data.body.role.body.message));
    yield call(forwardTo, "/admin/roles");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* togglePolicyData({ payload }) {
  try {
    const { id, enabled, currentUser } = payload;
    yield put(fetchStart());
    const policy = yield call(togglePolicyApi, id, enabled, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(policy.data.body.policy.body.message));
    yield call(forwardTo, "/admin/policies");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* toggleGroupData({ payload }) {
  try {
    const { id, enabled, currentUser } = payload;
    yield put(fetchStart());
    const group = yield call(toggleGroupApi, id, enabled, currentUser);
    yield put(fetchSuccess());
    yield put(showMessage(group.data.body.group.body.message));
    yield call(forwardTo, "/admin/groups");
  } catch (error) {
    yield call(errorHandling, error)
  }
}

function* getUserData() {
  try {
    const userData = yield call(getUserDetailsApi);
    const decryptedResponse = decryptLoginResponse(userData.data.body)
    yield put({ type: USER_DATA, payload: decryptedResponse.user })
  } catch (error) {
    yield call(errorHandling, error)
  }
}



function* deleteUserData({ payload }) {
  try {
    const { username, currentUser, reason } = payload;

    yield put(fetchStart());
    const user = yield call(deleteUserApi, username, currentUser, reason);
    yield put(fetchSuccess());
    yield put(showMessage(user.data.body.message));
    yield call(forwardTo, "/admin/users");
  } catch (error) {
    yield call(errorHandling, error);
  }
}

function* getDownloadUsersList({ payload }) {
  try {
    const { currentUser, roleId } = payload;
    yield put(fetchStart());
    const response = yield call(callDownloadUsersListApi, currentUser, roleId);
    yield put(fetchedDownloadUsersList(response.data.body.body.fileData));
    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchError(error.response?.data?.error?.message));
  }
}

export function* createComponent() {
  yield takeEvery(CREATE_COMPONENT, saveComponent);
}

export function* fetchComponents() {
  yield takeEvery(FETCH_COMPONENTS, getComponentsList);
}

export function* createPolicy() {
  yield takeEvery(CREATE_POLICY, savePolicy);
}

export function* fetchPolicies() {
  yield takeEvery(FETCH_POLICIES, getPoliciesList);
}

export function* createGroup() {
  yield takeEvery(CREATE_GROUP, saveGroup);
}

export function* createRole() {
  yield takeEvery(CREATE_ROLE, saveRole);
}

export function* fetchRoles() {
  yield takeEvery(FETCH_ROLES, getRolesList);
}

export function* fetchGroups() {
  yield takeEvery(FETCH_GROUPS, getGroupsList);
}

export function* fetchGroupPolicies() {
  yield takeEvery(FETCH_GROUP_POLICIES, getGroupPoliciesList);
}

export function* createUser() {
  yield takeEvery(CREATE_USER, saveUser);
}

export function* fetchAdminRolesList() {
  yield takeEvery(FETCH_ADMIN_ROLES_LIST, getAdminRolesList);
}

export function* fetchSubRoles() {
  yield takeEvery(FETCH_SUB_ROLES, getSubRolesList);
}

export function* fetchAdminGroups() {
  yield takeEvery(FETCH_ADMIN_GROUPS, getAdminGroups);
}

export function* fetchPoliciesAndComponents() {
  yield takeEvery(FETCH_POLICIES_AND_COMPONENTS, getPoliciesAndComponents);
}

export function* fetchGroupsAndPolicies() {
  yield takeEvery(FETCH_GROUPS_AND_POLICIES, getGroupsAndPolicies);
}

export function* fetchUsersList() {
  yield takeEvery(FETCH_USERS_LIST, getUsersList);
}

export function* fetchUsernamesList() {
  yield takeEvery(FETCH_USERNAMES_LIST, getUsernamesList);
}

export function* updateComponent() {
  yield takeEvery(EDIT_COMPONENT, updateComponentList);
}

export function* updateRole() {
  yield takeEvery(EDIT_ROLE, updateRoleList);
}

export function* updateGroup() {
  yield takeEvery(EDIT_GROUP, updateGroupList);
}

export function* updatePolicy() {
  yield takeEvery(EDIT_POLICY, updatePolicyList);
}

export function* fetchUserGroupsAndPolicies() {
  yield takeEvery(FETCH_USER_GROUPS_AND_POLICIES, getUserGroupsAndPolicies);
}

export function* updateUser() {
  yield takeEvery(UPDATE_USER, updateUserData);
}

export function* toggleComponent() {
  yield takeEvery(TOGGLE_COMPONENT, toggleComponentData);
}

export function* toggleUser() {
  yield takeEvery(TOGGLE_USER, toggleUserData);
}

export function* toggleRole() {
  yield takeEvery(TOGGLE_ROLE, toggleRoleData);
}

export function* togglePolicy() {
  yield takeEvery(TOGGLE_POLICY, togglePolicyData);
}

export function* toggleGroup() {
  yield takeEvery(TOGGLE_GROUP, toggleGroupData);
}

export function* fetchUserDetails() {
  yield takeEvery(FETCH_USER_DETAILS, getUserData)
}

export function* deleteUser() {
  yield takeEvery(DELETE_USER, deleteUserData);
}

export function* fetchDownloadUsersList() {
  yield takeEvery(FETCH_DOWNLOAD_USER_LIST, getDownloadUsersList);
}

export default function* AuthorizationSaga() {
  yield all([
    createComponent(),
    fetchComponents(),
    createPolicy(),
    fetchPolicies(),
    createGroup(),
    createRole(),
    fetchRoles(),
    fetchGroups(),
    fetchGroupPolicies(),
    createUser(),
    fetchAdminRolesList(),
    fetchSubRoles(),
    fetchAdminGroups(),
    fetchPoliciesAndComponents(),
    fetchGroupsAndPolicies(),
    fetchUsersList(),
    fetchUsernamesList(),
    updateComponent(),
    updateRole(),
    updateGroup(),
    updatePolicy(),
    fetchUserGroupsAndPolicies(),
    updateUser(),
    toggleComponent(),
    toggleUser(),
    toggleRole(),
    togglePolicy(),
    toggleGroup(),
    fetchUserDetails(),
    deleteUser(),
    fetchDownloadUsersList()
  ]);
}
