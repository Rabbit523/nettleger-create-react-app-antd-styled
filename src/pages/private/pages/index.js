import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import Notification from '../../../components/notification';
import PageLoading from '../../../components/spin';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import ApiService from "../../../service/api.service";
import { ThemeContext } from "../../../context/custom";
import { texts, pageHeadCells } from '../../../constant';

const { Content } = Layout;

function createData(id, name, slug, status, time) {
  return { id, name, slug, status, time };
}

function Pages(props) {
  const [isLoading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const {collapsed, setCollapseData} = useContext(ThemeContext);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setLoading(true);
    ApiService.getAllPage().then(result => {
      let data = [];
      Object.values(result).map(row => {
        const date = new Date(row.date);
        const dateString = date.getUTCFullYear() + "/" + ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" + ("0" + date.getUTCDate()).slice(-2) + " " +
          ("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2) + ":" + ("0" + date.getUTCSeconds()).slice(-2);
        data.push(createData(row.id, row.name, row.slug, row.status === 0 ? 'Saved' : row.status === 1 ? 'Published': 'Unpublished', dateString));
        return true;
      });
      setRowData(data);
      setLoading(false);
    }).catch(error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
    setRowData([]);
    const pathname = props.location.pathname.split('/')[2];
    setCurrentPath(pathname);
  }, [props]);

  const toggle = () => {
    setCollapseData();
  };
  const handleDeleteItem = (pageId) => {
    setLoading(true);
    ApiService.deletePage({pageId}).then(() => {
      window.location.reload();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
  };
  const handleDetailItem = (pageId) => {
    props.history.push({ pathname: `/admin/pages/edit/${pageId}`, state: { pageId } });
  };
  const handleCreatePage = () => {
    props.history.push('/admin/pages/create');
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
          <EnhancedTable
            headCells={pageHeadCells}
            rowData={rowData}
            tableName={texts.pages}
            onDeleteClick={handleDeleteItem}
            onDetailClick={handleDetailItem}
            onCreateClick={handleCreatePage}
          />
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Pages;
