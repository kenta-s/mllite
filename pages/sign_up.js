import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { startLoading, finishLoading } from '../actions/loading'
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
import { useTranslation } from "react-i18next";
import Layout from "../components/RegistrationLayout"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { flashMessage } from 'redux-flash'
import { withRedux } from '../lib/redux'
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
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
}));

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConf, setPasswordConf] = React.useState('');
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
		e.preventDefault()
    dispatch(startLoading())
    axios.post(`${apiHost}/auth`, {
      email,
      password,
      password_confirmation: passwordConf,
    })
      .then(() => {
        Router.push('/email_sent')
      })
      .catch(error => {
        error.response.data.errors.full_messages.map(message => {
          dispatch(flashMessage(t(`${message}`), {isError: true}))
        })
      })
      .then(() => dispatch(finishLoading()))
  }

  return (
    <Layout>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{t('Sign up')}
			</Typography>
			<form className={classes.form} noValidate onSubmit={e => handleSubmit(e)}>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label={t('Email Address')}
					autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label={t('Password')}
					type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					label={t('Password confirmation')}
					type="password"
          value={passwordConf}
          onChange={e => setPasswordConf(e.target.value)}
				/>
				<Button
          disabled={email.length === 0 || password !== passwordConf || password.length < 6}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					{t('Create Account for Free')}
				</Button>
				<Grid container>
					<Grid item>
						<Link href="/sign_in" variant="body2">
							{t("Already have an account? Sign In")}
						</Link>
					</Grid>
				</Grid>
			</form>
    </Layout>
  );
}

export default withRedux(SignUp)
