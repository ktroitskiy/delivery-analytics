import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './Layout/Layout'

import Error from 'pages/error/Error'

import { useUserState } from '../context/UserContext'

export default function App() {
  var { isAuthenticated } = useUserState()

  const PrivateRoute = ({ component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  )

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  )
}
