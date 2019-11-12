import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_ML_MODELS,
  ADD_ML_MODEL,
} from '../actionType'

export const receiveMlModels = (payload) => ({
  type: RECEIVE_ML_MODELS,
  payload
})

export const addMlModel = (payload) => ({
  type: ADD_ML_MODEL,
  payload
})
// export const fetchMlModels = async () => {
//   return dispatch => {
//     axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
//       .then(response => {
//         dispatch(receiveMlModels(response.data))
//         return(response.data)
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }
// }
