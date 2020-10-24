import React from "react";
import { Layout } from 'antd';
import styled from 'styled-components';

const SLayout = styled(Layout)`
  position: relative;
  .ant-page-header {
    padding: 10px 24px !important;
    .btn-drawer {
      border: none;
      padding: 0;
      margin: 0;
      .anticon {
        font-size: 25px;
        vertical-align: middle;
      }
    }
    @media (max-width: 480px) {
      padding: 10px !important;
      .btn-drawer {
        .anticon {
          font-size: 20px;
        }
      }
    }
  }
`;

export default function DetailPageLayout(props) {
  return (
    <SLayout>
      {props.children}
    </SLayout>
  );
};
