import React from 'react'
import { withRedux } from '../../lib/redux'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Layout from '../../components/MainLayout';
import { receiveMlModel } from '../../actions/mlModel'
import Button from '@material-ui/core/Button';
import { startLoading, finishLoading } from '../../actions/loading'
import Title from '../../components/Title';
import TextField from '@material-ui/core/TextField';
import ReadyMlModel from '../../components/ReadyMlModel';
import NewMlModel from '../../components/NewMlModel';
import PendingMlModel from '../../components/PendingMlModel';
import { flashMessage } from 'redux-flash'
import { useTranslation } from "react-i18next";
import Router from 'next/router'

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    padding: theme.spacing(3, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
	textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '96%',
  },
	card: {
	  margin: theme.spacing(3, 0),
    // width: '96%',
  },
}));

const MlModel = () => {
  const { t } = useTranslation()
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
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
		instance.get(`${apiHost}/api/v1/ml_models/${router.query.id}`)
			.then(response => {
				dispatch(receiveMlModel(response.data))
			})
			.catch(error => {
        if(error.response.status === 401){
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

  return (
    <Layout>
      <Title>{mlModel.name}</Title>
      {
        mlModel.status === 'no_data' &&
        <NewMlModel />
      }
      {
        mlModel.status === 'pending' &&
        <PendingMlModel />
      }
      {
        mlModel.status === 'training' &&
        <PendingMlModel />
      }
      {
        mlModel.status === 'ready' &&
        <ReadyMlModel />
      }
      {
        mlModel.status === 'error' &&
        <>
          error
        </>
      }
    </Layout>
  );
};

// MlModel.getInitialProps = (context) => {
//   // const { id } = context.query;
//   // const reduxStore = context.reduxStore;
//   // const { dispatch } = reduxStore
// 	// dispatch(startLoading())
//   // return axios.get(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models/${id}`)
//   //   .then(response => {
//   //     dispatch(receiveMlModel(response.data))
// 	//     dispatch(finishLoading())
//   //   })
//   //   .catch(error => {
//   //     console.error(error)
//   //   })
// };

export default withRedux(MlModel)
