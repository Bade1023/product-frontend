import { notification } from "antd";

const notify = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const NotificationHelper = {
  notify,
  // openNotificationWithIcon,
};
