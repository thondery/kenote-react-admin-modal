import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import Root from 'containers/root'

const rootNode = document.getElementById('root')

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootNode
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/root', () => {
    const NextRoot = require('containers/root').default // eslint-disable-line
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      rootNode
    )
  })
}