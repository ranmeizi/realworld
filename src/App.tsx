import React, { Suspense } from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import renderRoutes from './routes/renderRoutes'

function App() {
  return <div className='app'>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </Router>
  </div>
}

export default App
