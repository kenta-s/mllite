import React from 'react'
import { flashMessage } from 'redux-flash'
import { withRedux } from '../lib/redux'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { receiveMlModel } from '../actions/mlModel'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { startLoading, finishLoading } from '../actions/loading'
import TextField from '@material-ui/core/TextField';
import { updateMlModelStatus } from '../actions/mlModel'

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

const NewMlModel = () => {
  const { t } = useTranslation()
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
  const dispatch = useDispatch()
  const [targetText, setTargetText] = React.useState({})
  const [predictedText, setPredictedText] = React.useState('')

  const uploadCsv = files => {
		dispatch(startLoading())
		const params = new FormData();
		params.append('csv_file', files[0])
		const instance = axios.create({
			headers: {
				"access-token": localStorage.getItem('access-token'),
				"token-type":   "Bearer",
				"client":       localStorage.getItem('client'),
				"expiry":       localStorage.getItem('expiry'),
				"uid":          localStorage.getItem('uid')
			}
		})
    instance.post(`${apiHost}/api/v1/ml_models/${mlModel.id}/upload_csv`, params)
			.then(response => {
				dispatch(updateMlModelStatus('pending'))
			})
      .catch(error => {
        if(error.response.status === 401){
          dispatch(flashMessage(t('Please sign in'), {isError: true}))
          Router.push('/sign_in')
        }else{
          dispatch(flashMessage(t('server error'), {isError: true}))
        }
      })
      .then(() => dispatch(finishLoading()))
  }

  return (
    <>
      <Paper className={fixedHeightPaper}>
        <div>
					<input
						accept="csv"
						className={classes.input}
						id="contained-button-file"
						multiple={false}
						type="file"
						onChange={e => uploadCsv(e.target.files)}
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" color="primary" component="span" className={classes.button}>
						  {t('upload csv')}
						</Button>
					</label>
        </div>
      </Paper>
    </>
  );
};

// NewMlModel.getInitialProps = (context) => {
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

// export default withRedux(NewMlModel)
export default withRedux(NewMlModel)
