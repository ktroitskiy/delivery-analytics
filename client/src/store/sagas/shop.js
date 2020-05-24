import { put, takeEvery } from 'redux-saga/effects'

import types from '../constants/shop'
import * as shopActions from '../actions/shop'
import backend from 'store/api/feathers'

function* getAll(action) {
  try {
    const shops = yield backend.service('shop').find()

    yield put(shopActions.getAllSuccess(shops))

  } catch (e) {
    yield put(shopActions.getAllFailure(e))
  }
}

function* getAllProductCategories(action) {
  try {
    const shopId = action.payload
    const productCategories = yield backend.service('product-category').find({
      query: {
        shopId
      }
    })

    yield put(shopActions.getAllProductCategoriesSuccess(shopId, productCategories.data))
  } catch (e) {
    console.log(e)
    yield put(shopActions.getAllProductCategoriesFailure(e))
  }
}

function* getAllProductsByCategory(action) {
  try {
    const shopId = action.payload.shopId
    const categoryId = action.payload.categoryId

    const products = yield backend.service('product').find({
      query: {
        shopId,
        categoryId
      }
    })

    yield put(shopActions.getAllProductsByCategorySuccess(shopId, categoryId, products))
  } catch (e) {
    console.log(e)
    yield put(shopActions.getAllProductsByCategoryFailure(e))
  }
}

function* getAnalitics(action) {
  try {
    const shopId = action.payload.shopId

    const shopAnalitics = yield backend.service('analitics').find({
      query: {
        entityId: shopId,
        entityType: 'shop'
      }
    })

    yield put(shopActions.getShopAnaliticsSuccess(shopId, shopAnalitics.data))
  } catch (e) {
    console.log(e)
    yield put(shopActions.getShopAnaliticsFailure(e))
  }
}

function* shopSaga() {
  yield takeEvery(types.SHOP_GET_ALL, getAll)
  yield takeEvery(types.SHOP_GET_ALL_PRODUCT_CATEGORIES, getAllProductCategories)
  yield takeEvery(types.SHOP_GET_ALL_PRODUCTS_BY_CATEGORY, getAllProductsByCategory)
  yield takeEvery(types.SHOP_GET_ANALITICS, getAnalitics)
}

export default shopSaga
