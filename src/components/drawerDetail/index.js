import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Tabs, Drawer } from 'antd';
import DraggableDataBox from '../draggableData';
import DraggableInfoBox from '../draggable';
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
  const { visible, onClose, handleSend, modules, data, updatedModule, name } = props;
  const [isDetailDrawer, setDetailDrawer] = useState(false);
  const [moduleData, setModuleData] = useState([]);
  const [updatedData, setUpdateData] = useState([]);
  const [activeKey, setActiveKey] = useState("0");
  
  useEffect(() => {
    if (updatedModule.length > 0) {
      modules.forEach((module) => {
        if (data.hasOwnProperty(module.name)) {
          const existingModule = modules.find((sel) => sel.name === module.name);
          const selectedModuleUpdated = updatedModule.find((sel) => parseInt(sel.moduleId) === existingModule.id);
          setUpdateData(selectedModuleUpdated.content ? selectedModuleUpdated.content : updatedData);
        }
      });
    }
  }, [updatedModule, moduleData, data, modules]);

  useEffect(() => {
    if (moduleData.length > 0) {
      setDetailDrawer(true);
    }
  }, [moduleData]);

  const onHandleSend = (param) => {
    let res = {...param};
    res['obj'] = name;
    if (param.val === 'module') {
      res['type'] = param.val;
      res['content'] = updatedData;
      res['moduleId'] = param.moduleId;
    }
    handleSend(res);
  };
  const onHandleDetail = (param) => {
    const selectedModule = modules.find((sel) => sel.name === param.name);
    const moduleContent = !isEmpty(selectedModule) && JSON.parse(selectedModule.content);
    let moduleData = [];
    for (let i = 0; i <param.amount; i ++) {
      moduleData.push(JSON.parse(JSON.stringify(moduleContent)));
    }

    if (updatedModule) {
      const selectedModuleUpdated = updatedModule.find((sel) => parseInt(sel.moduleId) === selectedModule.id);
      const selectedModuleContent = {...selectedModuleUpdated.content};
      (!isEmpty(selectedModuleContent) || !isEmpty(updatedData) ) && moduleData.forEach((item, key) => {
        Object.keys(item).forEach((sel) => {
          if (!isEmpty(selectedModuleContent) && !isEmpty(selectedModuleContent[key]) && selectedModuleContent[key].hasOwnProperty(sel)) {
            item[sel].val = selectedModuleContent[key][sel];
          }
          if (!isEmpty(updatedData) && !isEmpty(updatedData[key]) && updatedData[key].hasOwnProperty(sel)) {
            item[sel].val = updatedData[key][sel];
          }
        });
      });
    }
    setModuleData(moduleData);
  };
  const onHandleModuleSend = (param) => {
    // update all module values on detail box and save when save button clicked
    let res = [...updatedData];
    if (res[activeKey]) {
      res[activeKey][param.name] = param.val;
    } else {
      let obj = {};
      obj[param.name] = param.val;
      res[activeKey] = obj;
    }
    setUpdateData(res);
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
        <STabs activeKey={activeKey} defaultActiveKey="0" onChange={onTabChange}>
          {moduleData.map((item, key) => (
            <TabPane tab={"Tab" + key} key={key}>
              {Object.values(item).map((sel, index) => (
                <DraggableDataBox data={sel} onSend={onHandleModuleSend} key={index} />
              ))}
            </TabPane>
          ))}
        </STabs>
      </SDrawer>
      {Object.values(data).map((item, index) => {
        return item.type !== 'Treatment' ? <DraggableDataBox data={item} updatedJsonData={updatedData} onSend={onHandleSend} onDetail={onHandleDetail} modules={modules} key={index} />
          : <DraggableInfoBox data={item} key={index} />
      })}
    </SDrawer>
  );
};

DrawerDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
