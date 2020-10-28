import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { texts } from '../../constant';

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

const useStyles = makeStyles(() => ({
  text: {
    fontSize: '.875rem',
    color: '#606c7c'
  },
  errText: {
    color: '#f44336'
  }
}));

export default function SelectModuleModal(props) {
  const { open, type, modules, handleClose, handleClick, handleBack } = props;
  const [errors, setErrors] = useState({ idError: false, dirError: false, amountError: false });
  const [direction, setDirection] = useState('');
  const [amount, setAmount] = useState('');
  const [moduleId, setModuleId] = useState('');
  const classes = useStyles();

  const onSubmit = () => {
    if (moduleId && amount && direction) {
      const data = { moduleId, amount, direction };
      handleClick(data);
    } else {
      setErrors({
        idError: moduleId ? false : true,
        dirError: direction ? false : true,
        amountError: amount ? false : true
      });
    }
  };
  const handleIdChange = (e) => {
    setModuleId(e.target.value);
  };
  const handleDirChange = (e) => {
    setDirection(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>{texts[type]}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>{texts.module}</InputLabel>
                <Select
                  native
                  value={moduleId}
                  onChange={handleIdChange}
                  label={texts.module}
                  variant="outlined"
                >
                  <option value="none">{texts.Module}</option>
                  {modules.map((item, index) => (
                    <option key={index} value={item.id}>{item.name}</option>
                  ))}
                </Select>
                {errors.idError && <p className={classes.errText}>{texts.validText}</p>}
              </FormControl>
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="text"
                variant="outlined"
                onChange={handleDirChange}
                label={texts.direction}
                error={errors.dirError}
                />
              {errors.dirError && <p className={classes.errText}>{texts.validText}</p>}
              <DialogContentText className={classes.text}>{texts.nameDescription}</DialogContentText>
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="number"
                variant="outlined"
                onChange={handleAmountChange}
                label={texts.fieldModuleAmount}
                error={errors.amountError}
                />
              {errors.amountError && <p className={classes.errText}>{texts.validText}</p>}
              <DialogContentText className={classes.text}>{texts.fieldIdDescription}</DialogContentText>
            </Grid>
          </Grid>          
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary" variant="contained"> {texts.create} </Button>
          <Button onClick={handleBack} color="default" variant="contained"> {texts.changeType} </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SelectModuleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  modules: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};