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
import { startLoading, finishLoading } from '../actions/loading'
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";

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

const ReadyMlModel = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
  const dispatch = useDispatch()
  const [targetParams, setTargetParams] = React.useState({})
  const [predictedText, setPredictedText] = React.useState('')
  const { t } = useTranslation()

  const predict = () => {
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
		instance.post(`${apiHost}/api/v1/ml_models/${router.query.id}/prediction`,
        {target_parameters: targetParams}
      )
			.then(response => {
        setPredictedText(response.data.predicted)
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
  }

  const handleText = (name, text) => {
    const hash = targetParams
    hash[name] = text
    setTargetParams(hash)
  }

  const parameterArea = mlModel.parameterNames.map((name, i) => {
    return(
      <div key={i}>
        <TextField
          label={name}
          multiline
          rows="4"
          value={targetParams[name]}
          onChange={e => handleText(name, e.target.value)}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
      </div>
    )
  })

  return (
    <>
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
            {t('predictionResult')}
					</Typography>
					<Typography variant="h5" component="h2">
						{
							predictedText !== '' ?
							<>{predictedText}</> :
							<>?</>
						}
					</Typography>
				</CardContent>
			</Card>
      <Paper className={fixedHeightPaper}>
        <div>
          {parameterArea}
					<Button variant="contained" color="primary" component="span" className={classes.button} onClick={predict}>
						Predict
					</Button>
        </div>
      </Paper>
    </>
  );
};

export default withRedux(ReadyMlModel)
