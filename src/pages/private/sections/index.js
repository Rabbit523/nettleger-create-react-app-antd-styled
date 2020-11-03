import React, { useState, useEffect, useContext } from "react";
import { Layout } from 'antd';
import EnhancedTable from '../../../components/table';
import PageHeader from '../../../components/pageHeader';
import PageLayout from '../../../components/pageLayout';
import PageLoading from '../../../components/spin';
import ApiService from "../../../service/api.service";
import Notification from '../../../components/notification';
import { ThemeContext } from "../../../context/custom";
import { texts, sectionHeadCells } from '../../../constant';

const { Content } = Layout;

function createData(id, name, time) {
  return { id, name, time };
}

function Sections(props) {
  const [isLoading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const {collapsed, setCollapseData} = useContext(ThemeContext);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setLoading(true);
    ApiService.getAllSection().then(result => {
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

  const handleDeleteSection = (sectionId) => {
    // validate if sections are using the selected module
    setLoading(true);
    ApiService.deleteSection({sectionId}).then((res) => {
      Notification({title: texts.notificationSuccess, description: texts.notificationSuccess.delete, type: 'success'});
      window.location.reload();
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      setLoading(false);
    });
  };
  const handleDetailSection = (sectionId) => {
    props.history.push({ pathname: `/admin/sections/edit/${sectionId}`, state: { sectionId } });
  };
  const handleCreateSection = () => {
    props.history.push('/admin/sections/create');
  };

  return (
    <Layout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader currentPath={currentPath} collapsed={collapsed} toggle={toggle} />
      <PageLayout>
        <Content>
          <EnhancedTable
              headCells={sectionHeadCells}
              rowData={rowData}
              tableName={texts.sections}
              onDeleteClick={handleDeleteSection}
              onDetailClick={handleDetailSection}
              onCreateClick={handleCreateSection}
            />
        </Content>
      </PageLayout>
    </Layout>
  );
};

export default Sections;
