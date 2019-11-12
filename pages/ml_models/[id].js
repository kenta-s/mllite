import React from 'react'
import { withRedux } from '../../lib/redux'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Layout from '../../components/MainLayout';
import { receiveMlModel } from '../../actions/mlModel'
import Button from '@material-ui/core/Button';
import { startLoading, finishLoading } from '../../actions/loading'

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 340,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const MlModel = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)
	const router = useRouter();
  const dispatch = useDispatch()
  React.useEffect(() => {
		dispatch(startLoading())
		axios.get(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models/${router.query.id}`)
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
    // console.log(files[0])
    axios.post(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models/${mlModel.id}/upload_csv`,
		  {file: files[0]})
			.then(response => {
        console.log(response)
			})
  }

  return (
    <Layout>
      <Paper className={fixedHeightPaper}>
        <h1>{mlModel.name}</h1>
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
