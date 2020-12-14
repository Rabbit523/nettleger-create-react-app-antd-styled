import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import Notification from '../../../components/notification';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import PageLoading from '../../../components/spin';
import ApiService from "../../../service/api.service";
import { ThemeContext } from "../../../context/custom";
import { texts, treatmentHeadCells } from '../../../constant';

const { Content } = Layout;

function createData(id, name, cost, time) {
  return { id, name, cost, time };
}

function Treatments(props) {
  const [isLoading, setLoading] = useState(true);
  const {collapsed, setCollapseData} = useContext(ThemeContext);
  const [rowData, setRowData] = useState([]);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setLoading(true);
    ApiService.getAllTreatments().then(result => {
      let data = [];
      Object.values(result).map(row => {
        const date = new Date(row.date);
        const dateString = date.getUTCFullYear() + "/" + ("0" + (date.getUTCMonth()+1)).slice(-2) + "/" + ("0" + date.getUTCDate()).slice(-2) + " " +
          ("0" + date.getUTCHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2) + ":" + ("0" + date.getUTCSeconds()).slice(-2);
        data.push(createData(row.id, row.name, row.card_cost, dateString));
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

  const handleDeleteItem = (treatmentId) => {
    setLoading(true);
    ApiService.deleteTreatment({treatmentId}).then(() => {
      window.location.reload();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
  };
  const handleDetailItem = (treatmentId) => {
    props.history.push({ pathname: `/admin/treatments/edit/${treatmentId}`, state: { treatmentId } });
  };
  const handleCreatePage = () => {
    props.history.push('/admin/treatments/create');
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
          <EnhancedTable
            headCells={treatmentHeadCells}
            rowData={rowData}
            tableName={texts.treatments}
            onDeleteClick={handleDeleteItem}
            onDetailClick={handleDetailItem}
            onCreateClick={handleCreatePage}
          />
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Treatments;
