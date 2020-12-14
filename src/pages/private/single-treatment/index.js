import React, { useState, useEffect } from "react";
import { Layout, Tabs, PageHeader, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view'
import styled from 'styled-components';
import PageLoading from '../../../components/spin';
import DetailPageLayout from '../../../components/detailPageLayout';
import PageLayout from '../../../components/pageLayout';
import FieldSelectModal from '../../../components/fieldSelectModal';
import FieldDetailModal from '../../../components/fieldDetailModal';
import JsonModal from '../../../components/jsonModal';
import SideDrawer from '../../../components/drawer';
import DraggableInfoBox from '../../../components/draggable';
import DraggableDataBox from '../../../components/draggableData';
import Notification from '../../../components/notification';
import ApiService from "../../../service/api.service";
import { texts, treatmentFieldTypes } from '../../../constant';

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
const treatmentBasicContent = {
  basic: [
    { id: 'name', name: 'name', type: 'Text' },
    { id: 'card_description', name: 'card_description', type: 'Text' },
    { id: 'card_cost', name: 'card_cost', type: 'Number' },
  ],
  step1: [
    { id: 'description', name: 'description', type: 'RichText' }
  ],
  step2: []
};
const treatmentBasicData = {
  name: "",
  card_description: "",
  card_cost: "",
  steps: {
    step1: {description: "" }
  }
};
function treatmentValidation(obj) {
  const validationKeys = ['name', 'card_description', 'card_cost'];
  let isValidated = true;
  validationKeys.forEach((key) => {
    if (!obj[key]) {
      isValidated = false;
    }
  });
  return isValidated;  
};

export default function SingleTreatment(props) {
  const [isLoading, setLoading] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [treatmentId, setTreatmentId] = useState(0);
  const [treatmentContent, setTreatmentContent] = useState(treatmentBasicContent);
  const [treatmentData, setTreatmentData] = useState(treatmentBasicData);
  const [nFields, setNFields] = useState(0);
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [isDetailModal, setDetailModal] = useState(false);
  const [detailFormGroup, setDetailFormGroup] = useState({});
  const [detailContentFormGroup, setDetailContentFormGroup] = useState({});
  const [isJsonModal, setJsonModal] = useState(false);
  const [isDrawer, setDrawer] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState('');
  const [activeKey, setActiveKey] = useState("basic");

  useEffect(() => {
    if (props.location.state) {
      setEdit(true);
      setTreatmentId(props.location.state.treatmentId);
      ApiService.getTreatment(props.location.state).then((response) => {
        let treatData = treatmentBasicData;
        let treatContent = response.content ? JSON.parse(response.content) : {};
        let nFields = 0;
        Object.keys(response).forEach((key) => {
          if (treatContent.hasOwnProperty(key)) {
            treatContent[key]['val'] = response[key];
          }
          if (key !== 'id' && key !== 'date' && key !== 'content') {
            if (key === 'steps') {
              treatData[key] = JSON.parse(response[key]);
            } else {
              treatData[key] = response[key];
            }
            nFields ++;
          }
        });
        setTreatmentContent(treatContent);
        setTreatmentData(treatData);
        setNFields(nFields);
        setLoading(false);
      }).catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
        setLoading(false);
      });
    } else {
      setLoading(false);
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
    const treatContent = {...treatmentContent};
    const treatData = {...treatmentData};
    if (param.type !== 'FormGroup') {
      const findResult = treatmentContent[activeKey].find((item) => item.name === param.name);
      if (!findResult) {
        let tmp = {};
        tmp[param.name] = param;
        treatContent[activeKey].push(param);
        if (activeKey !== 'basic') {
          treatData.steps[activeKey][param.name] = "";
        } else {
          treatData[param.name] = param;
        }
      } else {
        Notification({title: texts.notificationErr, description: texts.notificationErrMsg.duplicate, type: 'error'});
      }
    } else {
      if (activeKey !== 'step2') {
        Notification({title: texts.notificationErr, description: texts.notificationErrMsg.addForm, type: 'error'});
      } else {
        treatContent[activeKey].push({ type: param.type, name: param.title });
        if (!treatData.steps.hasOwnProperty(activeKey)) {
          treatData.steps[activeKey] = [];
        }
        treatData.steps[activeKey].push({ title: param.title, description: param.description });
      }
    }
    setTreatmentContent(treatContent);
    setTreatmentData(treatData);
  };
  const backDetailModal = () => {
    setDetailModal(false);
    setFieldSelectModal(true);
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };
  // FormField Modal Functions
  const handleStep2Data = (param) => {
    let treatContent = {...treatmentContent};
    const curTreatContentIndex = treatContent[activeKey].findIndex(((form) => form.name === detailFormGroup.title));
    treatContent[activeKey][curTreatContentIndex]['name'] = param.content[0].value;
    treatContent[activeKey][curTreatContentIndex]['content'] = param.content;
    setTreatmentContent(treatContent);
    let treatData = {...treatmentData};
    const curTreatDataIndex = treatData.steps[activeKey].findIndex(((form) => form.title === detailFormGroup.title));
    treatData.steps[activeKey][curTreatDataIndex] = param.data;
    setTreatmentData(treatData);
    setJsonModal(false);
  };
  const openJsonModal = (param) => {
    const selectedFormContent = treatmentContent[activeKey].find((content) => content.name === param.name);
    setDetailContentFormGroup(selectedFormContent.hasOwnProperty('content') ? selectedFormContent.content : []);
    const selectedForm = treatmentData.steps[activeKey].find((form) => form.title === param.name);
    setDetailFormGroup(selectedForm);
    setJsonModal(true);
  };
  const closeJsonModal = () => {
    setJsonModal(false);
  };
  // Drawer Functions
  const openDrawer = () => {
    setDrawer(true); // show side panel
  };
  const closeDrawer = () => {
    setDrawer(false); // hide side panel
  };
  // Update treatment data to state
  const updateFieldData = (param) => {
    let treatmentObj = {...treatmentContent};
    let treatmentArr = {...treatmentData};
    let treatment = treatmentObj[param.type].find((obj) => obj.name === param.name);
    if (treatment) {
      treatment['val'] = param.val;
    }
    setTreatmentContent(treatmentObj);
    Object.keys(treatmentArr).forEach((key) => {
      if (param.type === 'basic') {
        if (key === param.name) {
          treatmentArr[key] = param.val;
        }
      } else {
        Object.keys(treatmentArr['steps'][param.type]).forEach((key) => {
          if (key === param.name) {
            treatmentArr['steps'][param.type][key] = param.val;
          }
        });
      }
    });
    setTreatmentData(treatmentArr);
  };
  const handleDeleteItem = (param) => {

  };
  // Save treatment data to DB
  const saveTreatment = () => {
    if (!treatmentValidation(treatmentData)) {
      Notification({title: texts.notificationErr, description: texts.notificationErrMsg.treatment, type: 'error'});
    } else {
      setLoading(true);
      treatmentData['content'] = treatmentContent;
      if (isEdit) {
        ApiService.updateTreatment(treatmentId, treatmentData).then(() => {
          Notification({title: texts.updateModule, description: texts.updateModuleSuccess, type: 'success'});
          setTimeout(() => {
            props.history.push('/admin/treatments');
          }, 2000);
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
          setLoading(false);
        });
      } else {
        ApiService.createTreatment(treatmentData).then(() => {
          Notification({title: texts.createTreatment, description: texts.createTreatmentSuccess, type: 'success'});
          setTimeout(() => {
            props.history.push('/admin/treatments');
          }, 2000);
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
          setLoading(false);
        });
      }
    }
  };
  // Set Sub treatment header buttons
  const detailButtons = [
    <Button key="1" type="primary" onClick={saveTreatment}>{texts.save}</Button>,
    <Button key="2" onClick={openDrawer} className="btn-drawer"> <MoreOutlined /> </Button>
  ];
  const onTabChange = (activeKey) => {
    setActiveKey(activeKey);
  };
  return (
    <DetailPageLayout>
      {isLoading && <PageLoading isLoading={isLoading} />}
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={texts.detailTreatment}
        extra={detailButtons}
      />
      <PageLayout>
        <Content>
          <FieldSelectModal
            open={isFieldSelectModal}
            fieldTypes={treatmentFieldTypes}
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
          <JsonModal
            open={isJsonModal}
            jsonData={detailFormGroup}
            jsonContent={detailContentFormGroup}
            title={texts.detailFormGroup}
            handleSend={handleStep2Data}
            handleClose={closeJsonModal}
          />
          <SideDrawer
            visible={isDrawer}
            type={texts.treatment}
            fields={nFields}
            onClose={closeDrawer}
            onAdd={openSelectFieldDialog}
          />
          <STabs defaultActiveKey="1">
            <TabPane tab={texts.fields + " (" + nFields + ")"} key="1">
              <Tabs defaultActiveKey="basic" tabPosition="right" onChange={onTabChange}>
                <TabPane tab={texts.basic} key="basic">
                  {treatmentContent.basic.map((item, index) => (
                    <DraggableDataBox data={item} type="basic" onSend={updateFieldData} key={index} />
                  ))}
                </TabPane>
                <TabPane tab={texts.step1} key="step1">
                  {treatmentContent.step1.map((item, index) => (
                    <DraggableDataBox data={item} type="step1" onSend={updateFieldData} key={index} />
                  ))}
                </TabPane>
                <TabPane tab={texts.step2} key="step2">
                  {treatmentContent.step2.map((item, index) => (
                    <DraggableInfoBox data={item} type="step2" onClick={handleDeleteItem} openEditForm={openJsonModal} key={index} />
                  ))}
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab={texts.jsonPreview} key="2">
              <ReactJson theme="solarized" src={treatmentData} name="Treatment" />
            </TabPane>
          </STabs>
        </Content>
      </PageLayout>
    </DetailPageLayout>
  );
};
