import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined } from '@ant-design/icons';

const SContentHeader = styled.div`
  background: #fff;
  padding: 15px;
  display: flex;
  align-items: center;
  .toggle-btn {
    margin-right: 15px;
    align-self: flex-end;
  }
  a {
    text-transform: capitalize;
    font-size: 15px;
  }
  span {
    &.anticon, &.ant-breadcrumb-separator {
      font-size: 18px;
    }
  }
  @media (max-width: 767px) {
    .toggle-btn {
      display: none;
    }
  }
`;

export default function PageHeader(props) {
  const { collapsed, currentPath, toggle } = props;
  return (
    <SContentHeader>
      <div className="toggle-btn">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle,
        })}
      </div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href={'/admin/' + currentPath}>
          {currentPath}
        </Breadcrumb.Item>
      </Breadcrumb>
    </SContentHeader>
  );
};

PageHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  currentPath: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired
};
