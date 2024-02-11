import {
  FETCHED_COMPONENTS,
  FETCHED_POLICIES,
  FETCHED_ROLES,
  SHOW_GROUP_LIST,
  FETCHED_GROUPS,
  SHOW_POLICY_LIST,
  FETCHED_GROUP_POLICIES,
  HIDE_GROUPS_AND_POLICIES,
  SHOW_MODULES_LIST,
  FETCHED_ADMIN_ROLES_LIST,
  FETCHED_SUB_ROLES,
  FETCHED_ADMIN_GROUPS,
  FETCHED_POLICIES_AND_COMPONENTS,
  FETCHED_GROUPS_AND_POLICIES,
  FETCHED_USERS_LIST,
  FETCHED_USERNAMES_LIST,
  FETCHED_USER_GROUPS,
  FETCHED_USER_POLICIES,
  CLEAR_ROLES,
  CLEAR_GROUPS,
  CLEAR_POLICIES,
  SEARCH_COLUMN,
} from "../../constants/ActionTypes"

const INIT_STATE = {
  components: [],
  policies: [],
  roles: [],
  groups: [],
  groupPolicies: [],
  adminRolesList: [],
  policyComponentsList: [],
  groupPoliciesList: [],
  users: [],
  usernames: [],
  selectedGroups: null,
  selectedPolicies: null,
  showGroupsList: false,
  showPoliciesList: false,
  showModulesList: false,
  searchColumn: 'username',
  dcaUsers: [],
  downloadUsersList: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCHED_COMPONENTS:
      return { ...state, components: action.payload }

    case FETCHED_POLICIES:
      return { ...state, policies: action.payload }

    case FETCHED_ROLES:
      return { ...state, roles: action.payload }

    case FETCHED_GROUPS:
      return { ...state, groups: action.payload }

    case FETCHED_GROUP_POLICIES:
      return { ...state, groupPolicies: action.payload }

    case SHOW_GROUP_LIST:
      return { ...state, showGroupsList: action.payload }

    case SHOW_POLICY_LIST:
      return { ...state, showPoliciesList: action.payload }

    case HIDE_GROUPS_AND_POLICIES:
      return {
        ...state,
        showGroupsList: false,
        showPoliciesList: false,
        groups: [],
        groupPolicies: [],
      }

    case SHOW_MODULES_LIST:
      return { ...state, showModulesList: action.payload }

    case FETCHED_ADMIN_ROLES_LIST:
      return { ...state, adminRolesList: action.payload }

    case FETCHED_SUB_ROLES:
      return { ...state, roles: action.payload }

    case FETCHED_ADMIN_GROUPS:
      return { ...state, groups: action.payload }

    case FETCHED_POLICIES_AND_COMPONENTS:
      return { ...state, policyComponentsList: action.payload }

    case FETCHED_GROUPS_AND_POLICIES:
      return { ...state, groupPoliciesList: action.payload }

    case FETCHED_USERS_LIST:
      return { ...state, users: action.payload }

    case FETCHED_USERNAMES_LIST:
      return { ...state, usernames: action.payload }

    case FETCHED_USER_GROUPS:
      return { ...state, selectedGroups: action.payload }

    case FETCHED_USER_POLICIES:
      return { ...state, selectedPolicies: action.payload }

    case CLEAR_ROLES:
      return { ...state, roles: [] }

    case CLEAR_GROUPS:
      return {
        ...state,
        selectedGroups: null,
        showGroupsList: false,
        groups: [],
      }

    case CLEAR_POLICIES:
      return {
        ...state,
        selectedPolicies: null,
        showPoliciesList: false,
        groupPolicies: [],
      }

    case SEARCH_COLUMN:
      return { ...state, searchColumn: action.payload }

    default:
      return state
  }
}