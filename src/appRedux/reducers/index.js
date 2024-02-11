import { combineReducers } from "redux";
import Settings from "./Settings";
import Common from "./Common";
import Auth from "./Auth";
import Authorization from "./Authorization";
import AuditLogs from "./AuditLogs";
import DashboardTabs from "./DashboardTabs";
import Alerts from "./Alerts";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectRouter } from "connected-react-router";
import AvidAllTag from "./AvidTag";
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["idToken"],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    common: Common,
    auth: persistReducer(authPersistConfig, Auth),
    authorization: Authorization,
    dashboardTabs: DashboardTabs,
    auditLogs: AuditLogs,
    alerts: Alerts,
    avidallTags: AvidAllTag,
  });
