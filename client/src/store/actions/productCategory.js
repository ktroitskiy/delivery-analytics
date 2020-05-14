import types from '../constants/productCategory'

export const getAll = () => {
  return {
    type: types.PRODUCT_CATEGORY_GET_ALL,
    payload: null,
  }
}

export const getAllSuccess = data => {
  return {
    type: types.PRODUCT_CATEGORY_GET_ALL_SUCCESS,
    payload: data,
  }
}

export const getAllFailure = error => {
  return {
    type: types.PRODUCT_CATEGORY_GET_ALL_FAILURE,
    payload: error,
  }
}