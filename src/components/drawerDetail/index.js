import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Tabs, Drawer } from 'antd';
import DraggableDataBox from '../draggableData';
import { texts } from '../../constant';

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
const SDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: #f7f9fa;
  }
`;

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export default function DrawerDetail(props) {
  const { visible, onClose, handleSend, modules, data, name } = props;
  const [isDetailDrawer, setDetailDrawer] = useState(false);
  const [moduleContent, setModuleContent] = useState({});
  const [moduleAmount, setModuleAmount] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [activeKey, setActiveKey] = useState("0");
  
  const onHandleSend = (param) => {
    let res = {...param};
    res['obj'] = name;
    if (param.val === 'module') {
      res['type'] = param.val;
      res['content'] = moduleData;
      res['moduleId'] = param.moduleId;
    }
    handleSend(res);
  };
  const onHandleDetail = (param) => {
    const selectedModule = modules.find((sel) => sel.name === param.name);
    const moduleContent = !isEmpty(selectedModule) && JSON.parse(selectedModule.content);
    const moduleX = Array.from(Array(parseInt(param.amount)).keys());
    setModuleContent(moduleContent);
    setModuleAmount(moduleX);
    setDetailDrawer(true);
  };
  const onHandleModuleSend = (param) => {
    // update all module values on detail box and save when save button clicked
    let res = [...moduleData];
    if (res[activeKey]) {
      res[activeKey][param.name] = param.val;
    } else {
      let obj = {};
      obj[param.name] = param.val;
      res[activeKey] = obj;
    }
    setModuleData(res);
  };
  const onDetailClose = () => {
    setDetailDrawer(false);
  };
  const onTabChange = (activeKey) => {
    setActiveKey(activeKey);
  };

  return (
    <SDrawer
      width={isMobile ? 360 : '60%'}
      placement='right'
      closable={false}
      onClose={onClose}
      visible={visible}
      title={texts.editSectionData}
    >
      <SDrawer
        width={isMobile ? 360 : '60%'}
        placement='right'
        closable={false}
        onClose={onDetailClose}
        visible={isDetailDrawer}
        title={texts.editModuleData}
      >
        <STabs activeKey={activeKey} onChange={onTabChange}>
          {moduleAmount.map((item) => (
            <TabPane tab={"Tab" + item} key={item}>
              {Object.values(moduleContent).map((sel, index) => (
                <DraggableDataBox data={sel} onSend={onHandleModuleSend} key={index} />
              ))}
            </TabPane>
          ))}
        </STabs>
      </SDrawer>
      {Object.values(data).map((item, index) => (
        <DraggableDataBox data={item} updatedJsonData={moduleData} onSend={onHandleSend} onDetail={onHandleDetail} modules={modules} key={index} />
      ))}
    </SDrawer>
  );
};

DrawerDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
