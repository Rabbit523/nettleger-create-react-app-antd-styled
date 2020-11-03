import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { isMobile } from 'react-device-detect';
import { Drawer, Button, Input, Divider } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { texts, pageModelValidationJson, modelValidationJson } from '../../constant';

const SDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: #f7f9fa;
  }
`;
const SGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .s-item {
    padding: 25px 0;
    >* {
      width: 100%;
    }
    label {
      font-size: .75rem;
      font-weight: 500;
      text-transform: uppercase;
      color: '#6a7889';
      margin-bottom: 1.928571428571429em;
      margin-top: 1.928571428571429em;
      line-height: 2;
      letter-spacing: 1px;
    }
    p {
      font-weight: 400;
      color: #536171;
      font-size: .875rem;
      line-height: 1.5;
    }
    input {
      max-height: 2.5rem;
      outline: none;
      border: 1px solid #d3dce0;
      color: #536171;
      font-size: .875rem;
      padding: .65625rem;
    }
    .ant-divider {
      border-color: #c3cfd5;
      margin: 0;
    }
  }
`;

export default function SideDrawer(props) {
  const { visible, onClose, onAdd, type, fields } = props;  
  return (
    <SDrawer
      width={isMobile ? '80%' : 360}
      placement='right'
      closable={false}
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <SGroup>
        <div className='s-item'>
          <label>{texts.fields}</label>
          <Divider />
          <p>{texts.fieldsDescription.first} {fields} {texts.fieldsDescription.second}</p>
          <Button key="1" type="primary" onClick={onAdd}>
            <PlusCircleOutlined /> {texts.addField}
          </Button>
        </div>
        <div className='s-item'>
          <label>{texts.contentTypeId}</label>
          <Divider />
          <p>{texts.contentTypeIdDescription}</p>
          <Input defaultValue={type} bordered readOnly/>
        </div>
        <div className='s-item'>
          <label>{type === 'Page' ? texts.pageModelValidation : texts.modelValidation}</label>
          <Divider />
          {type === 'Page' ?
            <ReactJson
              displayObjectSize={false}
              displayDataTypes={false}
              theme="solarized"
              src={pageModelValidationJson}
              style={{width: '100%'}}
              name={type} />
            : <React.Fragment>
              <p>{texts.modelValidationDescription}</p>
              <ReactJson
                displayObjectSize={false}
                displayDataTypes={false}
                theme="solarized"
                src={modelValidationJson[type]['content']}
                style={{width: '100%'}}
                name={modelValidationJson[type]['title']} />
            </React.Fragment>}
        </div>
        <div className='s-item'>
          <label>{texts.documentation}</label>
          <Divider />
          <p>{texts.documentationDescription.first}&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/help/content-modelling-basics/?utm_source=webapp&utm_medium=knowledge-base-contentModellingBasics&utm_campaign=in-app-help">{texts.documentationDescription.second}</a></p>
          <p>{texts.documentationDescription.third}&nbsp;<a target="_blank" rel="noopener noreferrer" href="https://www.contentful.com/faq/basics/?utm_source=webapp&utm_medium=knowledge-base-field_lifecycle&utm_campaign=in-app-help#what-is-the-lifecycle-of-a-field">{texts.documentationDescription.fourth}</a></p>
        </div>
      </SGroup>
    </SDrawer>
  );
};

SideDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  fields: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
