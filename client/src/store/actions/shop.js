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

export const getAllProductCategories = shopId => {
  return {
    type: types.SHOP_GET_ALL_PRODUCT_CATEGORIES,
    payload: shopId
  }
}

export const getAllProductCategoriesSuccess = (shopId, productCategories) => {
  return {
    type: types.SHOP_GET_ALL_PRODUCT_CATEGORIES_SUCCESS,
    payload: {
      shopId,
      productCategories
    }
  }
}

export const getAllProductCategoriesFailure = error => {
  return {
    type: types.SHOP_GET_ALL_PRODUCT_CATEGORIES_FAILURE,
    payload: error
  }
}

export const getAllProductsByCategory = (shopId, categoryId) => {
  return {
    type: types.SHOP_GET_ALL_PRODUCTS_BY_CATEGORY,
    payload: {
      shopId,
      categoryId
    }
  }
}

export const getAllProductsByCategorySuccess = (shopId, categoryId, products) => {
  return {
    type: types.SHOP_GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: {
      shopId,
      categoryId,
      products
    }
  }
}

export const getAllProductsByCategoryFailure = error => {
  return {
    type: types.SHOP_GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE,
    payload: error
  }
}