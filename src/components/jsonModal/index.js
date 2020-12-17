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
import CreateIcon from '@material-ui/icons/Create';
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
    <MuiDialogTitle disableTypography className={classes.root} { ...other }>
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
  let duplicatedKeyCount = 0;
  data.forEach((item) => {
    if(item.name === name && item.type === target) {
      duplicatedKeyCount ++;
    }
  });
  return duplicatedKeyCount > 1 ? false : true;
}
export default function JsonModal(props) {
  const { open, title, jsonData, jsonContent, handleClose, handleSend } = props;
  const [isFieldSelectModal, setFieldSelectModal] = useState(false);
  const [formContent, setFormContent] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({ Select: false, Questions: false, Radio: false, Input: false, Checkbox: false });
  const [checkedGroup, setCheckedGroup] = useState({});
  const [expandedGroup, setExpandedGroup] = useState({});
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
        const checkedGroupTmp = { ...checkedGroup };
        const expandedGroupTmp = { ...expandedGroup };
        jsonContent.forEach((item, key) => {
          if (item.type === 'Select') {
            checkedGroupTmp[key] = {
              label: item.label ? true : false,
              tooltip: item.tooltip ? true : false,
              multi: item.multi ? item.multi : false,
              country: item.country ? item.country : false
            };
            expandedGroupTmp[key] = false;
          } else if (item.type === 'Date') {
            checkedGroupTmp[key] = {
              label: item.label ? true : false,
              tooltip: item.tooltip ? true : false,
              dateFrom: item.dateFrom ? item.dateFrom : false,
              country: item.dateTo ? item.dateTo : false
            };
            expandedGroupTmp[key] = false;
          } else if (item.type !== 'Text') {
            checkedGroupTmp[key] = {
              label: item.label ? true : false,
              tooltip: item.tooltip ? true : false
            };
            expandedGroupTmp[key] = false;
          }
        })
        setCheckedGroup(checkedGroupTmp);
        setExpandedGroup(expandedGroupTmp);
        setFormContent(jsonContent);
      }
      setFormData(jsonData);
    }
  }, [title, jsonContent, jsonData]);
  // check create or update button
  const buttonValidate = (name, type, index) => {
    let isCreate = true;
    Object.keys(formData).forEach((key, i) => {
      if (key === name) {
        if (formData[key]['type'] === type && i === index) {
          isCreate = false;
        }
      }
    });
    return isCreate;
  }
  // Select fields
  const handleFieldSelect = (param) => {
    let content = [ ...formContent ];
    let checkedGroupTmp = { ...checkedGroup };
    let expandedGroupTmp = { ...expandedGroup };
    let newComponent = { name: param.type, type: param.type };
    if (param.type === 'Questions') {
      newComponent['list'] = [];
      newComponent['name'] = "";
    } else if (param.type === 'Select' || param.type === 'Radio') {
      newComponent['options'] = [];
      newComponent['name'] = "";
    } else if (param.type === 'Date' || param.type === 'Number') {
      newComponent['name'] = "";
    }else {
      newComponent['name'] = "";
      newComponent['placeholder'] = "";
    }
    content.push(newComponent);
    checkedGroupTmp[content.length - 1] = { label: false, tooltip: false};
    expandedGroupTmp[content.length - 1] = false;

    setCheckedGroup(checkedGroupTmp);
    setExpandedGroup(expandedGroupTmp);
    setFormContent(content);
    setFieldSelectModal(false);
    setActiveKey("2");
  };
  const closeSelectFieldDialog = () => {
    setFieldSelectModal(false);
  };
  // Handle all text field change event
  const handleTextChange = (e, type, key) => {
    let content = [ ...formContent ];
    let data = { ...formData };
    if (key < 2) {
      content[key]['value'] = e.target.value;
      data[type] = e.target.value;
    } else {
      if (type !== 'label' && type !== 'tooltip' && type !== 'placeholder' && type !== 'from' && type !== 'to') {
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
    let expandedGroupTmp = { ...expandedGroup };
    expandedGroupTmp[key] = !expandedGroupTmp[key];
    setExpandedGroup(expandedGroupTmp);
  };
  const handleCheckChange = (e, key, target) => {
    let content = [ ...formContent ];
    let checked = { ...checkedGroup };
    if (target === 'multi' || target === 'country' || target === 'dateFrom' || target === 'dateTo') {
      if (checked[key].hasOwnProperty(target)) {
        checked[key][target] = !checked[key][target];
      } else {
        checked[key][target] = true;
      }
      content[key][target] = checked[key][target];
      setFormContent(content);
    } else {
      checked[key][target] = !checked[key][target];
    }
    setCheckedGroup(checked);
  };
  const handleTabChange = (key) => {
    setActiveKey(key);
  };
  // Handle Field Events Add/Remove/Change/Save
  const onAddElement = (index, target) => {
    const item = target === 'Questions' ? 'list' : 'options';
    let content = [ ...formContent ];
    content[index][item].push(target === 'Questions' ? 'Nytt spørsmål' : 'Nytt alternativ');
    setFormContent(content);
    let expandedGroupTmp = { ...expandedGroup };
    expandedGroupTmp[index] = true;
    setExpandedGroup(expandedGroupTmp);
  };
  const onDeleteElement = (index, target) => {
    let content = [ ...formContent ];
    content.splice(index, 1);
    setFormContent(content);
    let data = { ...formData };
    delete data[target];
    setFormData(data);
  };
  const onRemoveItem = (key, subKey, item) => {
    let content = [ ...formContent ];
    content[key][item].splice(subKey, 1);
    setFormContent(content);
  };
  const handleItemChange = (e, key, subKey, item) => {
    let content = [ ...formContent ];
    content[key][item][subKey] = e.target.value;
    setFormContent(content);
  };
  const onCreateElement = (index, target) => {
    let data = { ...formData };
    let expandedGroupTmp = { ...expandedGroup };
    if (target === 'Questions') {
      data[target] = formContent[index]['list'];
      expandedGroupTmp[index] = false;
      setExpandedGroup(expandedGroupTmp);
      setFormData(data);
    } else {
      if (formContent[index].type === target) {
        if (formContent[index]['name']) {
          const name = formContent[index]['name'];
          if (formFieldsValidation(name, target, formContent)) {
            data[name] = {};
            data[name]['type'] = target;
            if (target === 'Select' || target === 'Radio') {
              data[name]['options'] = formContent[index]['options'];
              expandedGroupTmp[index] = false;
            } else if (target !== 'Date' && target !== 'Number') {
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
            if (formContent[index].hasOwnProperty('dateFrom')) {
              data[name]['dateFrom'] = formContent[index]['dateFrom'];
            }
            if (formContent[index].hasOwnProperty('dateTo')) {
              data[name]['dateTo'] = formContent[index]['dateTo'];
            }
            setExpandedGroup(expandedGroupTmp);
            setFormData(data);
          } else {
            message.config({getContainer: () => dialogRef.current });
            message.error('Et navnefelt kan ikke dupliseres.');
            let content = [ ...formContent ];
            content[index]['name'] = '';
            setFormContent(content);
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
  const onSaveElement = (index, target) => {
    let data = { ...formData };
    let expandedGroupTmp = { ...expandedGroup };
    if (target === 'Questions') {
      data[target] = formContent[index]['list'];
      expandedGroupTmp[index] = false;
      setExpandedGroup(expandedGroupTmp);
      setFormData(data);
    } else {
      if (formContent[index].type === target) {
        if (formContent[index]['name']) {
          const name = formContent[index]['name'];
          data[name] = {};
          data[name]['type'] = target;
          if (target === 'Select' || target === 'Radio') {
            data[name]['options'] = formContent[index]['options'];
            expandedGroupTmp[index] = false;
          } else if (target !== 'Date' && target !== 'Number') {
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
          if (formContent[index].hasOwnProperty('dateFrom')) {
            data[name]['dateFrom'] = formContent[index]['dateFrom'];
          }
          if (formContent[index].hasOwnProperty('dateTo')) {
            data[name]['dateTo'] = formContent[index]['dateTo'];
          }
          setExpandedGroup(expandedGroupTmp);
          setFormData(data);
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
    let content = [ ...formContent ];
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
                {formContent.map((item, key) => <React.Fragment key={key}>
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
                    {(item.type === 'Textarea' || item.type === 'Number') && <Card variant="outlined">
                      <CardHeader title={texts[item.type]} className={classes.cardHeader}></CardHeader>
                      <CardContent>
                        <TextField
                          fullWidth
                          margin="dense"
                          type="text"
                          variant="outlined"
                          value={item.name}
                          onChange={(e) => handleTextChange(e, item.name, key)}
                          label={texts.name}
                          className={classes.cardInput}
                        />
                        {errors[item.type] && <p className={classes.errText}>{texts.validText}</p>}
                        {item.type !== 'Number' && <TextField
                          fullWidth
                          margin="dense"
                          type="text"
                          variant="outlined"
                          value={item.placeholder}
                          onChange={(e) => handleTextChange(e, 'placeholder', key)}
                          label={texts.placeholder}
                          className={classes.cardInput}
                        />}
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['label']} onChange={(e) => handleCheckChange(e, key, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['tooltip']} onChange={(e) => handleCheckChange(e, key, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[key]['label'] || checkedGroup[key]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[key]['label'] && <Grid item xs={6}>
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
                          {checkedGroup[key]['tooltip'] && <Grid item xs={6}>
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
                        {buttonValidate(item.name, item.type, key) ? 
                          <Button onClick={() => onCreateElement(key, item.type)} color="primary" startIcon={<CreateIcon />} className={classes.btnAdd} variant="outlined"> {texts.create} </Button>
                          : <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} className={classes.btnAdd} variant="outlined"> {texts.save} </Button>}
                        <Button onClick={() => onDeleteElement(key, item.name)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
                      </CardActions>
                    </Card>}
                    {item.type === 'Questions' && <Card variant="outlined">
                      <CardHeader title={texts.question} className={classes.cardHeader}></CardHeader>
                      <CardContent>
                        <Accordion expanded={expandedGroup[key]} onChange={() => handleAccordionChange(key)}>
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
                        {buttonValidate(item.name, item.type, key) ? 
                          <Button onClick={() => onCreateElement(key, item.type)} color="primary" startIcon={<CreateIcon />} variant="outlined"> {texts.create} </Button>
                          :<Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} variant="outlined"> {texts.save} </Button>}
                        <Button onClick={() => onDeleteElement(key, item.name)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
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
                            control={<Checkbox onChange={(e) => handleCheckChange(e, key, 'multi')} color="primary" />}
                            label={texts.multi}
                          />
                          <FormControlLabel
                            control={<Checkbox onChange={(e) => handleCheckChange(e, key, 'country')} color="primary" />}
                            label={texts.country}
                          />
                        </FormGroup>}
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['label']} onChange={(e) => handleCheckChange(e, key, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['tooltip']} onChange={(e) => handleCheckChange(e, key, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[key]['label'] || checkedGroup[key]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[key]['label'] && <Grid item xs={6}>
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
                          {checkedGroup[key]['tooltip'] && <Grid item xs={6}>
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
                        <Accordion expanded={expandedGroup[key]} onChange={() => handleAccordionChange(key)}>
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
                        {buttonValidate(item.name, item.type, key) ?
                          <Button onClick={() => onCreateElement(key, item.type)} color="primary" startIcon={<CreateIcon />} variant="outlined"> {texts.create} </Button>
                          : <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} variant="outlined"> {texts.save} </Button>}
                        <Button onClick={() => onDeleteElement(key, item.name)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
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
                            control={<Checkbox checked={checkedGroup[key]['label']} onChange={(e) => handleCheckChange(e, key, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['tooltip']} onChange={(e) => handleCheckChange(e, key, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[key]['label'] || checkedGroup[key]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[key]['label'] && <Grid item xs={6}>
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
                          {checkedGroup[key]['tooltip'] && <Grid item xs={6}>
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
                        {buttonValidate(item.name, item.type, key) ?
                          <Button onClick={() => onCreateElement(key, item.type)} color="primary" startIcon={<CreateIcon />} className={classes.btnAdd} variant="outlined"> {texts.create} </Button>
                          : <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} className={classes.btnAdd} variant="outlined"> {texts.save} </Button>}
                          <Button onClick={() => onDeleteElement(key, item.name)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
                      </CardActions>
                    </Card>}
                    {item.type === 'Date' && <Card variant="outlined">
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
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['dateFrom']} onChange={(e) => handleCheckChange(e, key, 'dateFrom')} color="primary" />}
                            label={texts.dateFrom}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['dateTo']} onChange={(e) => handleCheckChange(e, key, 'dateTo')} color="primary" />}
                            label={texts.dateTo}
                          />
                        </FormGroup>
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['label']} onChange={(e) => handleCheckChange(e, key, 'label')} color="primary" />}
                            label={texts.label}
                          />
                          <FormControlLabel
                            control={<Checkbox checked={checkedGroup[key]['tooltip']} onChange={(e) => handleCheckChange(e, key, 'tooltip')} color="primary" />}
                            label={texts.tooltip}
                          />
                        </FormGroup>
                        {(checkedGroup[key]['label'] || checkedGroup[key]['tooltip']) && <Grid container spacing={2}>
                          {checkedGroup[key]['label'] && <Grid item xs={6}>
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
                          {checkedGroup[key]['tooltip'] && <Grid item xs={6}>
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
                        {buttonValidate(item.name, item.type, key) ?
                          <Button onClick={() => onCreateElement(key, item.type)} color="primary" startIcon={<CreateIcon />} className={classes.btnAdd} variant="outlined"> {texts.create} </Button>
                          : <Button onClick={() => onSaveElement(key, item.type)} color="primary" startIcon={<SaveIcon />} className={classes.btnAdd} variant="outlined"> {texts.save} </Button>}
                          <Button onClick={() => onDeleteElement(key, item.name)} color="secondary" startIcon={<DeleteIcon />} variant="outlined"> {texts.delete} </Button>
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