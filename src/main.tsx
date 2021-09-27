import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.less'
import App from './App'
import { Provider } from 'react-redux'
import { AliveScope } from 'react-activation'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import './base.less'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AliveScope>
        <App />
      </AliveScope>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
)
