import React from "react";
import { Layout } from 'antd';
import styled from 'styled-components';

const SContentLayout = styled(Layout)`
  background: #f5f5f5;
  padding: 24px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform 0.5s ease,opacity 1s ease;
`;

export default function PageLayout(props) {
  return (
    <SContentLayout>
      {props.children}
    </SContentLayout>
  );
};
