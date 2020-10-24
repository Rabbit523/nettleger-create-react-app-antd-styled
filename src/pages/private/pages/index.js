import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import Notification from '../../../components/notification';
import PageLoading from '../../../components/spin';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import ApiService from "../../../service/api.service";
import { ThemeContext } from "../../../context/custom";
import { texts } from '../../../constant';

const { Content } = Layout;
const headCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Name' },
  { id: 'slug', align: true, disablePadding: false, label: 'Slug' },
  { id: 'status', align: true, disablePadding: false, label: 'Status' },
  { id: 'time', align: true, disablePadding: false, label: 'Updated Time' },
  { id: 'action', align: true, disablePadding: false, label: 'Action' },
];
function createData(id, name, slug, status, time) {
  return { id, name, slug, status, time };
}
const rowData = [
  createData(1, 'Cupcake', 305, 3.7, 67),
  createData(2, 'Donut', 452, 25.0, 51),
  createData(3, 'Eclair', 262, 16.0, 24),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24),
  createData(5, 'Gingerbread', 356, 16.0, 49),
  createData(6, 'Honeycomb', 408, 3.2, 87),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37),
  createData(8, 'Jelly Bean', 375, 0.0, 94),
  createData(9, 'KitKat', 518, 26.0, 65),
  createData(10, 'Lollipop', 392, 0.2, 98),
  createData(11, 'Marshmallow', 318, 0, 81),
  createData(12, 'Nougat', 360, 19.0, 9),
  createData(13, 'Oreo', 437, 18.0, 63),
];

function Pages(props) {
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
    setLoading(true);
    ApiService.deletePage(selected).then(() => {
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
            headCells={headCells}
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
