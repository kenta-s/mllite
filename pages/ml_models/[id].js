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

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 340,
  },
}));

const MlModel = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const mlModel = useSelector(state => state.mlModel)

  return (
    <Layout>
      <Paper className={fixedHeightPaper}>
        <h1>{mlModel.name}</h1>
        <div>
        </div>
      </Paper>
    </Layout>
  );
};

MlModel.getInitialProps = (context) => {
  const { id } = context.query;
  const reduxStore = context.reduxStore;
  const { dispatch } = reduxStore
  return axios.get(`https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models/${id}`)
    .then(response => {
      dispatch(receiveMlModel(response.data))
    })
    .catch(error => {
      console.error(error)
    })
};

export default withRedux(MlModel)
