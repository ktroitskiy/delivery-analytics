import { put, takeEvery } from 'redux-saga/effects'

import types from '../constants/shop'
import * as shopActions from '../actions/shop'
import backend from 'store/api/feathers'

function* getAll(action) {

  try {
    const shops = yield backend.service('shop').find({
      query: {}
    })

    yield put(shopActions.getAllSuccess(shops))

  } catch (e) {
    yield put(shopActions.getAllFailure(e))
  }
}

function* shopSaga() {
  yield takeEvery(types.SHOP_GET_ALL, getAll)
}

export default shopSaga
