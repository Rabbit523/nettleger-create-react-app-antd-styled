import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import PageLoading from '../../../components/spin';
import ApiService from "../../../service/api.service";
import Notification from '../../../components/notification';
import { ThemeContext } from "../../../context/custom";
import { texts, moduleHeadCells } from '../../../constant';

const { Content } = Layout;

function createData(id, name, time) {
  return { id, name, time };
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
        const dateString = date.getUTCFullYear() + "/" + ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" + ("0" + date.getUTCDate()).slice(-2) + " " +
          ("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2) + ":" + ("0" + date.getUTCSeconds()).slice(-2);
        data.push(createData(row.id, row.name, dateString));
        return true;
      });
      setRowData(data);
      setLoading(false);
    }).catch(error => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
    const pathname = props.location.pathname.split('/')[2];
    setCurrentPath(pathname);
  }, [props]);

  const toggle = () => {
    setCollapseData();
  };

  const handleDeleteModule = (moduleId) => {
    // validate if sections are using the selected module
    setLoading(true);
    ApiService.deleteModule({moduleId}).then((res) => {
      Notification({title: texts.notificationSuccess, description: texts.notificationSuccess.delete, type: 'success'});
      window.location.reload();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
  };
  const handleDetailModule = (moduleId) => {
    props.history.push({ pathname: `/admin/modules/edit/${moduleId}`, state: { moduleId } });
  };
  const handleCreateModule = () => {
    props.history.push('/admin/modules/create');
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
          <EnhancedTable
            headCells={moduleHeadCells}
            rowData={rowData}
            tableName={texts.modules}
            onDeleteClick={handleDeleteModule}
            onDetailClick={handleDetailModule}
            onCreateClick={handleCreateModule}
          />
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Modules;
