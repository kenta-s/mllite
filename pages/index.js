import React from 'react'
import { useDispatch } from 'react-redux'
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import axios from 'axios'
import { fetchMlModels } from '../actions/mlModels'

const IndexPage = () => {
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
    <>
      <Clock />
      <Counter />
    </>
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
