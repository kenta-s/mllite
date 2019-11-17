import React from 'react';
import Fab from '@material-ui/core/Fab';
import LanguageIcon from '@material-ui/icons/Language';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import i18n from '../lib/i18n'
import { useTranslation } from "react-i18next";
import Copyright from "./Copyright"
import Loading from '../components/Loading'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    fontSize: 30,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const { t } = useTranslation()

  return (
    <Container component="main" maxWidth="xs">
      <Loading />
      <CssBaseline />
      { /*
      <LanguageIcon className={classes.fab} />
      */ }
      <div className={classes.paper}>
        {props.children}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
