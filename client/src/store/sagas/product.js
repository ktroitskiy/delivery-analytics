import { put, takeEvery } from 'redux-saga/effects'

import types from '../constants/product'
import * as productActions from '../actions/product'
import backend from 'store/api/feathers'

function* getAll(action) {

  try {
    const products = yield backend.service('product').find({
      query: {}
    })

    yield put(productActions.getAllSuccess(products))

  } catch (e) {
    yield put(productActions.getAllFailure(e))
  }
}

function* productSaga() {
  yield takeEvery(types.PRODUCT_GET_ALL, getAll)
}

export default productSaga
