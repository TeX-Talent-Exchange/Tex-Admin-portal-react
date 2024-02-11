import React, {useEffect} from 'react';
import CircularProgress from "components/CircularProgress/index";
import Auxiliary from "util/Auxiliary";
import {useDispatch, useSelector} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";
import {notification} from "antd";
import { notificationPosition } from "../../constants/styleConstants";

const InfoView = () => {

  const dispatch = useDispatch();

  const error = useSelector(({common}) => common.error);

  const loading = useSelector(({common}) => common.loading);
  const roleType = useSelector(({auth}) => auth?.authUser?.roleType);
  const message = useSelector(({common}) => common.message);

  const displayMessage = message;
  
  const setNotifyPosition = notificationPosition;
  const ipcc ='ipccuser';
  const openNotification = placement => {
    error && notification.error( { 
      message: "Invalid",
      description: <span id="message-id"> {error}</span>,
      placement, 
      duration:10
      });
    displayMessage && notification.success({ 
      message: "Success",
      description: <span id="message-id"> {displayMessage}</span>,
      placement, 
      duration:10
      });
  }

  useEffect(() => {
    if (error || message) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }

    openNotification(setNotifyPosition)
    // eslint-disable-next-line
  }, [error, message, dispatch, setNotifyPosition]);


  return (
    <Auxiliary>
      {loading && <div className={`gx-loader-view gx-loader-position ${roleType === ipcc? 'enable-nav': ''}`}>
        <CircularProgress/>
      </div>}
      </Auxiliary>
  );
};

export default InfoView;
