import React, { useContext } from "react";
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { SwitcherOutlined, LogoutOutlined, ControlOutlined, ApartmentOutlined } from '@ant-design/icons';
import { AuthContext } from "../../../context/auth";

const { Header, Content, Sider } = Layout;
const SFixedHeightLayout = styled(Layout)`
  height: calc(100vh - 64px);
`;
const SHeader = styled(Header)`
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
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
const SAvatarLayout = styled.div`
  img {
    width: 14em;
    height: 3em;
  }
`;
const SContentLayout = styled(Layout)`
  background: #f5f5f5;
  padding: 24px;
  overflow-y: auto;
`

function Pages(props) {
  const { setAuthData } = useContext(AuthContext);

  const logout = () => {
    setAuthData({ token: null });
  };
  return (
    <Layout>
      <SHeader>
        <SAvatarLayout>
          <img src='/images/nettleger-logo-white.svg' alt="logo" />
        </SAvatarLayout>
        <button onClick={logout}><LogoutOutlined />Logout</button>
      </SHeader>
      <SFixedHeightLayout>
        <Sider width={230}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<SwitcherOutlined />}>Pages</Menu.Item>
            <Menu.Item key="2" icon={<ApartmentOutlined />}>Steps</Menu.Item>
            <Menu.Item key="3" icon={<ControlOutlined />}>Modules</Menu.Item>
          </Menu>
        </Sider>
        <SContentLayout>
          <Content>
            Content
          </Content>
        </SContentLayout>
      </SFixedHeightLayout>
    </Layout>
  );
};

export default Pages;
