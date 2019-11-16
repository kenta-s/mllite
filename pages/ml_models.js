import React from 'react'
import { connect } from "react-redux"
import Link from '@material-ui/core/Link';
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { receiveMlModels } from '../actions/mlModels'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/MainLayout'
import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';
import NewMlModelModal from '../components/NewMlModelModal'
import { startLoading, finishLoading } from '../actions/loading'
import Title from '../components/Title';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import SchoolIcon from '@material-ui/icons/School';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box'
import { useTranslation } from "react-i18next";
import Router from 'next/router'
import { flashMessage } from 'redux-flash'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
	paper: {
    padding: theme.spacing(3, 2),
	  margin: theme.spacing(3),
	},
  chips: {
    justifyContent: 'center',
  }
}));

const MlModelPage = () => {
  const { t } = useTranslation()
  const classes = useStyles();
  const dispatch = useDispatch()
	React.useEffect(() => {
	  dispatch(startLoading())
		const instance = axios.create({
			headers: {
				"access-token": localStorage.getItem('access-token'),
				"token-type":   "Bearer",
				"client":       localStorage.getItem('client'),
				"expiry":       localStorage.getItem('expiry'),
				"uid":          localStorage.getItem('uid')
			}
		})
		instance.get(`${apiHost}/api/v1/ml_models`)
		  .then(response => {
		    dispatch(receiveMlModels(response.data))
		  })
		  .catch(error => {
        const response = error.response
        if(response.status === 401){
          dispatch(flashMessage(t('Please sign in'), {isError: true}))
          Router.push('/sign_in')
        }else{
          dispatch(flashMessage(t('server error'), {isError: true}))
        }
		  })
			.then(() => {
		    dispatch(finishLoading())
			})
	}, [])
  const mlModels = useSelector(state => state.mlModels.data)
  const mlModelsDom = mlModels.map((mlModel, i) => {
    return(
			<Link key={i} href={`/ml_models/${mlModel.id}`}>
        <Paper className={classes.paper}>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1}>
              {mlModel.name}
            </Box>
            {mlModel.status === 'ready' &&
              <Box p={1}>
                <Chip
                  icon={<CheckIcon />}
                  label={t('ready')}
                  color="primary"
                  className={classes.chips}
                  deleteIcon={<DoneIcon />}
                />
              </Box>
            }
            {mlModel.status === 'pending' &&
              <Box p={1}>
                <Chip
                  icon={<SchoolIcon />}
                  label={t('pending')}
                  color="secondary"
                  className={classes.chips}
                  deleteIcon={<DoneIcon />}
                />
              </Box>
            }
          </Box>
        </Paper>
			</Link>
    )
  })
  return(
    <Layout>
      <Title>{t('models')}</Title>
      <div>
        {mlModelsDom}
      </div>
      <NewMlModelModal />
    </Layout>
  )
}

// MlModelPage.getInitialProps = ({ reduxStore }) => {
//   // const res = await fetch('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models');
//   // const mlModels = await res.json();
//
//   // return { mlModels };
//   const { dispatch } = reduxStore
// 	dispatch(startLoading())
//   return axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
//     .then(response => {
//       dispatch(receiveMlModels(response.data))
// 	    dispatch(finishLoading())
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

export default withRedux(MlModelPage)
