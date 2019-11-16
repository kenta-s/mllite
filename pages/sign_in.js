import React from 'react';
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

// TODO: implement forgot password?
const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const saveCredentialsToLocalStorage = async ({client, accessToken, expiry, uid}) => {
		localStorage.setItem("access-token", accessToken)
		localStorage.setItem("uid", uid)
		localStorage.setItem("token-type", "Bearer")
		localStorage.setItem("client", client)
		localStorage.setItem("expiry", expiry)
  }

  const handleSubmit = (e) => {
		e.preventDefault()
    axios.post(`${apiHost}/auth/sign_in`, {
      email,
      password,
    })
      .then(response => {
        const creds = {
          client: response.headers["client"],
          accessToken: response.headers["access-token"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"],
        }
        saveCredentialsToLocalStorage(creds)
          .then(Router.push('/ml_models'))
      })
      .catch(error => {
        error.response.data.errors.map(message => {
          dispatch(flashMessage(t('Invalid login credentials'), {isError: true}))
        })
      })
  }

  return (
    <Layout>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				{t('Sign in')}
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
				<Button
          disabled={email.length === 0 || password.length < 6}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
				  {t('Sign in')}
				</Button>
				<Grid container>
					<Grid item>
						<Link href="/sign_up" variant="body2">
							{t("Do not have an account? Sign Up")}
						</Link>
					</Grid>
				</Grid>
			</form>
    </Layout>
  );
}

export default withRedux(SignIn)

