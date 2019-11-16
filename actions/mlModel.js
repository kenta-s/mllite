import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_ML_MODEL,
  UPDATE_ML_MODEL_STATUS,
} from '../actionType'

export const receiveMlModel = (payload) => ({
  type: RECEIVE_ML_MODEL,
  payload
})

export const updateMlModelStatus = status => ({
  type: UPDATE_ML_MODEL_STATUS,
  status
})
