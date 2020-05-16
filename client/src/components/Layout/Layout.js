import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import * as shopActions from 'store/actions/shop'
import * as productCategoryActions from 'store/actions/productCategory'
import * as productActions from 'store/actions/product'

import useStyles from './styles'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

import Dashboard from 'pages/dashboard/Dashboard'
import Typography from 'pages/typography/Typography'
import Tables from 'pages/tables/Tables'
import Charts from 'pages/charts/Charts'
import Shop from 'pages/shop'

import { useLayoutState } from 'context/LayoutContext'

function Layout(props) {
  const dispatch = useDispatch()

  const shops = useSelector(state => _.get(state, 'shop.list'))
  const productCategories = useSelector(state => _.get(state, 'productCategory.list'))
  const products = useSelector(state => _.get(state, 'product.list'))

  useEffect(() => {
    !_.size(shops) && dispatch(shopActions.getAll())
    !_.size(productCategories) && dispatch(productCategoryActions.getAll())
    !_.size(products) && dispatch(productActions.getAll())
  })

  var classes = useStyles()

  // global
  var layoutState = useLayoutState()

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/ui/charts" component={Charts} />
            <Route path="/app/shop/:id" component={Shop} />
          </Switch>
        </div>
      </>
    </div>
  )
}

export default withRouter(Layout)
