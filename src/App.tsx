import React from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import { renderRoutes } from './routes/renderRoutes'
import './assets/css/index.css'
import vhCheck from 'vh-check'

vhCheck()

const style = {
  app: {
    height: window.innerHeight + 'px'
  }
}

function App() {
  return <div className='rvt-app' style={style.app}>
    <Router>
      {/* <Routes routes={routes} /> */}
      {
        renderRoutes(routes)
      }
    </Router>
  </div>
}

export default App
