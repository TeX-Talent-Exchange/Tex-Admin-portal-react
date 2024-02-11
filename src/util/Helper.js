import React from "react";
import { put, call } from "redux-saga/effects";
import { fetchError } from "../appRedux/actions";
import { refreshGoogleCaptchaToken } from "../appRedux/actions/Auth";
import { forwardTo } from "../util/NavigationSaga";
import moment from "moment";
import { STATIC_CONST } from "../constants/GlobalConstant";
import { constRoleType } from "../constants/ConstRoleTypes";

//Antd
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const apiKeyFormat = (key) => {
  if (key.indexOf("_") > -1) {
    return key
      .split("_").join(" ")
      .split(" ")
      .map((element) => element[0].toUpperCase() + element.substring(1))
      .join(" ");
  } else return key.split(/(?=[A-Z][a-z]+)/).join(" ");
};

export const objectKeyFormat = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(key.charAt(0), key.charAt(0).toUpperCase());
};

export const roles = {
  SUPERADMIN: "Super Admin",
  CIPADMIN: "CIP Admin",
};

export const errorHandling = function* (error) {
  if (error.response) {
    const { status } = error.response;
    if (status === 500)
      yield put(fetchError(error.response.data.body.errors[0].errorMessage));
    if (status === 400)
      yield put(fetchError(error.response.data.error));
    if (status === 401) {
      yield put(fetchError(error.response.data.error));
      yield call(forwardTo, "/login");
      yield put(refreshGoogleCaptchaToken(true));
    }
  }
};

// returns malysian timestamp
export const localTimestamp = (date) => {
  let time;
  const mnth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function pad(number, length) {
    let str = `${number}`;
    while (str.length < length) {
      str = `0${str}`;
    }

    return str;
  }
  date.setUTCHours(date.getUTCHours() + 8);
  time = date.getUTCHours() < 12 ? "AM" : "PM";
  const yyyy = date.getUTCFullYear().toString();

  const MM = mnth[date.getUTCMonth()];
  const dd = pad(date.getUTCDate(), 2);
  const hh = pad(date.getUTCHours(), 2);
  const mm = pad(date.getUTCMinutes(), 2);
  const ss = pad(date.getUTCSeconds(), 2);
  return `${dd}-${MM}-${yyyy} ${hh}:${mm}:${ss}${time}`;
};

//timeformat for attributes
export const handleDateFormat = (attribute, dateFormat = "D-MMM-YYYY hh:mm:ss A") => {
  attribute = attribute
    ? moment(new Date(attribute)).format(dateFormat)
    : attribute;
  return attribute;
};

// User Audit trails filter functionality
let searchInput;

export const getColumnSearch = (dataIndex) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => {
          searchInput = node;
        }}
        placeholder={`Search item`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        size="small"
        style={{ width: 90, marginRight: 8, lineHeight: "normal" }}
      >
        Search
      </Button>
      <Button
        onClick={() => handleReset(clearFilters)}
        size="small"
        style={{ width: 90, lineHeight: "normal" }}
      >
        Reset
      </Button>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      type="search"
      style={{ color: filtered ? "#1890ff" : undefined }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : "",

  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.select());
    }
  },
});

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
};

const handleReset = (clearFilters) => {
  clearFilters();
};

// For Sorting dates and strings in Table
const defaultSort = (a, b) => {
  var va = a ? a : "",
    vb = b ? b : "";

  return va > vb ? 1 : va === vb ? 0 : -1;
};

const dateSort = (dateA, dateB) => {
  var date1 = dateA === null ? Date.parse(new Date()) : Date.parse(dateA),
    date2 = dateB === null ? Date.parse(new Date()) : Date.parse(dateB);
  return moment(date1).diff(moment(date2));
};

export const Sorter = {
  DEFAULT: defaultSort,
  DATE: dateSort,
};

export const decimalConverter = (number, noCurSym, position) => {
  let currrencySymbl = !noCurSym ? STATIC_CONST.CURRENCY_SYMBOL : "";
  switch (position) {
    case STATIC_CONST.PRE:
      return typeof number === "number" && number !== 0
        ? currrencySymbl + ' ' + Math.round(number * 100) / 100
        : number;
    case STATIC_CONST.POST:
    default:
      return typeof number === "number" && number !== 0
        ? Math.round(number * 100) / 100 + currrencySymbl
        : number;
  }
};


export const renderKeyInfoColor = (val) => {
  switch (val) {
    case "VT-UTC1":
      return "amber"
    case "VT-UTC2":
      return "amber"
    case "VT-ICF1":
      return "amber"
    case "VT-Lost":
      return "red"
    default:
      return "grey"
  }
}
export const renderKeyInfoStageColor = (val) => {
  switch (val) {
    case "R":
      return "red"
    case "A":
      return "amber"
    case "G":
      return "green"
    default:
      return "blue"
  }
}
export const renderNRICColor = (nric) => {
  if (nric === 'NRIC') {
    return "green"
  } else {
    return "purple"
  }
}
export const renderRecomendationRuleColor = (val) => {
  switch (val) {
    case "R":
      return "red"
    case "G":
      return "green"
    default:
      return "amber"
  }
}


export function renderButtonTitle(roleType) {
  if (roleType === constRoleType.DCA_ASTRO_ADMIN) {
    return "Agency"
  } else if (roleType === constRoleType.DCA_AGENCY) {
    return "Agent"
  } else {
    return "User"
  }
}
