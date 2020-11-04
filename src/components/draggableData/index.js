import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Dropzone from 'react-dropzone';
import ReactJson from 'react-json-view';
import styled from 'styled-components';
import { Tabs } from 'antd';
// import { isMobile } from 'react-device-detect';
import { Editor } from '@tinymce/tinymce-react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, FormControlLabel, Button, IconButton, Divider, TextField, Radio, RadioGroup } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MoreOutlined } from '@ant-design/icons';
import Notification from '../notification';
import ApiService from "../../service/api.service";
import { texts, svgIcons } from '../../constant';

const { TabPane } = Tabs;
const STabs = styled(Tabs)`
  height: 100%;
  width: 100%;
  .ant-tabs-tab-btn {
    text-transform: capitalize;
  }
  .ant-tabs-content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;
const useStyles = makeStyles({
  customMargin: {
    marginRight: 15
  },
  textField: {
    width: '100%'
  },
  dropZone: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor: '#d3dce0',
    cursor: 'pointer'
  }
});
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export default function DraggableDataBox(props) {
  const classes = useStyles();
  const { data, updatedJsonData, onSend, onDetail, sections, modules } = props;
  const [sectionData, setSectionData] = useState({});
  const [moduleData, setModuleData] = useState({});
  const [moduleId, setModuleId] = useState("");
  const [input, setInputValue] = useState("");
  const [richContent, setRichContent] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    if(data.val) {
      if (data.type === 'Text') {
        setInputValue(data.val);
      } else if (data.type === 'RichText') {
        setRichContent(data.val);
      } else if (data.type === 'Media') {
        setFile(data.val);
      }
    }

    if (!isEmpty(sections)) {
      const section = sections.find((item) => item.name === data.name);
      if (!isEmpty(section)) {
        const content = JSON.parse(section.content);
        setSectionData(content);
      }
    }
    if (!isEmpty(modules)) {
      const module_ = modules.find((item) => item.name === data.name);
      if (!isEmpty(module_)) {
        const content = JSON.parse(module_.content);
        setModuleData(content);
        setModuleId(module_.id);
      }
    }
  }, [data, sections, modules, updatedJsonData]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleRichTextChange = (content, editor) => {
    setRichContent(editor.getContent());
  };
  const handleSaveData = () => {
    let res = {
      name: data.name,
      val: data.type === 'RichText' ? richContent : data.type === 'Media' ? file : data.type === 'Module' ? 'module' : input
    };
    if (data.type !== 'Module' && data.type !== 'Section') {
      onSend(res);
    } else {
      if (moduleId) {
        res['moduleId'] = moduleId;
        onSend(res);
      }
    }
  };
  const handleDetailView = () => {
    onDetail(data);
  }

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      var formData = new FormData();
      formData.append('file', file);
      const reader = new FileReader();
			reader.onload = function (e) {
        ApiService.fileUpload(formData).then((res) => {
          setFile(res.path);
          Notification({title: texts.notificationSuccess, description: texts.notificationSuccessMsg.upload, type: 'success'});
        }).catch((error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          Notification({title: texts.notificationErr, description: resMessage, type: 'error'});
        });
			}
			reader.readAsDataURL(file);
    });
  }, []);

  return (
    <Draggable disabled={true}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
        >
          <IconButton size="small" className={classes.customMargin}><MoreOutlined /></IconButton>
          <FormControlLabel
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<img alt="" className={classes.customMargin} src={svgIcons[data.type]} />}
            label={(data.name === 'name' || data.name === 'meta_title' || data.name === 'meta_description')? data.name + ' (required)' : data.name}
          />
        </AccordionSummary>
        <AccordionDetails>
          {(data.type === 'Text' || data.type === 'Button') && (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              type="text"
              variant="outlined"
              value={input}
              onChange={handleChange}
              label={texts.name}
            />
          )}
          {data.type === 'RichText' && (
            <Editor
              apiKey={process.env.REACT_APP_TMCE_KEY}
              value={richContent}
              init={{
                height: 500,
                menubar: false,
                plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autoresize save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable',
                mobile: {
                  theme: 'silver',
                  menubar: true,
                  plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
                },
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                tinycomments_mode: 'embedded',      
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                image_caption: true,   
                toolbar_mode: 'sliding',
                contextmenu: 'link image imagetools table',
                file_picker_callback: function (callback, value, meta) {
                  /* Provide file and text for the link dialog */
                  if (meta.filetype === 'file') {
                    callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                  }
                  /* Provide image and alt text for the image dialog */
                  if (meta.filetype === 'image') {
                    callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                  }
                  /* Provide alternative source and posted for the media dialog */
                  if (meta.filetype === 'media') {
                    callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                  }
                },
                images_upload_url: `${process.env.REACT_APP_BACKEND_URL}/api/fileupload`
              }}
              onChange={handleRichTextChange}
            />
          )}
          {data.type === 'Date' && (
            <TextField
              label={texts.dateTime}
              className={classes.textField}
              type="datetime-local"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          )}
          {data.type === 'Number' && (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              type="number"
              variant="outlined"
              onChange={handleChange}
              label={texts.number}
            />
          )}
          {data.type === 'Bool' && (
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel
                value="true"
                control={<GreenRadio onChange={handleChange} value="true"/>}
                label="True"
                labelPlacement="end"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" onChange={handleChange} value="false"/>}
                label="False"
                labelPlacement="end"
              />
            </RadioGroup>
          )}
          {data.type === 'Media' && (
            <Dropzone
              onDrop={onDrop}
              maxFiles={1}
              multiple={false}
              accept="image/*,audio/*,video/*"
            >
              {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <div className={classes.dropZone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  {file && texts.dropzoneQue[0] + file}
                  {file && (<br/>)}
                  {!isDragActive && texts.dropzoneQue[1]}
                  {isDragActive && !isDragReject && texts.dropzoneQue[2]}
                  {isDragReject && texts.dropzoneQue[3]}
                </div>
              )}
            </Dropzone>
          )}
          {data.type === 'Module' && (
            <React.Fragment>
              {updatedJsonData.length > 0 ? <STabs defaultActiveKey="1">
                <TabPane tab={texts.originModuleModel} key="1">
                  <ReactJson theme="solarized" src={moduleData} style={{width: '100%'}}/>
                </TabPane>
                <TabPane tab={texts.sectionmoduleData} key="2">
                  <ReactJson theme="solarized" src={updatedJsonData} style={{width: '100%'}}/>
                </TabPane>
              </STabs> : <ReactJson theme="solarized" src={moduleData} style={{width: '100%'}}/>}
            </React.Fragment>
          )}
          {data.type === 'Section' && (
            <ReactJson theme="solarized" src={sectionData} style={{width: '100%'}}/>
          )}
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">{texts.cancel}</Button>
          {(data.type === 'Module' || data.type === 'Section') &&<Button size="small" color="primary" onClick={handleDetailView}>{texts.edit}</Button>}
          <Button size="small" color="primary" onClick={handleSaveData}>{texts.save}</Button>
        </AccordionActions>
      </Accordion>
    </Draggable>
  );
};

DraggableDataBox.propTypes = {
  data: PropTypes.object.isRequired,
  onSend: PropTypes.func.isRequired
};
