import React from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config'
import routes from './routes'

function App() {
  return <div className='app'>
    <Router>
        {renderRoutes(routes)}
    </Router>
  </div>
}

export default App
