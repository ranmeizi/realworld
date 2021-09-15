import React from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import Routes from './routes/renderRoutes'
import './assets/css/index.css'

function App() {
  return <div className='rvt-app'>
    <Router>
      <Routes routes={routes} />
    </Router>
  </div>
}

export default App
