import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTranslation } from "react-i18next";
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { flashMessage } from 'redux-flash'
import { withRedux } from '../lib/redux'

const SecondaryListItems = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const removeCredentials = async () => {
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
    localStorage.removeItem('token-type');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
  }
  const signOut = () => {
    removeCredentials()
      .then(() => {
        Router.push('/sign_in')
        dispatch(flashMessage(t('Signed out'), {isError: true}))
      })
  }

  return(
    <div>
      <ListSubheader inset>{t('user info')}</ListSubheader>
      <ListItem button onClick={signOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t('sign out')} />
      </ListItem>
    </div>
  )
}

export default withRedux(SecondaryListItems)
