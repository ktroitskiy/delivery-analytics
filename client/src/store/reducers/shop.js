import _ from 'lodash'

import types from '../constants/shop'

const initialState = {
  list: {},
  total: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOP_GET_ALL_SUCCESS:
      return {
        ...state,
        list: _.keyBy(action.payload.data, 'id'),
        total: action.payload.total,
      }

    case types.SHOP_GET_ALL_PRODUCT_CATEGORIES_SUCCESS: {
      const newShopList = { ...state.list }
      newShopList[action.payload.shopId].productCategories =
        _.keyBy(action.payload.productCategories, 'id')

      return {
        ...state,
        list: newShopList,
      }
    }

    case types.SHOP_GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS: {
      const newShopList = { ...state.list }
      newShopList[action.payload.shopId].productCategories[action.payload.categoryId].products =
        action.payload.products

      return {
        ...state,
        list: newShopList,
      }
    }

    case types.SHOP_GET_ALL_FAILURE:
    case types.SHOP_GET_ALL_PRODUCT_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }

    default:
      return state
  }
}
