import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SecondaryListItems = () => {
  return(
    <div>
      <ListSubheader inset>ユーザー情報</ListSubheader>
      <ListItem button onClick={() => console.log('logout')}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </ListItem>
    </div>
  )
}

export default SecondaryListItems
