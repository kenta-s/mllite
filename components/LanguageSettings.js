import React from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import { setLanguage } from '../actions/language'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    fontSize: 30,
    cursor: 'pointer',
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const lng = useSelector(state => state.language.use)

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguage = lng => {
    console.log(lng)
    dispatch(setLanguage(lng))
  }

  const classes = useStyles();

  return (
    <div>
      <LanguageIcon
        className={classes.fab}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem selected={lng === 'en-US'} onClick={() => handleLanguage('en-US')}>
          <ListItemText primary="English" />
        </StyledMenuItem>
        <StyledMenuItem selected={lng === 'ja'} onClick={() => handleLanguage('ja')}>
          <ListItemText primary="日本語" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
