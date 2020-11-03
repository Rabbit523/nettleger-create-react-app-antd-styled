import React, { useState, useEffect } from "react";
import { Layout, Tabs, PageHeader, Menu, Dropdown, Button } from 'antd';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import styled from 'styled-components';
import PageLoading from '../../../components/spin';
import DetailPageLayout from '../../../components/detailPageLayout';
import PageLayout from '../../../components/pageLayout';
import SkeletonTypography from '../../../components/skeleton';
import FieldSelectModal from '../../../components/fieldSelectModal';
import FieldDetailModal from '../../../components/fieldDetailModal';
import SelectModal from '../../../components/selectModal';
import SideDrawer from '../../../components/drawer';
import DraggableDataBox from '../../../components/draggableData';
import Notification from '../../../components/notification';
import ApiService from "../../../service/api.service";
import { texts, pageFieldTypes } from '../../../constant';
import DrawerDetail from "../../../components/drawerDetail";

const { Content } = Layout;
const { TabPane } = Tabs;
const STabs = styled(Tabs)`
  height: 100%;
  .ant-tabs-tab-btn {
    text-transform: capitalize;
  }
  .ant-tabs-content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">{texts.publish}</Menu.Item>
    <Menu.Item key="2">{texts.archive}</Menu.Item>
  </Menu>
);

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
function pageValidation(obj) {
  const validationKeys = ['name', 'meta_title', 'meta_description'];
  let isValidated = true;
  validationKeys.forEach((key) => {
    if (!obj.hasOwnProperty(key)) {
      isValidated = false;
    }
    if (!obj[key] && key !== 'meta_description') {
      isValidated = false;
    }
  });
  return isValidated;  
};
function handleMenuClick(e) {
  console.log('click', e.key);
}

export default function SinglePage(props) {
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDrawer, setDrawer] = useState(false);
  const [isDetailDrawer, setDetailDrawer] = useState(false);
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [isSelectModal, setSelectModal] = useState(false);
  const [pageId, setPageId] = useState(0);
  const [nFields, setNFields] = useState(0); 
  const [modules, setModules] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});
  const [pageContent, setPageContent] = useState({});
  const [pageData, setPageData] = useState({});
  const [detailModalTitle, setDetailModalTitle] = useState('');
  
  useEffect(() => {
    ApiService.getAllSection().then(result => {
      const resultArr = Object.values(result);
      setSections(resultArr);
      ApiService.getAllModule().then(result => {
        const resultArr = Object.values(result);
        setModules(resultArr);
        if (props.location.state) {
          setIsEdit(true);
          setLoading(true);
          setPageId(props.location.state);
          ApiService.getPage(props.location.state).then((response) => {
            setPageData(response);
            setNFields(response.fields.length);
            setLoading(false);
          });
        }
      });
    }).catch((error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
    });
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
    param.type !== 'Section' ? setDetailModal(true) : setSelectModal(true);
  };
  // FieldDetail Modal Functions
  const saveFieldDetail = (param) => {
    setDetailModal(false);
    let content = {...pageContent};
    let data = {...pageData};
    if (!isUnique(param.name, content)) {
      content[param.name] = param;
      data[param.name] = "";
      setPageContent(content);
      setPageData(data);
      setNFields(nFields + 1);
    } else {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.duplicate, type: 'error'});
    }
  };
  const backDetailModal = () => {
    setDetailModal(false);
    setFieldSelectModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };
  // Select Modal Callbacks // update state, close, open modal
  const saveSelect = (param) => {
    setSelectModal(false);
    const selectedSection = sections.find((sel) => sel.id === parseInt(param.id));
    let content = {...pageContent};
    let data = {...pageData};
    content[selectedSection.name] = {type: 'Section', name: selectedSection.name};
    setPageContent(content);

    const sectionContent = JSON.parse(selectedSection.content);
    if (!data.hasOwnProperty('sections')) {
      data['sections'] = {};
    }
    data['sections'][selectedSection.name] = sectionContent;
    setPageData(data);
    setNFields(nFields + 1);
  };
  const backSelectModal = () => {
    setSelectModal(false);
    setFieldSelectModal(true);
  };
  const closeSelectModal = () => {
    setSelectModal(false);
  };
  // Drawer Functions
  const openDrawer = () => {
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  const openDetailSection = (data) => {
    const section = sections.find((item) => item.name === data.name);
    let sectionContent = JSON.parse(section.content);
    let updatedData = {...sectionContent};

    if (sectionContent.hasOwnProperty('modules')) {
      delete sectionContent['modules'];
      updatedData.modules.forEach((sel) => {
        const selectedModule = modules.find((item) => item.id === parseInt(sel.moduleId));
        sectionContent[selectedModule.name] = {type: 'Module', name: selectedModule.name, amount: sel.amount};
      });
    }
    setSelectedSection({name: section.name, content: sectionContent});
    setDetailDrawer(true);
  };
  const closeDetailDrawer = () => {
    setDetailDrawer(false);
  };
  // Update page data
  const updateFieldData = (param) => {
    let data = {...pageData};
    data[param.name] = param.val;
    setPageData(data);
  };
  const updateSectionData = (param) => {
    let data = {...pageData};
    Object.keys(data['sections']).forEach((key) => {
      if (key === param.obj) {
        if (param.hasOwnProperty('type')) {
          const selectedModuleIndex = data['sections'][key]['modules'].findIndex((sel) => parseInt(sel.moduleId) === param.moduleId);
          console.log({selectedModuleIndex});
          // data key value will save module data for page
          if (selectedModuleIndex >= 0) {
            let selectedModule = data['sections'][key]['modules'][selectedModuleIndex];
            console.log({selectedModule});
            selectedModule['content'] = param.content;
          }
        } else {
          data['sections'][key][param.name] = param.val;
        }
      }
    });
    setPageData(data);
  };
  // Save page data to DB
  const savePage = () => {
    // validate something
    if (!pageValidation(pageData)) {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.page, type: 'error'});
    } else {
      setLoading(true);
      if (isEdit) {
        ApiService.updatePage(pageId, pageData).then(() => {
          window.location.reload();
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
        });
      } else {
        ApiService.createPage(pageData).then((response) => {
          window.location.reload();
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
        });
      }
    }
  };
  // Set Sub page header buttons
  const detailButtons = !isEdit ? [
    <Dropdown overlay={menu} key="1">
      <Button>{texts.actions} <CaretDownOutlined /></Button>
    </Dropdown>,
    <Button key="2" type="primary" onClick={savePage}>{texts.save}</Button>,
    <Button key="3" onClick={openDrawer} className="btn-drawer"> <MoreOutlined /> </Button>
  ] : [
    <Dropdown overlay={menu} key="1">
      <Button>{texts.actions} <CaretDownOutlined /></Button>
    </Dropdown>,
    <Button key="2" type="primary"> {texts.save}</Button>
  ];

  return (
    <DetailPageLayout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={texts.detailPage}
        extra={detailButtons}
      />
      <PageLayout>
        <Content>
          <FieldSelectModal
            open={isFieldSelectModal}
            fieldTypes={pageFieldTypes}
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
          <SelectModal
            open={isSelectModal}
            type={detailModalTitle}
            data={sections}
            handleClose={closeSelectModal}
            handleBack={backSelectModal}
            handleClick={saveSelect}
          />
          <SideDrawer
            visible={isDrawer}
            type="Page"
            fields={nFields}
            onClose={closeDrawer}
            onAdd={openSelectFieldDialog}
          />
          <DrawerDetail
            visible={isDetailDrawer}
            onClose={closeDetailDrawer}
            data={!isEmpty(selectedSection) && selectedSection.content}
            name={!isEmpty(selectedSection) && selectedSection.name}
            modules={modules}
            handleSend={updateSectionData}
          />
          <STabs defaultActiveKey="1">
            <TabPane tab={texts.fields + " (" + nFields + ")"} key="1">
              {isEdit ? 
                <React.Fragment>
                  {pageContent && Object.values(pageContent).map((item, index) => (
                    <DraggableDataBox data={item} onSend={updateFieldData} onDetail={openDetailSection} sections={sections} key={index} />
                  ))}
                </React.Fragment>
                :
                <React.Fragment>
                  {isEmpty(pageContent) && <SkeletonTypography />}
                  {!isEmpty(pageContent) && Object.values(pageContent).map((item, index) => (
                    <DraggableDataBox data={item} onSend={updateFieldData} onDetail={openDetailSection} sections={sections} key={index} />
                  ))}
                </React.Fragment>
              }
            </TabPane>
            <TabPane tab={texts.jsonPreview} key="2">
              <ReactJson theme="solarized" src={pageData} name="Page"/>
            </TabPane>
          </STabs>
        </Content>
      </PageLayout>
    </DetailPageLayout>
  );
};
