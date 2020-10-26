import React, { useState, useEffect } from "react";
import { Layout, Tabs, PageHeader, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view'
import styled from 'styled-components';
import PageLoading from '../../../components/spin';
import DetailPageLayout from '../../../components/detailPageLayout';
import PageLayout from '../../../components/pageLayout';
import SkeletonTypography from '../../../components/skeleton';
import FieldSelectModal from '../../../components/fieldSelectModal';
import FieldDetailModal from '../../../components/fieldDetailModal';
import SideDrawer from '../../../components/drawer';
import DraggableInfoBox from '../../../components/draggable';
import DraggableDataBox from '../../../components/draggableData';
import Notification from '../../../components/notification';
import ApiService from "../../../service/api.service";
import { texts } from '../../../constant';

const { Content } = Layout;
const { TabPane } = Tabs;
const STabs = styled(Tabs)`
  height: 100%;
  .ant-tabs-tab-btn {
    text-transform: capitalize;
  }
  .ant-tabs-content {
    height: 100%;
  }
`;

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};
function findKeyValueCount(key, obj) {
	var count = 0;
	var keys = Object.keys(obj);
	keys.forEach(function(k) {
		if(k === key) {
			count += 1;
		}
	});
	return count;
};
function isUnique(key, obj) {
	return findKeyValueCount(key, obj) === 1;
};
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export default function SingleModule(props) {
  const [isLoading, setLoading] = useState(false);
  const [moduleId, setModuleId] = useState(0);
  const [moduleName, setModuleName] = useState({});
  const [moduleContent, setModuleContent] = useState({});
  const [moduleData, setModuleData] = useState({name: '', content: {}});
  const [nFields, setNFields] = useState(0);
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [isDrawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState('');
  
  useEffect(() => {
    if (props.location.state) {
      setIsEdit(true);
      setLoading(true);
      setModuleId(props.location.state.moduleId);
      ApiService.getModule(props.location.state).then((response) => {
        const content = JSON.parse(response.content);
        setModuleData({name: response.name, content})
        setModuleContent(content);
        setModuleName({name: 'name', type: 'Text', id: 'name', val: response.name});
        setNFields(Object.size(content) + 1);
        setLoading(false);
      }).catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      });
    }
  }, [props]);
  // FieldTypes Modal Functions
  const openSelectFieldDialog = () => {
    setFieldSelectModal(true);
  };
  const closeSelectFieldDialog = () => {
    setFieldSelectModal(false);
  };
  const handleFieldSelect = (param) => {
    setFieldSelectModal(false);
    setDetailModalTitle(param.type);
    setDetailModal(true);
  };
  // FieldDetail Modal Functions
  const saveFieldDetail = (param) => {
    setDetailModal(false);
    if (param.name !== 'name') {
      let content = {...moduleContent};
      let data = {...moduleData};
      if(!isUnique(param.name, content)) {
        content[param.name] = param;
        setModuleContent(content); // create module content state
        let tmp = {};
        tmp[param.name] = param;
        Object.assign(data.content, tmp);
        setModuleData(data);
        setNFields(nFields + 1); // create fields count state
      } else {
        Notification({title: texts.notificationErr, description: texts.notificationErrMsg.duplicate, type: 'error'});
      }
    } else {
      let content = {...moduleName};
      let data = {...moduleData};
      if (isEmpty(content)) {
        content[param.name] = param;
        Object.assign(data.name, param);
        setModuleName(param); // create module name state
        setModuleData(data);
        setNFields(nFields + 1); // create fields count state
      }
    }
  };
  const backDetailModal = () => {
    setDetailModal(false);
    setFieldSelectModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };
  // Drawer Functions
  const openDrawer = () => {
    setDrawer(true); // show side panel
  };
  const closeDrawer = () => {
    setDrawer(false); // hide side panel
  };
  // Update module data to state
  const updateFieldData = (param) => {
    let content = {...moduleName};
    content.val = param.val;
    setModuleName(content); // update module name state
    let data = {...moduleData};
    data['name'] = param.val;
    setModuleData(data);
  };
  const handleDeleteItem = (param) => {
    let content = {...moduleContent};
    let data = {...moduleData};
    delete content[param.name];
    setModuleContent(content); // create module content state
    data.content = content;
    setModuleData(data);
    setNFields(nFields - 1); // create fields count state
  };
  // Save module data to DB
  const saveModule = () => {
    if (isEmpty(moduleName) || !moduleName.val) {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.name, type: 'error'});
    } else {
      setLoading(true);
      const data = {
        name: moduleData.name,
        content: JSON.stringify(moduleData.content)
      };
      if (isEdit) {
        ApiService.updateModule(moduleId, data).then(() => {
          Notification({title: texts.updateModule, description: texts.updateModuleSuccess, type: 'success'});
          setTimeout(() => {
            props.history.push('/admin/modules');
          }, 2000);
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
          setLoading(false);
        });
      } else {
        ApiService.createModule(data).then(() => {
          Notification({title: texts.createModule, description: texts.createModuleSuccess, type: 'success'});
          setTimeout(() => {
            props.history.push('/admin/modules');
          }, 2000);
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
          setLoading(false);
        });
      }
    }
  };
  // Set Sub module header buttons
  const detailButtons = !isEdit ? [
    <Button key="1" type="primary" onClick={saveModule}>{texts.save}</Button>,
    <Button key="2" onClick={openDrawer} className="btn-drawer"> <MoreOutlined /> </Button>
  ] : [
    <Button key="1" type="primary"> {texts.save}</Button>
  ];

  return (
    <DetailPageLayout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={texts.detailModule}
        extra={detailButtons}
      />
      <PageLayout>
        <Content>
          <FieldSelectModal
            open={isFieldSelectModal}
            handleClose={closeSelectFieldDialog}
            handleClick={handleFieldSelect}
          />
          <FieldDetailModal
            open={isDetailModal}
            type={detailModalTitle}
            handleClose={closeDetailModal}
            handleBack={backDetailModal}
            handleClick={saveFieldDetail}
          />
          <SideDrawer
            visible={isDrawer}
            type={texts.module}
            fields={nFields}
            onClose={closeDrawer}
            onAdd={openSelectFieldDialog}
          />
          <STabs defaultActiveKey="1">
            <TabPane tab={texts.fields + " (" + nFields + ")"} key="1">
              {isEdit ? 
                <React.Fragment>
                  <DraggableDataBox data={moduleName} onClick={updateFieldData}/>
                  {!isEmpty(moduleContent) && Object.values(moduleContent).map((item, index) => (
                    <DraggableInfoBox data={item} key={index} onClick={handleDeleteItem}/>
                  ))}
                </React.Fragment>
                :
                <React.Fragment>
                  {isEmpty(moduleContent) && isEmpty(moduleName) && <SkeletonTypography />}
                  {!isEmpty(moduleName) && <DraggableDataBox data={moduleName} onClick={updateFieldData}/>}
                  {!isEmpty(moduleContent) && Object.values(moduleContent).map((item, index) => (
                    <DraggableInfoBox data={item} key={index} onClick={handleDeleteItem} />
                  ))}
                </React.Fragment>
              }
            </TabPane>
            <TabPane tab={texts.jsonPreview} key="2">
              <ReactJson theme="solarized" src={moduleData} />
            </TabPane>
          </STabs>
        </Content>
      </PageLayout>
    </DetailPageLayout>
  );
};
