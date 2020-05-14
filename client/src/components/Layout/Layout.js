import React, { useEffect } from "react";
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { useDispatch } from 'react-redux'

import * as shopActions from 'store/actions/shop'
import * as productCategoryActions from 'store/actions/productCategory'
import * as productActions from 'store/actions/product'

import useStyles from "./styles";

import Header from "../Header";
import Sidebar from "../Sidebar";

import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Tables from "../../pages/tables";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      shopActions.getAll()
    )
    dispatch(
      productCategoryActions.getAll()
    )
    dispatch(
      productActions.getAll()
    )
  })


  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

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
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
