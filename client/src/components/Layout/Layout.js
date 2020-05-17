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

  const shopsTotal = useSelector(state => _.get(state, 'shop.total'))
  const productCategoriesTotal = useSelector(state => _.get(state, 'productCategory.total'))
  const productsTotal = useSelector(state => _.get(state, 'product.total'))

  useEffect(() => {
    _.isNil(shopsTotal) && dispatch(shopActions.getAll())
    _.isNil(productCategoriesTotal) && dispatch(productCategoryActions.getAll())
    _.isNil(productsTotal) && dispatch(productActions.getAll())
  }, [])

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
