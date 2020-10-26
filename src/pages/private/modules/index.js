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

function Modules(props) {
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const {collapsed, setCollapseData} = useContext(ThemeContext);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    ApiService.getAllModule().then(result => {
      let data = [];
      Object.values(result).map(row => {
        const date = new Date(row.date);
        var dateString = date.getUTCFullYear() + "/" + ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" + ("0" + date.getUTCDate()).slice(-2) + " " +
          ("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2) + ":" + ("0" + date.getUTCSeconds()).slice(-2);
        data.push(createData(row.id, row.name, 'true', dateString));
        return true;
      });
      setRowData(data);
      setLoading(false);
    }).catch(error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: 'Error occurred', description: resMessage, type: 'error'});
      setLoading(false);
    });
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
