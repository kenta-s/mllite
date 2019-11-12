import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import Layout from '../components/MainLayout'
import Title from '../components/Title';

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 340,
  },
}));
const IndexPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // Tick the time every second
  const dispatch = useDispatch()
  useInterval(() => {
    dispatch({
      type: 'TICK',
      light: true,
      lastUpdate: Date.now()
    })
  }, 1000)
  return (
    <Layout>
      <Title>home</Title>
      <Paper className={fixedHeightPaper}>
        top page
      </Paper>
{/*
      <Clock />
      <Counter />
*/}
    </Layout>
  )
}

IndexPage.getInitialProps = ({ reduxStore }) => {
  // fetchMlModels()
  // axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
  //   .then(response => {
  //     console.log(response.data)
  //     const dispatch = useDispatch()
  //     dispatch({
  //       type: 'INCREMENT'
  //     })
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore
  dispatch({
    type: 'TICK',
    light: typeof window === 'object',
    lastUpdate: Date.now()
  })

  return {}
}

export default withRedux(IndexPage)
