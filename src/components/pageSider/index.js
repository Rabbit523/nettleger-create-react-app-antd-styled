import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { SwitcherOutlined, PicRightOutlined, FormOutlined, ApartmentOutlined } from '@ant-design/icons';
import { texts } from '../../constant';

const { Sider } = Layout;
const SSider = styled(Sider)`
  ul {
    height: 100%;
    border-right: 0;
    li {
      margin: 0;
      height: 58px;
      line-height: 58px;
    }
  }
  span {
    font-size: 18px;
    &.anticon {
      font-size: 20px;
    }
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const SItem = styled(Menu.Item)`
  display: flex;
  align-items: center;
  justify-content: ${props => props.collapsed === 'true' ? 'center' : 'flex-start'};
  margin: 0 !important;
  height: 58px !important;
  line-height: 58px !important;
  padding: 0 24px !important;
`;

export default function PageSider(props) {
  const { collapsed, selectedKeys } = props;
  return (
    <SSider width={240} trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" selectedKeys={selectedKeys}>
        <SItem key="1" icon={<SwitcherOutlined />} collapsed={collapsed.toString()}>
          <a href="/admin/pages">{texts.pages}</a>
        </SItem>
        <SItem key="2" icon={<PicRightOutlined />} collapsed={collapsed.toString()}>
          <a href="/admin/sections">{texts.sections}</a>
        </SItem>
        <SItem key="3" icon={<ApartmentOutlined />} collapsed={collapsed.toString()}>
          <a href="/admin/modules">{texts.modules}</a>
        </SItem>
        <SItem key="4" icon={<FormOutlined />} collapsed={collapsed.toString()}>
          <a href="/admin/steps">{texts.steps}</a>
        </SItem>
      </Menu>
    </SSider>
  );
};

PageSider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  selectedKeys: PropTypes.array.isRequired,
};
