import React from 'react'
import { connect } from "react-redux"
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import axios from 'axios'
import { receiveMlModels } from '../actions/mlModels'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/MainLayout'

const MlModelPage = () => {
  const mlModels = useSelector(state => state.mlModels.data)
  const mlModelsDom = mlModels.map((mlModel, i) => {
    return(<p key={i}>{mlModel.name}</p>)
  })
  return(
    <Layout>
      <div>
        {mlModelsDom}
      </div>
    </Layout>
  )
}

MlModelPage.getInitialProps = ({ reduxStore }) => {
  const { dispatch } = reduxStore
  return axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
    .then(response => {
      dispatch(receiveMlModels(response.data))
    })
    .catch(error => {
      console.error(error)
    })
}

export default withRedux(MlModelPage)
