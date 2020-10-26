import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import { texts } from '../../constant';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  }
}));

export default function EnhancedTableToolbar (props) {
  const classes = useToolbarStyles();
  const { numSelected, tableName, selected, onDeleteClick, onCreateClick } = props;

  const confirm = () => {
    onDeleteClick(selected);
  };

  const cancel = () => {
    console.log("cancel delete page");
  };

  const create = () => {
    onCreateClick();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} {texts.selected}
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {tableName}
        </Typography>
      )}

      {numSelected > 0 ? (
          <Popconfirm
            title={tableName === 'Sider' ? texts.deletePageQue : tableName === 'Moduler' ? texts.deleteModuleQue : texts.deleteSectionQue}
            onConfirm={confirm}
            onCancel={cancel}
            okText={texts.yes}
            cancelText={texts.no}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Popconfirm>
        ) : (
          <Tooltip title={tableName === 'Sider' ? texts.createPage : tableName === 'Moduler' ? texts.createModule : texts.createSection}>
            <Fab label='Edit' color="primary" onClick={create}>
              <NoteAddIcon />
            </Fab>
          </Tooltip>
        )
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired,
};