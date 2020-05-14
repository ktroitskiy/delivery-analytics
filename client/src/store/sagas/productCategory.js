import { put, takeEvery } from 'redux-saga/effects'

import types from '../constants/productCategory'
import * as productCategoryActions from '../actions/productCategory'
import backend from 'store/api/feathers'

function* getAll(action) {

  try {
    const productCategories = yield backend.service('product-category').find({
      query: {}
    })

    yield put(productCategoryActions.getAllSuccess(productCategories))

  } catch (e) {
    yield put(productCategoryActions.getAllFailure(e))
  }
}

function* productCategorySaga() {
  yield takeEvery(types.PRODUCT_CATEGORY_GET_ALL, getAll)
}

export default productCategorySaga
