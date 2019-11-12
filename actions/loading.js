import {
  START_LOADING,
  FINISH_LOADING,
} from '../actionType'

export const startLoading = () => ({
  type: START_LOADING,
})

export const finishLoading = () => ({
  type: FINISH_LOADING,
})
