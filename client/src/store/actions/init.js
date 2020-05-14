import types from '../constants/init'

export const init = () => {
  return {
    type: types.INIT,
    payload: null,
  }
}

export const initAuth = () => {
  return {
    type: types.INIT_AUTH,
    payload: null,
  }
}

export const initSuccess = (appStatus) => {
  return {
    type: types.INIT_SUCCESS,
    payload: appStatus,
  }
}

export const initFailure = (err) => {
  return {
    type: types.INIT_FAILURE,
    payload: err,
  }
}
