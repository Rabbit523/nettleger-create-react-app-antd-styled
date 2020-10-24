import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import PageLoading from '../../../components/spin';
import { ThemeContext } from "../../../context/custom";

const { Content } = Layout;

function Steps(props) {
  const [isLoading, setLoading] = useState(true);
  const {collapsed, setCollapseData} = useContext(ThemeContext);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const pathname = props.location.pathname.split('/')[2];
    setCurrentPath(pathname);
  }, [props]);

  const toggle = () => {
    setCollapseData();
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Steps;
