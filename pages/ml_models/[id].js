import React from 'react'
import { withRedux } from '../../lib/redux'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
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

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 340,
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
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
  const dispatch = useDispatch()
  const [targetText, setTargetText] = React.useState('')
  const [predictedText, setPredictedText] = React.useState('')
  React.useEffect(() => {
		dispatch(startLoading())
		axios.get(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models/${router.query.id}`)
			.then(response => {
				dispatch(receiveMlModel(response.data))
			})
			.catch(error => {
				console.error(error)
			})
			.then(() => {
		    dispatch(finishLoading())
			})
  }, [])
  const uploadCsv = files => {
    axios.post(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models/${mlModel.id}/upload_csv`,
		  {file: files[0]})
			.then(response => {
        console.log(response)
			})
  }

  const predict = () => {
		dispatch(startLoading())
		axios.post(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models/${router.query.id}/predict`,
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

  return (
    <Layout>
      <Title>{mlModel.name}</Title>
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						予測結果
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
          <div>
						<TextField
							label="予測対象のテキスト"
							multiline
							rows="4"
              value={targetText}
              onChange={e => setTargetText(e.target.value)}
							className={classes.textField}
							margin="normal"
							variant="outlined"
						/>
          </div>

					<Button variant="contained" color="primary" component="span" className={classes.button} onClick={predict}>
						Predict
					</Button>
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
							CSVアップロード
						</Button>
					</label>
        </div>
      </Paper>
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
