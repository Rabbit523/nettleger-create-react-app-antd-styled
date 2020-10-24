import React from 'react';
import { notification } from 'antd';
import { CheckCircleTwoTone, InfoCircleTwoTone, WarningTwoTone } from '@ant-design/icons';

export default function Notification(props) {
  notification.open({
    message: props.title,
    description: props.description,
    icon: props.type === 'success' ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : props.type === 'info' ? <InfoCircleTwoTone /> : <WarningTwoTone twoToneColor="#eb2f96" />
  });
};