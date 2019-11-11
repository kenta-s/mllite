import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const SecondaryListItems = ({history}) => {
  return(
    <div>
      <ListSubheader inset>ユーザー情報</ListSubheader>
      <ListItem button onClick={() => history.push('/user_info')}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="情報" />
      </ListItem>
    </div>
  )
}

export default SecondaryListItems
