import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.less'
import App from './App'
import { Provider } from 'react-redux'
import { AliveScope } from 'react-activation'
import store from './redux/store'
import './base.less'

ReactDOM.render(
  <Provider store={store}>
    <AliveScope>
      <App />
    </AliveScope>
  </Provider>
  ,
  document.getElementById('root')
)

document.body.className = 'rvt-body-' + store.getState().app.theme
