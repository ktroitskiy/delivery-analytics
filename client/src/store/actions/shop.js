import types from '../constants/shop'

export const getAll = () => {
  return {
    type: types.SHOP_GET_ALL,
    payload: null,
  }
}

export const getAllSuccess = data => {
  return {
    type: types.SHOP_GET_ALL_SUCCESS,
    payload: data,
  }
}

export const getAllFailure = error => {
  return {
    type: types.SHOP_GET_ALL_FAILURE,
    payload: error,
  }
}