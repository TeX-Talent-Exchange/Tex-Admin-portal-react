import React from "react";
import { notification } from "antd";
import { notificationPosition } from "../../constants/styleConstants";

export const HandleNotification = (
  type,
  message,
  description,
  placement = { notificationPosition }
) => {
  return notification[type]({
    message: message,
    description: <span id="message-id"> {description}</span>,
    placement,
  });
};
