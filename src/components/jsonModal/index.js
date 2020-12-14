import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { Tabs, message } from 'antd';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { green } from '@material-ui/core/colors';
import { TextField, IconButton, Button, Typography, Dialog, Card, CardHeader, CardContent, CardActions, Grid, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { texts, formFieldTypes } from '../../constant';
import FieldSelectModal from '../fieldSelectModal';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#f7f9fa',
    borderRadius: '4px 4px 0 0',
    borderBottomWidth: 1,
    borderColor: '#c3cfd5'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '1.875rem',
    color: '#536171',
    fontSize: '.875rem'
  },
}))(MuiDialogContent);

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  column: {
    flexBasis: '33.33%',
  },
  cardHeader: {
    paddingBottom: 0
  },
  cardItem: {
    display: 'flex',
    alignItems: 'center',
  },
  cardInput: {
    marginBottom: '8px'
  },
  errText: {
    color: '#f44336'
  },
  cardAction: {
    padding: '8px 16px'
  },
  btnAdd: {
    marginLeft: 'auto'
  }
}));

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};
function formFieldsValidation(name, target, data) {
  let isValid = true;
  Object.keys(data).forEach((key) => {
    if (key === name) {
      if (typeof data[key] === 'object') {
        if (data[key]['type'] === target) {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    }
  });
  return isValid;
}
export default function JsonModal(props) {
  const { open, title, jsonData, jsonContent, handleClose, handleSend } = props;
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [questionExpaned, setQuestionExpaned] = useState(false);
  const [selectExpaned, setSelectExpaned] = useState(false);
  const [radioExpaned, setRadioExpaned] = useState(false);
  const [formContent, setFormContent] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({ Select: false, Questions: false, Radio: false, Input: false, Checkbox: false });
  const [checkedGroup, setCheckedGroup] = useState({
    Select: { label: false, tooltip: false },
    Radio: { label: false, tooltip: false },
    Input: { label: false, tooltip: false },
    Checkbox: { label: false, tooltip: false }
  });
  const [activeKey, setActiveKey] = useState("1");
  const classes = useStyles();
  const dialogRef = useRef();

  useEffect(() => {
    if (title === texts.detailFormGroup) {
      if (isEmpty(jsonContent)) {
        let content = [];
        Object.keys(jsonData).forEach((key) => {
          content.push({ name: key, value: jsonData[key], type: 'Text' });
        });
        setFormContent(content);
      } else {
        setFormContent(jsonContent);
      }
      setFormData(jsonData);
    }
  }, [title, jsonContent, jsonData]);
  // Select fields
  const handleFieldSelect = (param) => {
    let content = [...formContent];
    let newComponent = { name: param.type, type: param.type };
    if (param.type === 'Questions') {
      newComponent['list'] = [];
      newComponent['name'] = "";
    } else if (param.type === 'Select' || param.type === 'Radio') {
      newComponent['options'] = [];
      newComponent['name'] = "";
    } else {
      newComponent['name'] = "";
      newComponent['placeholder'] = "";
    }
    content.push(newComponent);
    setFormContent(content);
    setFieldSelectModal(false);
    setActiveKey("2");
  };
  const closeSelectFieldDialog = () => {
    setFieldSelectModal(false);
  };
  // Handle all text field change event
  const handleTextChange = (e, type, key) => {
    let content = [...formContent];
    let data = { ...formData };
    if (key < 2) {
      content[key]['value'] = e.target.value;
      data[type] = e.target.value;
    } else {
      if (type !== 'label' && type !== 'tooltip' && type !== 'placeholder') {
        content[key]['name'] = e.target.value;
        setErrors({ type: false });
      } else {
        content[key][type] = e.target.value;
      }
    }
    setFormContent(content);
    setFormData(data);
  };
  const handleAccordionChange = (key) => {
    if (key === 'Questions') {
      setQuestionExpaned(!questionExpaned);
    } else if (key === 'Select') {
      setSelectExpaned(!selectExpaned);
    } else {
      setRadioExpaned(!radioExpaned);
    }
  };
  const handleCheckChange = (e, key, type, target) => {
    let content = [...formContent];
    if (content[key].hasOwnProperty(target)) {
      delete content[key][target];
    } else {
      if (target !== 'multi' && target !== 'country') {
        content[key][target] = "";
      } else {
        content[key][target] = e.target.checked;
      }
    }
    let checked = { ...checkedGroup };
    checked[type][target] = !checked[type][target];
    setCheckedGroup(checked);
    setFormContent(content);
  };
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  // Handle Field Events Add/Remove/Change/Save
  const onAddElement = (index, target) => {
    const item = target === 'Questions' ? 'list' : 'options';
    let content = [...formContent];
    content[index][item].push(target === 'Questions' ? 'Nytt spørsmål' : 'Nytt alternativ');
    setFormContent(content);
    target === 'Questions' ? setQuestionExpaned(true) : target === 'Select' ? setSelectExpaned(true) : setRadioExpaned(true);
  };
  const onDeleteElement = (index, target) => {
    let content = [...formContent];
    content.splice(index, 1);
    setFormContent(content);
    let data = { ...formData };
    delete data[target];
    setFormData(data);
  };
  const onRemoveItem = (key, subKey, item) => {
    let content = [...formContent];
    content[key][item].splice(subKey, 1);
    setFormContent(content);
  };
  const handleItemChange = (e, key, subKey, item) => {
    let content = [...formContent];
    content[key][item][subKey] = e.target.value;
    setFormContent(content);
  };
  const onSaveElement = (index, target) => {
    let data = { ...formData };
    if (target === 'Questions') {
      data[target] = formContent[index]['list'];
      setQuestionExpaned(false);
      setFormData(data);
    } else {
      if (formContent[index].type === target) {
        if (formContent[index]['name']) {
          const name = formContent[index]['name'];
          if (formFieldsValidation(name, target, data)) {
            data[name] = [];
            data[name]['type'] = target;
            if (target === 'Select' || target === 'Radio') {
              data[name]['options'] = formContent[index]['options'];
              target === 'Select' ? setSelectExpaned(false) : setRadioExpaned(false);
            } else {
              data[name]['placeholder'] = formContent[index]['placeholder'];
            }
            if (formContent[index].hasOwnProperty('label')) {
              data[name]['label'] = formContent[index]['label'];
            }
            if (formContent[index].hasOwnProperty('tooltip')) {
              data[name]['tooltip'] = formContent[index]['tooltip'];
            }
            if (formContent[index].hasOwnProperty('multi')) {
              data[name]['multi'] = formContent[index]['multi'];
            }
            if (formContent[index].hasOwnProperty('country')) {
              data[name]['country'] = formContent[index]['country'];
            }
            setFormData(data);
          } else {
            message.config({getContainer: () => dialogRef.current });
            message.error('Et navnefelt kan ikke dupliseres.');
            let content = [...formContent];
            content[index]['name'] = '';
            setFormContent(content);
            delete data[name];
            setFormData(data);
            let errs = { ...errors };
            errs[target] = true;
            setErrors(errs);
          }
        } else {
          let errs = { ...errors };
          errs[target] = true;
          setErrors(errs);
        }
      }
    }
  };
  // Json Dialog
  const onEdit = () => {
    setFieldSelectModal(true);
  };
  const onSubmit = () => {
    let content = [...formContent];
    content.forEach((obj, index) => {
      if (obj.type !== 'Text' && obj.name === '') {
        delete content[index];
      }
    });
    handleSend({
      content: formContent,
      data: formData
    });
  };

  return (
    <div>
      <FieldSelectModal
        open={isFieldSelectModal}
        fieldTypes={formFieldTypes}
        handleClose={closeSelectFieldDialog}
        handleClick={handleFieldSelect}
      />
      {title === texts.detailFormGroup ?
        <Dialog fullWidth={true} maxWidth='md' onClose={handleClose} open={open} ref={dialogRef}>
          <DialogTitle onClose={handleClose}>{title}</DialogTitle>
          <DialogContent dividers>
            <STabs defaultActiveKey="1" activeKey={activeKey} onChange={handleTabChange}>
              <TabPane tab={texts.jsonPreview} key={1}>
                <ReactJson theme="solarized" src={formData} name="Step2" />
              </TabPane>
              <TabPane tab={texts.fields} key={2}>
                {formContent.map((item, key) =>
                  <React.Fragment key={key}>
                    {item.type === 'Text' && <TextField
                      fullWidth
                      margin="dense"
                      type="text"
                      variant="outlined"
                      value={item.value}
                      onChange={(e) => handleTextChange(e, item.name, key)}
                      label={texts[item.name]}
                      className={classes.cardInput}
                    />}
                    {item.type === 'Questions' && <Card variant="outlined">
                      <CardHeader title={texts.question} className={classes.cardHeader}></CardHeader>
                      <CardContent>
                        <Accordion expanded={questionExpaned} onChange={() => handleAccordionChange(item.type)}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className={classes.column}>
                              <Typography className={classes.heading}>{texts.question}</Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>{texts.addQuestion}</Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className={classes.details}>
                            {item.list.map((question, queKey) =>
                              <Grid container spacing={2} key={queKey}>
                                <Grid item xs={12}>
                                  <div className={classes.cardItem}>
                                    <TextField
                                      fullWidth
                                      margin="dense"
                                      type="text"
                                      variant="outlined"
                                      value={question}
                                      onChange={(e) => handleItemChange(e, key, queKey, 'list')}
                                      label={texts.question}
                                    />
                                    <IconButton onClick={() => onRemoveItem(key, queKey, 'list')} color="primary"><IndeterminateCheckBoxOutlinedIcon /></IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                      <CardActions className={classes.cardAction}>
                        <Button onClick={() => onAddElement(key, item.type)} color="primary" startIcon={<AddCircleOutlineIcon />} variant="outlined" className={classes.btnAdd}> {texts.add} </Button>
                        <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} variant="outlined"> {texts.save} </Button>
                        <Button onClick={() => onDeleteElement(key, item.type)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
                      </CardActions>
                    </Card>}
                    {(item.type === 'Select' || item.type === 'Radio') && <Card variant="outlined">
                      <CardHeader title={texts[item.type]} className={classes.cardHeader}></CardHeader>
                      <CardContent>
                        <TextField
                          fullWidth
                          margin="dense"
                          type="text"
                          variant="outlined"
                          value={item.name}
                          onChange={(e) => handleTextChange(e, item.type, key)}
                          label={texts.name}
                          error={errors[item.type]}
                          className={classes.cardInput}
                        />
                        {errors[item.type] && <p className={classes.errText}>{texts.validText}</p>}
                        {item.type === 'Select' && <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox onChange={(e) => handleCheckChange(e, key, item.type, 'multi')} color="primary" />}
                            label={texts.multi}
                          />
                          <FormControlLabel
                            control={<Checkbox onChange={(e) => handleCheckChange(e, key, item.type, 'country')} color="primary" />}
                            label={texts.country}
                          />
                        </FormGroup>}
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[item.type]['label']} onChange={(e) => handleCheckChange(e, key, item.type, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[item.type]['tooltip']} onChange={(e) => handleCheckChange(e, key, item.type, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[item.type]['label'] || checkedGroup[item.type]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[item.type]['label'] && <Grid item xs={6}>
                            <TextField
                              fullWidth
                              margin="dense"
                              type="text"
                              variant="outlined"
                              value={item.label}
                              onChange={(e) => handleTextChange(e, 'label', key)}
                              label={texts.label}
                            />
                          </Grid>}
                          {checkedGroup[item.type]['tooltip'] && <Grid item xs={6}>
                            <TextField
                              fullWidth
                              margin="dense"
                              type="text"
                              variant="outlined"
                              value={item.tooltip}
                              onChange={(e) => handleTextChange(e, 'tooltip', key)}
                              label={texts.tooltip}
                            />
                          </Grid>}
                        </Grid>}
                        <Accordion expanded={item.type === 'Select' ? selectExpaned : radioExpaned} onChange={() => handleAccordionChange(item.type)}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className={classes.column}>
                              <Typography className={classes.heading}>{texts[item.type]}</Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>{texts.addSelect}</Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails className={classes.details}>
                            {item.options.map((option, optionKey) =>
                              <Grid container spacing={2} key={optionKey}>
                                <Grid item xs={12}>
                                  <div className={classes.cardItem}>
                                    <TextField
                                      fullWidth
                                      margin="dense"
                                      type="text"
                                      variant="outlined"
                                      value={option}
                                      onChange={(e) => handleItemChange(e, key, optionKey, 'options')}
                                      label={texts.option}
                                    />
                                    <IconButton onClick={() => onRemoveItem(key, optionKey, 'options')} color="primary"><IndeterminateCheckBoxOutlinedIcon /></IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                      <CardActions className={classes.cardAction}>
                        <Button onClick={() => onAddElement(key, item.type)} color="primary" startIcon={<AddCircleOutlineIcon />} variant="outlined" className={classes.btnAdd}> {texts.add} </Button>
                        <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} variant="outlined"> {texts.save} </Button>
                        <Button onClick={() => onDeleteElement(key, item.type)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
                      </CardActions>
                    </Card>}
                    {(item.type === 'Input' || item.type === 'Checkbox') && <Card variant="outlined">
                      <CardHeader title={texts[item.type]} className={classes.cardHeader}></CardHeader>
                      <CardContent>
                        <TextField
                          fullWidth
                          margin="dense"
                          type="text"
                          variant="outlined"
                          value={item.name}
                          onChange={(e) => handleTextChange(e, item.type, key)}
                          label={texts.name}
                          error={errors[item.type]}
                          className={classes.cardInput}
                        />
                        {errors[item.type] && <p className={classes.errText}>{texts.validText}</p>}
                        <TextField
                          fullWidth
                          margin="dense"
                          type="text"
                          variant="outlined"
                          value={item.placeholder}
                          onChange={(e) => handleTextChange(e, 'placeholder', key)}
                          label={texts.placeholder}
                          className={classes.cardInput}
                        />
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[item.type]['label']} onChange={(e) => handleCheckChange(e, key, item.type, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[item.type]['tooltip']} onChange={(e) => handleCheckChange(e, key, item.type, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[item.type]['label'] || checkedGroup[item.type]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[item.type]['label'] && <Grid item xs={6}>
                            <TextField
                              fullWidth
                              margin="dense"
                              type="text"
                              variant="outlined"
                              value={item.label}
                              onChange={(e) => handleTextChange(e, 'label', key)}
                              label={texts.label}
                            />
                          </Grid>}
                          {checkedGroup[item.type]['tooltip'] && <Grid item xs={6}>
                            <TextField
                              fullWidth
                              margin="dense"
                              type="text"
                              variant="outlined"
                              value={item.tooltip}
                              onChange={(e) => handleTextChange(e, 'tooltip', key)}
                              label={texts.tooltip}
                            />
                          </Grid>}
                        </Grid>}
                      </CardContent>
                      <CardActions className={classes.cardAction}>
                        <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} className={classes.btnAdd} variant="outlined"> {texts.save} </Button>
                        <Button onClick={() => onDeleteElement(key, item.type)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
                      </CardActions>
                    </Card>}
                  </React.Fragment>
                )}
              </TabPane>
            </STabs>
          </DialogContent>
          <DialogActions>
            <ColorButton onClick={onEdit} color="primary" startIcon={<AddIcon />} variant="contained"> {texts.edit} </ColorButton>
            <Button onClick={onSubmit} color="primary" startIcon={<SaveIcon />} variant="contained"> {texts.save} </Button>
            <Button onClick={handleClose} color="default" variant="contained"> {texts.cancel} </Button>
          </DialogActions>
        </Dialog> : <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
          <DialogTitle onClose={handleClose}>{title}</DialogTitle>
          <DialogContent dividers>
            <ReactJson theme="solarized" src={jsonData} />
          </DialogContent>
        </Dialog>}
    </div>
  );
};

JsonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  jsonData: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};