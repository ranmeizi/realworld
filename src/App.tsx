import React from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import renderRoutes from './routes/renderRoutes'

function App() {
  return <div className='app'>
    <Router>
        {renderRoutes(routes)}
    </Router>
  </div>
}

export default App
