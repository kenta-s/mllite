import axios from 'axios'
import { flashMessage } from 'redux-flash'
import {
  RECEIVE_ML_MODEL,
} from '../actionType'

export const receiveMlModel = (payload) => ({
  type: RECEIVE_ML_MODEL,
  payload
})
