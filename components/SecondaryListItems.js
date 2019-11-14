import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTranslation } from "react-i18next";

const SecondaryListItems = () => {
  const { t } = useTranslation()
  return(
    <div>
      <ListSubheader inset>{t('user info')}</ListSubheader>
      <ListItem button onClick={() => console.log('logout')}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t('sign out')} />
      </ListItem>
    </div>
  )
}

export default SecondaryListItems
