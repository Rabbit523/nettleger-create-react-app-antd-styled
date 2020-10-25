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
import DraggableBox from '../../../components/draggable';
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

export default function SingleSection(props) {
  const [isLoading, setLoading] = useState(false);
  const [sectionId, setSectionId] = useState(0);
  const [sectionName, setSectionName] = useState({});
  const [sectionContent, setSectionContent] = useState({});
  const [sectionData, setSectionData] = useState({name: '', content: {}});
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
      setSectionId(props.location.state);
      ApiService.getSection({id: props.location.state}).then((response) => {
        const contents = JSON.parse(response.content);
        setSectionContent(contents);
        setSectionName(response.name);
        setNFields(contents.length + 1);
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
      let content = {...sectionContent};
      let data = {...sectionData};
      if(!isUnique(param.name, content)) {
        content[param.name] = param;
        setSectionContent(content); // create module content state
        let tmp = {};
        tmp[param.name] = param;
        Object.assign(data.content, tmp);
        setSectionData(data);
        setNFields(nFields + 1); // create fields count state
      } else {
        Notification({title: texts.notificationErr, description: texts.notificationErrMsg.duplicate, type: 'error'});
      }
    } else {
      let content = {...sectionName};
      let data = {...sectionData};
      if (isEmpty(content)) {
        content[param.name] = param;
        Object.assign(data.name, param);
        setSectionName(param); // create module name state
        setSectionData(data);
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
    if (param.name === 'name') {
      let content = {...sectionName};
      content.val = param.val;
      setSectionName(content); // update module name state
      let data = {...sectionData};
      Object.assign(data.name, param.val);
      setSectionData(data);
    } else {
      let content = {...sectionContent};
      content[param.name]['val'] = param.val;
      setSectionContent(content); // update module content state
      let data = {...sectionData};
      Object.assign(data.content[param.name], param.val);
      setSectionData(data);
    }
  };
  // Save module data to DB
  const saveModule = () => {
    if (isEmpty(sectionName) || !sectionName.val) {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.name, type: 'error'});
    } else {
      setLoading(true);
      const data = {
        name: sectionData.name,
        content: JSON.stringify(sectionData.content)
      };
      if (isEdit) {
        ApiService.updateModule(sectionId, data).then(() => {
          Notification({title: texts.updateModule, description: texts.updateModuleSuccess, type: 'success'});
          setTimeout(() => {
            window.location.reload();
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
            window.location.reload();
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
                  <DraggableBox data={sectionName} onClick={updateFieldData}/>
                  {sectionContent && Object.keys(sectionContent).map((item, index) => (
                    <DraggableBox data={item} onClick={updateFieldData} key={index}/>
                  ))}
                </React.Fragment>
                :
                <React.Fragment>
                  {isEmpty(sectionContent) && isEmpty(sectionName) && <SkeletonTypography />}
                  {!isEmpty(sectionName) && <DraggableBox data={sectionName} onClick={updateFieldData}/>}
                  {!isEmpty(sectionContent) && Object.values(sectionContent).map((item, index) => (
                    <DraggableBox data={item} onClick={updateFieldData} key={index} />
                  ))}
                </React.Fragment>
              }
            </TabPane>
            <TabPane tab={texts.jsonPreview} key="2">
              <ReactJson theme="solarized" src={sectionData} />
            </TabPane>
          </STabs>
        </Content>
      </PageLayout>
    </DetailPageLayout>
  );
};
