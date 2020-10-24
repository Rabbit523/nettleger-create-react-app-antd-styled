import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styled from 'styled-components';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fieldTypes, texts } from '../../constant';

const { Meta } = Card;

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: 'none'
  },
}));

const SCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-card-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(211, 220, 224);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 3px;
    width: 80px;
    height: 80px;
    padding: 15px;
    img {
      align-self: center;
      width: 100%;
      height: 100%;
    }
  }
  .ant-card-body {
    padding: 15px;
  }
  .ant-card-meta-description {
    font-size: 0.75rem;
  }
`;


export default function FieldSelectModal(props) {
  const { open, handleClose, handleClick } = props;
  const classes = useStyles();

  const handleCardSelect = (item) => {
    handleClick(item);
  };

  return (
    <div>
      <Dialog fullWidth={true} maxWidth='sm' onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}> {texts.fieldSelectModalTitle} </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            <Grid container spacing={3}>
              {fieldTypes.map((item, i) => {
                  return item.id < 4 && (
                    <Grid item xs key={i}>
                      <SCard
                        hoverable
                        bordered={false}
                        cover={<img alt="" src={item.svg} />}
                        key={i}
                        className={classes.card}
                        onClick={(event) => handleCardSelect(item)}
                      >
                        <Meta title={item.title} description={item.description} />
                      </SCard>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Grid container spacing={3}>
              {fieldTypes.map((item, i) => {
                  return item.id > 3 && (
                    <Grid item xs key={i}>
                      <SCard
                        hoverable
                        bordered={false}
                        cover={<img alt="" src={item.svg} />}
                        key={i}
                        className={classes.card}
                        onClick={(event) => handleCardSelect(item)}
                      >
                        <Meta title={item.title} description={item.description} />
                      </SCard>
                    </Grid>
                  )
                })
              }
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

FieldSelectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};