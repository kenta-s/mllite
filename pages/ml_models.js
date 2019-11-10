import React from 'react'
import { connect } from "react-redux"
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import { receiveMlModels, fetchMlModels } from '../actions/mlModels'
import { useSelector, useDispatch } from 'react-redux'

const MlModelPage = props => {
  const mlModelsDom = props.mlModels.map((mlModel, i) => {
    return(<p key={i}>{mlModel.name}</p>)
  })
  return(
    <div>
      {mlModelsDom}
    </div>
  )
}

MlModelPage.getInitialProps = ({ reduxStore }) => {
  const { dispatch } = reduxStore
  return axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
    .then(response => {
      return({
        mlModels: response.data
      })
    })
    .catch(error => {
      console.error(error)
    })
}

export default withRedux(MlModelPage)
