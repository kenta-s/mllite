import React from 'react'
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
  const [targetText, setTargetText] = React.useState({})
  const [predictedText, setPredictedText] = React.useState('')
  const { t } = useTranslation()

  const predict = () => {
		dispatch(startLoading())
		axios.post(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models/${router.query.id}/prediction`,
        {target_text: targetText}
      )
			.then(response => {
        setPredictedText(response.data)
			})
			.catch(error => {
				console.error(error)
			})
			.then(() => {
		    dispatch(finishLoading())
			})
  }

  const handleText = (name, text) => {
    const hash = targetText
    hash[name] = text
    setTargetText(hash)
  }

  const parameterArea = mlModel.parameterNames.map((name, i) => {
    return(
      <div key={i}>
        <TextField
          label={name}
          multiline
          rows="4"
          value={targetText[name]}
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

// ReadyMlModel.getInitialProps = (context) => {
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

// export default withRedux(ReadyMlModel)
export default withRedux(ReadyMlModel)
