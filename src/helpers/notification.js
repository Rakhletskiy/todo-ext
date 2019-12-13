import React from 'react';
import { notification, Icon } from 'antd';
import 'antd/dist/antd.css';

const Message = props => {
  return <h3 style={{ color: props.color }}>{props.message}</h3>;
};

export const openNotification = (message, descr, isSuccess) => {
  notification.open({
    message: <Message message={message} color={isSuccess ? '#00b200' : '#E51616'} />,
    description: descr,
    duration: 4,
    icon: <Icon type={isSuccess ? 'smile' : 'frown'} style={{ color: isSuccess ? '#00b200' : '#E51616' }} />
  });
};
