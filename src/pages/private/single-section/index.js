import React, { useState, useEffect } from "react";
import { Layout, Tabs, PageHeader, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import styled from 'styled-components';
import PageLoading from '../../../components/spin';
import DetailPageLayout from '../../../components/detailPageLayout';
import PageLayout from '../../../components/pageLayout';
import SkeletonTypography from '../../../components/skeleton';
import FieldSelectModal from '../../../components/fieldSelectModal';
import FieldDetailModal from '../../../components/fieldDetailModal';
import SelectModuleModal from '../../../components/selectModuleModal';
import SideDrawer from '../../../components/drawer';
import DraggableInfoBox from '../../../components/draggable';
import DraggableDataBox from '../../../components/draggableData';
import JsonModal from '../../../components/jsonModal';
import Notification from '../../../components/notification';
import ApiService from "../../../service/api.service";
import { texts, sectionFieldTypes } from '../../../constant';

const { Content } = Layout;
const { TabPane } = Tabs;
const STabs = styled(Tabs)`
  height: 100%;
  .ant-tabs-tab-btn {
    text-transform: capitalize;
  }
  .ant-tabs-content {
    height: 100%;
    overflow-y: scroll;
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
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [isModuleDetailModal, setModuleDetailModal] = useState(false);
  const [isSelectModuleModal, setSelectModuleModal] = useState(false);
  const [isDrawer, setDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modules, setModules] = useState([]);
  const [sectionId, setSectionId] = useState(0);
  const [nFields, setNFields] = useState(0);
  const [sectionName, setSectionName] = useState({});
  const [sectionContent, setSectionContent] = useState({});
  const [moduleDetail, setModuleDetail] = useState({});
  const [sectionData, setSectionData] = useState({name: '', content: {}});
  const [detailModalTitle, setDetailModalTitle] = useState('');
  
  useEffect(() => {
    ApiService.getAllModule().then(result => {
      const resultArr = Object.values(result);
      setModules(resultArr);
      if (props.location.state) {
        setIsEdit(true);
        setLoading(true);
        setSectionId(props.location.state.sectionId);
        ApiService.getSection(props.location.state).then((response) => {
          let data = {...sectionData};
          let dataContent = {...data.content};
          data.name = response.name;
          setSectionName({name: 'name', type: 'Text', id: 'name', val: response.name});

          const content = JSON.parse(response.content);
          let contents = {};
          Object.keys(content).forEach((key) => {
            if (!Array.isArray(content[key])) {
              contents[key] = content[key];
              dataContent[key] = content[key];
            } else {
              content[key].map((item) => {
                const selectedModule = resultArr.find((sel) => sel.id === parseInt(item.moduleId));
                contents[selectedModule.name] = {type: 'Module', name: selectedModule.name};
                if (dataContent.hasOwnProperty('modules')) {
                  dataContent['modules'].push(item);
                } else {
                  dataContent['modules'] = new Array(item);
                }
              });
            }
          });
          Object.assign(data.content, dataContent);
          setSectionData(data);
          setSectionContent(contents);
          setNFields(Object.keys(contents).length + 1);
          setLoading(false);
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
        });
      }
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
    });
  }, [props]);
  // FieldTypes Modal Callbacks
  const openSelectFieldDialog = () => {
    setFieldSelectModal(true);
  };
  const closeSelectFieldDialog = () => {
    setFieldSelectModal(false);
  };
  const handleFieldSelect = (param) => {
    setFieldSelectModal(false);
    setDetailModalTitle(param.type);
    param.type !== 'Module' ? setDetailModal(true) : setSelectModuleModal(true);
  };
  // FieldDetail Modal Callbacks // update state, close, open modal
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
  // SelectModule Modal Callbacks // update state, close, open modal
  const saveSelectModule = (param) => {
    setSelectModuleModal(false);
    const selectedModule = modules.find((sel) => sel.id === parseInt(param.moduleId));
    let content = {...sectionContent};
    let data = {...sectionData};
    let dataContent = { ...data.content};

    content[selectedModule.name] = {type: 'Module', name: selectedModule.name};
    setSectionContent(content); // add module content to the contents state
    if (dataContent.hasOwnProperty('modules')) {
      dataContent.modules.push(param);
      Object.assign(data.content, dataContent);
      setSectionData(data);
      setNFields(nFields + 1);
    } else {
      dataContent['modules'] = new Array(param);
      Object.assign(data.content, dataContent);
      setSectionData(data);
      setNFields(nFields + 1);
    }

  };
  const backSelectModuleModal = () => {
    setSelectModuleModal(false);
    setFieldSelectModal(true);
  };
  const closeSelectModuleModal = () => {
    setSelectModuleModal(false);
  };
  // Drawer Functions
  const openDrawer = () => {
    setDrawer(true); // show side panel
  };
  const closeDrawer = () => {
    setDrawer(false); // hide side panel
  };
  // open & close module detail json view modal
  const openModuleDetailModal = (param) => {
    setModuleDetailModal(true);
    if (param) {
      const selectedModule = modules.find((sel) => sel.name === param.name);
      const moduleContent = JSON.parse(selectedModule.content);
      setModuleDetail(moduleContent);
    }
  };
  const closeModuleDetailModal = () => {
    setModuleDetailModal(false);
  };
  // Update section data to state
  const updateFieldData = (param) => {
    if (param.name === 'name') {
      let content = {...sectionName};
      content.val = param.val;
      setSectionName(content); // update module name state
      let data = {...sectionData};
      data.name = param.val;
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
  const handleDeleteItem = (param) => {
    let content = {...sectionContent};
    let data = {...sectionData};
    let dataContent = {...data.content};
        
    delete content[param.name];
    setSectionContent(content); // create module content state
    if (param.type !== 'Module') {
      delete dataContent[param.name];
    } else {
      const selectedModuleId = modules.findIndex((item) => item.name === param.name);
      dataContent.modules.splice(selectedModuleId, 1);
    }
    data.content = dataContent;
    setSectionData(data);
    setNFields(nFields - 1); // create fields count state
  };
  // Save section data to DB
  const saveSection = () => {
    if (isEmpty(sectionName) || !sectionName.val) {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.name, type: 'error'});
    } else {
      setLoading(true);
      const data = {
        name: sectionData.name,
        content: JSON.stringify(sectionData.content)
      };
      if (isEdit) {
        ApiService.updateSection(sectionId, data).then(() => {
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
        ApiService.createSection(data).then(() => {
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
  // Set Sub section header buttons
  const detailButtons = [
    <Button key="1" type="primary" onClick={saveSection}>{texts.save}</Button>,
    <Button key="2" onClick={openDrawer} className="btn-drawer"> <MoreOutlined /> </Button>
  ];

  return (
    <DetailPageLayout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={texts.detailSection}
        extra={detailButtons}
      />
      <PageLayout>
        <Content>
          <FieldSelectModal
            open={isFieldSelectModal}
            fieldTypes={sectionFieldTypes}
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
          <SelectModuleModal
            open={isSelectModuleModal}
            type={detailModalTitle}
            modules={modules}
            handleClose={closeSelectModuleModal}
            handleBack={backSelectModuleModal}
            handleClick={saveSelectModule}
          />
          <JsonModal
            open={isModuleDetailModal}
            jsonData={moduleDetail}
            title={texts.detailModule}
            handleClose={closeModuleDetailModal}
          />
          <SideDrawer
            visible={isDrawer}
            type={texts.section}
            fields={nFields}
            onClose={closeDrawer}
            onAdd={openSelectFieldDialog}
          />
          <STabs defaultActiveKey="1">
            <TabPane tab={texts.fields + " (" + nFields + ")"} key="1">
              {isEdit ? 
                <React.Fragment>
                  <DraggableDataBox data={sectionName} onClick={updateFieldData}/>
                  {sectionContent && Object.values(sectionContent).map((item, index) => (
                    <DraggableInfoBox data={item} onClick={handleDeleteItem} openDetailModule={openModuleDetailModal} key={index} />
                  ))}
                </React.Fragment>
                :
                <React.Fragment>
                  {isEmpty(sectionContent) && isEmpty(sectionName) && <SkeletonTypography />}
                  {!isEmpty(sectionName) && <DraggableDataBox data={sectionName} onClick={updateFieldData}/>}
                  {!isEmpty(sectionContent) && Object.values(sectionContent).map((item, index) => (
                    <DraggableInfoBox data={item} onClick={handleDeleteItem} openDetailModule={openModuleDetailModal} key={index} />
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
