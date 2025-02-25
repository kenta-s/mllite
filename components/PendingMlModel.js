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

const PendingMlModel = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
  const dispatch = useDispatch()
  const [targetText, setTargetText] = React.useState({})
  const [predictedText, setPredictedText] = React.useState('')

  const uploadCsv = files => {
    axios.post(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models/${mlModel.id}/upload_csv`,
		  {file: files[0]})
			.then(response => {
        console.log(response)
			})
  }

  return (
    <>
      <Paper className={fixedHeightPaper}>
        <div>
          学習中です。<br />モデルが作成されるまで数時間掛かることがあります。
        </div>
      </Paper>
    </>
  );
};

// PendingMlModel.getInitialProps = (context) => {
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

// export default withRedux(PendingMlModel)
export default withRedux(PendingMlModel)
