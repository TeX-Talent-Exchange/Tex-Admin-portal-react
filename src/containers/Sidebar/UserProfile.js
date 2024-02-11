import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "antd";
//import { Link } from "react-router-dom";
import { userSignout } from "../../appRedux/actions/Auth";
//import { UrlNavigation } from "../../components/commons/UrlNavigation";
//import { constRoleType } from "../../constants/ConstRoleTypes";

const UserProfile = () => {
  const dispatch = useDispatch();
  // const username = useSelector(({auth}) => auth.authUser.username)
  const currentUser = useSelector(({ auth }) => auth);
  //const roleType = useSelector(({ auth }) => auth?.authUser?.roleType);
  // const urlPath = UrlNavigation();
  const handleSignout = () => {
    dispatch(userSignout(currentUser));
  };


  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li>
        <Link
          to={urlPath + `/customer360`}
        >
          Customer 360
        </Link>
      </li>
      {(roleType === constRoleType.SUPERADMIN) && (<li>
        <Link
          to="/auditlogs/useraudittrail"
        >
          User Audit Trail
        </Link>
      </li>)} */}

      <li onClick={handleSignout}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        {/* <Avatar src='https://via.placeholder.com/150x150'
                  className="gx-size-20 gx-pointer gx-mr-2" alt=""/> */}
        <i className="icon icon-avatar" />
        <span className="gx-avatar-name">
          {currentUser?.authUser?.username}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
