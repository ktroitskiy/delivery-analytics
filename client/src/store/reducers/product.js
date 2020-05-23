import types from '../constants/product'

const initialState = {
  total: null,
  error: null
}

export default (state = initialState, action) => {

  switch (action.type) {

  case types.PRODUCT_GET_ALL_SUCCESS:
    return {
      ...state,
      total: action.payload.total
    }

  case types.PRODUCT_GET_ALL_FAILURE: {
    return {
      ...state,
      error: action.payload
    }
  }

  default:
    return state
  }
}
