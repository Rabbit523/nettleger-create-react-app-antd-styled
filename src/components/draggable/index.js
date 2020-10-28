import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { isMobile } from 'react-device-detect';
import { FormControlLabel, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Popconfirm, Button, Tooltip } from 'antd';
import { MoreOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { svgIcons } from '../../constant';
import { texts } from '../../constant';

const SAccordion = styled.div`
  display: flex;
  align-items: center;
  transform: translate(0px, 0px);
  padding: 0px 16px;
  min-height: 48px;
  background: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  margin-top: 16px;
`;
const SAccodionSummary = styled.div`
  flex: 1;
  .btnMore {
    margin-right: 18px;
  }
  .svgIcon {
    margin-right: 15px;
  }
`;
export default function DraggableInfoBox(props) {
  const { data, onClick, openDetailModule } = props;

  const onConfirm = () => {
    onClick(data);
  };
  
  const onCancel = () => {
    console.log("cancel delete field");
  };

  const onDetail = () => {
    (data.type === 'Module' || data.type === 'Section') && openDetailModule(data);
  }

  return (
    <Draggable disabled={isMobile}>
      <SAccordion>
        <SAccodionSummary onClick={onDetail}>
          <IconButton size="small" className="btnMore"><MoreOutlined /></IconButton>
          <FormControlLabel
            aria-label="Acknowledge"
            control={<img alt="" src={svgIcons[data.type]} className="svgIcon" />}
            label={data.name}
          />
        </SAccodionSummary>
        {data.name !== 'name' && 
          <Popconfirm
            title={texts.deleteFieldQue}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText={texts.yes}
            cancelText={texts.no}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Tooltip title="delete">
              <Button danger type="text" icon={<DeleteForeverIcon />}/>
            </Tooltip>
          </Popconfirm>
        }
      </SAccordion>
    </Draggable>
  );
};

DraggableInfoBox.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
