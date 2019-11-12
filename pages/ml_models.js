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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
	paper: {
    padding: theme.spacing(3, 2),
	  margin: theme.spacing(3),
	}
}));

const MlModelPage = () => {
  const classes = useStyles();
  const mlModels = useSelector(state => state.mlModels.data)
  const mlModelsDom = mlModels.map((mlModel, i) => {
    return(
			<Link key={i} href={`/ml_models/${mlModel.id}`}>
        <Paper className={classes.paper}>
          <p>{mlModel.name}</p>
        </Paper>
			</Link>
    )
  })
  return(
    <Layout>
      <div>
        {mlModelsDom}
      </div>
      <NewMlModelModal />
    </Layout>
  )
}

MlModelPage.getInitialProps = ({ reduxStore }) => {
  // const res = await fetch('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models');
  // const mlModels = await res.json();

  // return { mlModels };
  const { dispatch } = reduxStore
	dispatch(startLoading())
  return axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
    .then(response => {
      dispatch(receiveMlModels(response.data))
	    dispatch(finishLoading())
    })
    .catch(error => {
      console.error(error)
    })
}

export default withRedux(MlModelPage)
