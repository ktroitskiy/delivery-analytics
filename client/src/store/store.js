import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter } from 'connected-react-router'

import initSaga             from  './sagas/init'
import shopSaga             from  './sagas/shop'
import productCategorySaga  from  './sagas/productCategory'
import productSaga  from  './sagas/product'

import initReducers   from './reducers/init'
import shopReducers   from './reducers/shop'
import productCategoryReducers   from './reducers/productCategory'
import productReducers   from './reducers/product'

const sagaMiddleware = createSagaMiddleware()

const history = createBrowserHistory()

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
]

const appReducer = combineReducers({
  init:             initReducers,
  shop:             shopReducers,
  productCategory:  productCategoryReducers,
  product:          productReducers,
  router:           connectRouter(history),
})

const store = applyMiddleware(...middleware)(createStore)(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

sagaMiddleware.run(initSaga)
sagaMiddleware.run(shopSaga)
sagaMiddleware.run(productCategorySaga)
sagaMiddleware.run(productSaga)

export {
  store,
  history,
}
