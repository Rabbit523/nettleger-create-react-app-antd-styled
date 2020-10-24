import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import PageLoading from '../../../components/spin';
import ApiService from "../../../service/api.service";
import { ThemeContext } from "../../../context/custom";
import { texts } from '../../../constant';

const { Content } = Layout;
const headCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Name' },
  { id: 'status', align: true, disablePadding: false, label: 'Status' },
  { id: 'time', align: true, disablePadding: false, label: 'Updated Time' },
  { id: 'action', align: true, disablePadding: false, label: 'Action' },
];

function createData(id, name, status, time) {
  return { id, name, status, time };
}
const rowData = [
  createData(1, 'BannerModule', 305, 3.7),
  createData(2, 'IconCardModule', 452, 25.0),
  createData(3, 'InfoCardModule', 262, 16.0),
  createData(4, 'ImageCardModule', 159, 6.0),
  createData(5, 'ImageModule', 356, 16.0),
  createData(6, 'TextModule', 408, 3.2),
];

function Modules(props) {
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

  const handleDeleteItem = (selected) => {
    // validate if sections are using the selected module
    setLoading(true);
    ApiService.deletePage(selected).then(() => {
      window.location.reload();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: 'Error occurred', description: resMessage, type: 'error'});
      setLoading(false);
    });
  };
  const handleDetailItem = (moduleId) => {
    props.history.push({ pathname: `/admin/modules/edit/${moduleId}`, state: { moduleId } });
  };
  const handleCreatePage = () => {
    props.history.push('/admin/modules/create');
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
          <EnhancedTable
            headCells={headCells}
            rowData={rowData}
            tableName={texts.modules}
            onDeleteClick={handleDeleteItem}
            onDetailClick={handleDetailItem}
            onCreateClick={handleCreatePage}
          />
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Modules;
