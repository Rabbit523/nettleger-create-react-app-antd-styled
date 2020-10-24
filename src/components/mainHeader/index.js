import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { svgIcons, texts } from '../../constant';

const { Header } = Layout;

const SHeader = styled(Header)`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.color === 'true' ? 'transparent' : '#001529'};
  img {
    width: 14em;
    height: 3em;
  }
  button {
    align-self: center;
    background: transparent;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    span {
      padding-right: 10px;
    }
    &:hover, &:focus {
      outline: none;
    }
  }
`;
export default function MainHeader(props) {
  const { logout, auth, color } = props;
  return (
    <SHeader color={color.toString()}>
      <img src={svgIcons.white_logo} alt="logo" />
      {auth.token && <button onClick={logout}><LogoutOutlined />{texts.logout}</button>}
    </SHeader>
  );
};

MainHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  color: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};
