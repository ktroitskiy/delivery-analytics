import types from '../constants/init'

const initialState = {
  status:         null,
  authStatus:     null,
  serverDateTime: null,
  timeDifference: null,
}

export default (state = initialState, action) => {

  switch (action.type) {

  case types.INIT_SUCCESS:
    return {
      ...state,
      status:         action.payload.status,
      serverDateTime: action.payload.dateTime,
    }

  case types.INIT_AUTH: {
    return {
      ...state,
      authStatus: true,
    }
  }

  case types.INIT_FAILURE:
    return {
      ...state,
      status:     false,
      authStatus: false,
    }

  case types.INIT:
  default:
    return state
  }
}
