import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import Dropzone from 'react-dropzone';
import { isMobile } from 'react-device-detect';
import { Editor } from '@tinymce/tinymce-react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, FormControlLabel, Button, IconButton, Divider, TextField, Radio, RadioGroup } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MoreOutlined } from '@ant-design/icons';
import Notification from '../notification';
import ApiService from "../../service/api.service";
import { texts, svgIcons } from '../../constant';

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

export default function DraggableBox(props) {
  const classes = useStyles();
  const { data, onClick } = props;
  const [input, setInputValue] = useState("");
  const [richContent, setRichContent] = useState("");
  const [file, setFile] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleRichTextChange = (content, editor) => {
    setRichContent(editor.getContent());
  };
  const handleSaveData = () => {
    const res = {
      name: data.name,
      val: data.type === 'RichText' ? richContent : data.type === 'Media' ? file : input
    };
    onClick(res);
  };

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
    <Draggable disabled={isMobile}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
        >
          <IconButton size="small" className={classes.customMargin}><MoreOutlined /></IconButton>
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<img alt="" className={classes.customMargin} src={svgIcons[data.type]} />}
            label={data.name}
          />
        </AccordionSummary>
        <AccordionDetails>
          {data.type === 'Text' && (
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              type="text"
              variant="outlined"
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
                  {!isDragActive && 'Click here or drop a file to upload!'}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                </div>
              )}
            </Dropzone>
          )}
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">{texts.cancel}</Button>
          <Button size="small" color="primary" onClick={handleSaveData}>{texts.save}</Button>
        </AccordionActions>
      </Accordion>
    </Draggable>
  );
};

DraggableBox.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
