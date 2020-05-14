import { call, put, takeEvery } from 'redux-saga/effects'

import types from '../constants/init'

import * as initActions from '../actions/init'

import * as Api from '../api'

function* init(action) {

  try {
    const appStatus = yield call(Api.get, 'status')
    yield put(initActions.initSuccess(appStatus))

  } catch (e) {
    yield put(initActions.initFailure(e))
  }
}

function* initSaga() {
  yield takeEvery(types.INIT, init)
}

export default initSaga
