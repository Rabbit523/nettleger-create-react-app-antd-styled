import React from "react";
import { Spin } from 'antd';
import styled from 'styled-components';

const SSpin = styled(Spin)`
  text-align: center;
  background: rgba(255,255,255,0.5);
  border-radius: 4px;
  z-index: 1;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PageLoading(props) {
  return (
    <SSpin
      spinning={props.isLoading}
      size="large"
    />
  );
};
