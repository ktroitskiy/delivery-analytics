import types from '../constants/shop'

const initialState = {
  list: {},
  total: null,
  error: null
}

export default (state = initialState, action) => {

  switch (action.type) {

  case types.SHOP_GET_ALL_SUCCESS:
    return {
      ...state,
      list: action.payload.data,
      total: action.payload.total
    }

  case types.SHOP_GET_ALL_FAILURE: {
    return {
      ...state,
      error: action.payload
    }
  }

  default:
    return state
  }
}
