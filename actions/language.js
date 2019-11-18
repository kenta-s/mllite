import {
  SET_LANGUAGE,
} from '../actionType'

export const setLanguage = lng => ({
  type: SET_LANGUAGE,
  use: lng,
})
