import React, { useState, useEffect } from "react";
import { Layout, PageHeader, Menu, Dropdown, Button } from 'antd';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';
import PageLoading from '../../../components/spin';
import DetailPageLayout from '../../../components/detailPageLayout';
import PageLayout from '../../../components/pageLayout';
import SkeletonTypography from '../../../components/skeleton';
import FieldSelectModal from '../../../components/fieldSelectModal';
import FieldDetailModal from '../../../components/fieldDetailModal';
import SideDrawer from '../../../components/drawer';
import DraggableBox from '../../../components/draggable';
import ApiService from "../../../service/api.service";
import { texts, customPageData } from '../../../constant';

const { Content } = Layout;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">{texts.publish}</Menu.Item>
    <Menu.Item key="2">{texts.archive}</Menu.Item>
  </Menu>
);
function handleMenuClick(e) {
  console.log('click', e.key);
}

export default function SinglePage(props) {
  const [isLoading, setLoading] = useState(false);
  const [pageId, setPageId] = useState(0);
  const [pageData, setPageData] = useState({});
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
      setPageId(props.location.state);
      ApiService.getPage({id: props.location.state}).then((response) => {
        setPageData(response);
        setNFields(response.fields.length);
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
    console.log(param);
    setDetailModalTitle(param.type);
    setDetailModal(true);
  };
  // FieldDetail Modal Functions
  const saveFieldDetail = (param) => {
    console.log("detail field: ", param);
    setDetailModal(false);
    setDrawer(false);
    if (customPageData?.fields) {
      setPageData(customPageData.fields.push(param));
    } else {
      const newPage = {name: '', entry: '', fields: [] };
      newPage.push(param);
      setPageData(newPage);
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
    setDrawer(true);
  };
  const closeDrawer = () => {
    setDrawer(false);
  };
  // Update page data
  const updateFieldData = (data) => {
    console.log("update field: ", data);
  };
  // Save page data to DB
  const savePage = () => {
    // validate something
    const data = {};
    if (isEdit) {
      ApiService.updatePage(pageId, data).then(() => {
        window.location.reload();
      }).catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      });
    } else {
      ApiService.createPage(data).then((response) => {
        window.location.reload();
      }).catch((error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
      });
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
            type="Page"
            fields={nFields}
            onClose={closeDrawer}
            onAdd={openSelectFieldDialog}
          />
          {!isEdit ? <React.Fragment>
              {pageData.fields?.length === 0 && <SkeletonTypography />}
              {pageData.fields?.map((field, index) => (
                <DraggableBox
                  data={field}
                  onClick={updateFieldData}
                />
              ))}
            </React.Fragment>
            : <>
              ppp
            </>}
        </Content>
      </PageLayout>
    </DetailPageLayout>
  );
};
