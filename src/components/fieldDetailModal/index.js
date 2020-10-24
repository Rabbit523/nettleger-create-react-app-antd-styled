import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

export default function FieldDetailModal(props) {
  const { open, type, handleClose, handleClick, handleBack } = props;
  const [errors, setErrors] = useState({ idError: false, nameError: false });
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const classes = useStyles();

  const onSubmit = () => {
    if (name && id) {
      const data = {type, id, name};
      handleClick(data);
    } else {
      setErrors({
        idError: id ? false : true,
        nameError: name ? false : true
      });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors({
      idError: id ? false : true,
      nameError: false
    });
  };
  const handleIdChange = (e) => {
    setId(e.target.value);
    setErrors({
      idError: false,
      nameError: name ? false : true
    });
  };

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>{texts[type]}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="text"
                variant="outlined"
                onChange={handleNameChange}
                label={texts.name}
                error={errors.nameError}
                />
              {errors.nameError && <p className={classes.errText}>{texts.validText}</p>}
              <DialogContentText className={classes.text}>{texts.nameDescription}</DialogContentText>
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                fullWidth
                margin="dense"
                type="text"
                variant="outlined"
                onChange={handleIdChange}
                label={texts.fieldId}
                error={errors.idError}
                />
              {errors.idError && <p className={classes.errText}>{texts.validText}</p>}
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

FieldDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};