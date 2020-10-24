import React, { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import { Layout } from 'antd';
import MainHeader from '../../components/mainHeader';
import PageSider from '../../components/pageSider';

import { AuthContext } from "../../context/auth";
import { ThemeContext } from "../../context/custom";


const SFixedHeightLayout = styled(Layout)`
  height: calc(100vh - 64px);
`;

function PrivateLayout(props) {
  const { auth, setAuthData } = useContext(AuthContext);
  const { collapsed } = useContext(ThemeContext);
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const logout = () => {
    setAuthData({ token: null });
  };

  useEffect(() => {
    const pathname = props.location.pathname.split('/')[2];
    setSelectedKeys([pathname === 'pages' ? '1' : pathname === 'sections' ? '2' : pathname === 'modules' ? '3' : '4']);
  }, [props]);

  return (
    <Layout>
      <MainHeader logout={logout} auth={auth} color={false} />
      <SFixedHeightLayout>
        <PageSider selectedKeys={selectedKeys} collapsed={collapsed} />
        <Layout>
          {props.children}
        </Layout>
      </SFixedHeightLayout>
    </Layout>
  );
};

export default PrivateLayout;