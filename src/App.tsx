import React from 'react'
import './App.less'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import renderRoutes from './routes/renderRoutes'
import './assets/css/index.css'

const Routes = (props: any) => renderRoutes(props.routes, {}, { location: props.location })

console.log('renderRoutes', renderRoutes)

function App() {
  return <div className='app'>
    <Router>
      <Routes routes={routes} />
    </Router>
  </div>
}

export default App
