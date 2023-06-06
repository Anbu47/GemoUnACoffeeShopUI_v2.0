import React, { Component } from "react"
import { Route, Routes } from "react-router-dom"

import AppRoutes from "./AppRoutes"
import { IntlProvider } from "react-intl"
import { Layout } from "./components/Layout"
import { Provider } from "react-redux"
import store from "./store"

export default class App extends Component {
  static displayName = App.name
  render() {
    return (
      <Provider store={store}>
        <IntlProvider locale="en">
          <React.StrictMode>
            <Layout>
              <Routes>
                {AppRoutes.map((route, index) => {
                  const { element, ...rest } = route
                  return <Route key={index} {...rest} element={element} />
                })}
              </Routes>
            </Layout>
          </React.StrictMode>
        </IntlProvider>
      </Provider>
    )
  }
}
