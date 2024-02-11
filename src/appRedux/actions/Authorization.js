import {
  CREATE_COMPONENT,
  FETCH_COMPONENTS,
  FETCHED_COMPONENTS,
  CREATE_POLICY,
  FETCH_POLICIES,
  FETCHED_POLICIES,
  CREATE_GROUP,
  CREATE_ROLE,
  FETCH_ROLES,
  FETCHED_ROLES,
  SHOW_GROUP_LIST,
  FETCH_GROUPS,
  FETCHED_GROUPS,
  SHOW_POLICY_LIST,
  FETCH_GROUP_POLICIES,
  FETCHED_GROUP_POLICIES,
  CREATE_USER,
  UPDATE_USER,
  HIDE_GROUPS_AND_POLICIES,
  SHOW_MODULES_LIST,
  FETCH_ADMIN_ROLES_LIST,
  FETCHED_ADMIN_ROLES_LIST,
  FETCH_SUB_ROLES,
  FETCHED_SUB_ROLES,
  FETCH_ADMIN_GROUPS,
  FETCHED_ADMIN_GROUPS,
  FETCH_POLICIES_AND_COMPONENTS,
  FETCHED_POLICIES_AND_COMPONENTS,
  FETCH_GROUPS_AND_POLICIES,
  FETCHED_GROUPS_AND_POLICIES,
  FETCH_USERS_LIST,
  FETCHED_USERS_LIST,
  FETCH_USERNAMES_LIST,
  FETCHED_USERNAMES_LIST,
  EDIT_COMPONENT,
  EDIT_ROLE,
  EDIT_GROUP,
  EDIT_POLICY,
  FETCH_USER_GROUPS_AND_POLICIES,
  FETCHED_USER_GROUPS,
  FETCHED_USER_POLICIES,
  CLEAR_ROLES,
  CLEAR_GROUPS,
  CLEAR_POLICIES,
  TOGGLE_COMPONENT,
  TOGGLE_USER,
  TOGGLE_ROLE,
  TOGGLE_POLICY,
  TOGGLE_GROUP,
  SEARCH_COLUMN,
  FETCH_USER_DETAILS,
  DELETE_USER,
  FETCH_DOWNLOAD_USER_LIST,
  FETCHED_DOWNLOAD_USER_LIST,
  CLEAR_DOWNLOAD_USER_LIST
} from "../../constants/ActionTypes"

export const createComponent = ({ name, currentUser }) => {
  return {
    type: CREATE_COMPONENT,
    payload: { name, currentUser }
  }
}

export const fetchComponents = (currentUser) => {
  return {
    type: FETCH_COMPONENTS,
    payload: currentUser
  }
}

export const fetchedComponents = (components) => {
  return {
    type: FETCHED_COMPONENTS,
    payload: components
  }
}

export const editComponent = (components) => {
  return {
    type: EDIT_COMPONENT,
    payload: components
  }
}


export const createPolicy = (name, selectedComponents, currentUser) => {
  return {
    type: CREATE_POLICY,
    payload: { name, selectedComponents, currentUser }
  }
}

export const fetchPolicies = (currentUser) => {
  return {
    type: FETCH_POLICIES,
    payload: currentUser

  }
}

export const fetchedPolicies = (policies) => {
  return {
    type: FETCHED_POLICIES,
    payload: policies
  }
}

export const createGroup = (name, selectedPolicies, currentUser) => {
  return {
    type: CREATE_GROUP,
    payload: { name, selectedPolicies, currentUser }
  }
}

export const createRole = (name, type, module, currentUser) => {
  return {
    type: CREATE_ROLE,
    payload: { name, type, module, currentUser }
  }
}

export const fetchRoles = (currentUser) => {
  return {
    type: FETCH_ROLES,
    payload: currentUser
  }
}

export const fetchedRoles = (roles) => {
  return {
    type: FETCHED_ROLES,
    payload: roles
  }
}

export const editRole = (payload, currentUser) => {
  return {
    type: EDIT_ROLE,
    payload: payload,
    currentUser
  }
}

export const showGroupList = (value) => {
  return {
    type: SHOW_GROUP_LIST,
    payload: value
  }
}

export const fetchGroups = (currentUser) => {
  return {
    type: FETCH_GROUPS,
    payload: currentUser
  }
}

export const fetchedGroups = (groups) => {
  return {
    type: FETCHED_GROUPS,
    payload: groups
  }
}

export const showPolicyList = (value) => {
  return {
    type: SHOW_POLICY_LIST,
    payload: value
  }
}

export const fetchGroupPolicies = (values, currentUser) => {
  return {
    type: FETCH_GROUP_POLICIES,
    payload: values, currentUser
  }
}

export const fetchedGroupPolicies = (policies) => {
  return {
    type: FETCHED_GROUP_POLICIES,
    payload: policies
  }
}

export const editGroup = (components, currentUser) => {
  return {
    type: EDIT_GROUP,
    payload: components, currentUser
  }
}

export const editPolicy = (data, currentUser) => {
  return {
    type: EDIT_POLICY,
    payload: data, currentUser
  }
}

export const fetchUserDetails = () => {
  return {
    type: FETCH_USER_DETAILS
  }
}


export const createUser = (values, currentUser) => {
  return {
    type: CREATE_USER,
    payload: values, currentUser
  }
}

export const updateUser = (values, currentUser) => {
  return {
    type: UPDATE_USER,
    payload: values, currentUser
  }
}

export const hideGroupsAndPolicies = () => {
  return {
    type: HIDE_GROUPS_AND_POLICIES
  }
}

export const showModules = (show) => {
  return {
    type: SHOW_MODULES_LIST,
    payload: show
  }
}

export const fetchAdminRolesList = (currentUser) => {
  return {
    type: FETCH_ADMIN_ROLES_LIST,
    payload: currentUser
  }
}

export const fetchedAdminRolesList = (roles) => {
  return {
    type: FETCHED_ADMIN_ROLES_LIST,
    payload: roles
  }
}

export const fetchSubRolesList = (roleId, currentUser) => {
  return {
    type: FETCH_SUB_ROLES,
    payload: roleId, currentUser
  }
}

export const fetchedSubRolesList = (roles) => {
  return {
    type: FETCHED_SUB_ROLES,
    payload: roles
  }
}

export const fetchAdminGroups = (userId, currentUser) => {
  return {
    type: FETCH_ADMIN_GROUPS,
    payload: userId, currentUser
  }
}

export const fetchedAdminGroupsList = (groups) => {
  return {
    type: FETCHED_ADMIN_GROUPS,
    payload: groups
  }
}

export const fetchPoliciesAndComponents = (currentUser) => {
  return {
    type: FETCH_POLICIES_AND_COMPONENTS,
    payload: currentUser
  }
}

export const fetchedPoliciesAndComponents = (policies) => {
  return {
    type: FETCHED_POLICIES_AND_COMPONENTS,
    payload: policies
  }
}

export const fetchGroupsAndPolicies = (currentUser) => {
  return {
    type: FETCH_GROUPS_AND_POLICIES,
    payload: currentUser
  }
}

export const fetchedGroupsAndPolicies = (groups) => {
  return {
    type: FETCHED_GROUPS_AND_POLICIES,
    payload: groups
  }
}

export const fetchUsersList = (
  currentUser,
  roleType,
  roleId,
  column = null,
  value = null
) => {
  return {
    type: FETCH_USERS_LIST,
    payload: { currentUser, roleType, roleId, column, value }
  }
}

export const fetchedUsersList = (users) => {
  return {
    type: FETCHED_USERS_LIST,
    payload: users
  }
}

export const fetchUsernamesList = (currentUser) => {
  return {
    type: FETCH_USERNAMES_LIST,
    payload: currentUser,
  }
}

export const fetchedUsernamesList = (usernames) => {
  return {
    type: FETCHED_USERNAMES_LIST,
    payload: usernames,
  }
}

export const fetchUserGroupsAndPolicies = (username, currentUser) => {
  return {
    type: FETCH_USER_GROUPS_AND_POLICIES,
    payload: username, currentUser
  }
}

export const fetchedUserGroups = (groups) => {
  return {
    type: FETCHED_USER_GROUPS,
    payload: groups
  }
}

export const fetchedUserPolicies = (policies) => {
  return {
    type: FETCHED_USER_POLICIES,
    payload: policies
  }
}

export const clearRoles = () => {
  return {
    type: CLEAR_ROLES
  }
}

export const clearGroups = () => {
  return {
    type: CLEAR_GROUPS
  }
}

export const clearPolicies = () => {
  return {
    type: CLEAR_POLICIES
  }
}

export const toggleComponent = (id, enabled, currentUser) => {
  return {
    type: TOGGLE_COMPONENT,
    payload: { id, enabled, currentUser }
  }
}

export const toggleUser = (username, enabled, currentUser, reason = '') => {
  return {
    type: TOGGLE_USER,
    payload: { username, enabled, currentUser, reason },
  }
}

export const toggleRole = (id, enabled, currentUser) => {
  return {
    type: TOGGLE_ROLE,
    payload: { id, enabled, currentUser }
  }
}

export const togglePolicy = (id, enabled, currentUser) => {
  return {
    type: TOGGLE_POLICY,
    payload: { id, enabled, currentUser }
  }
}

export const toggleGroup = (id, enabled, currentUser) => {
  return {
    type: TOGGLE_GROUP,
    payload: { id, enabled, currentUser }
  }
}

export const setSearchColumn = (value) => {
  return {
    type: SEARCH_COLUMN,
    payload: value
  }
}

export const deleteUser = (username, currentUser, reason = '') => {
  return {
    type: DELETE_USER,
    payload: { username, currentUser, reason }
  }
}

export const fetchDownloadUsersList = (payload) => {
  return {
    type: FETCH_DOWNLOAD_USER_LIST,
    payload
  }
}

export const fetchedDownloadUsersList = (payload) => {
  return {
    type: FETCHED_DOWNLOAD_USER_LIST,
    payload
  }
}

export const clearDownloadUsersList = (payload) => {
  return {
    type: CLEAR_DOWNLOAD_USER_LIST
  }
}