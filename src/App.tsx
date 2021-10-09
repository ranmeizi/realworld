import React, { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import routes from './routes'
import { renderRoutes } from './routes/renderRoutes'
import vhCheck from 'vh-check'
import { store } from '@/redux/store'
import { themeChange } from '@/theme/useThemeStyle'
import config from '@/config'

vhCheck()

const style = {
  app: {
    height: window.innerHeight + 'px'
  }
}

// useStyle初始化
function themeInit() {
  const theme = store.getState().app.theme
  themeChange(theme)
  document.body.className = 'rvt-body-' + theme
}

function App() {
  useEffect(() => {
    themeInit()
  }, [])

  return <div className='rvt-app' style={style.app}>
    <Router basename={config.routeBasename}>
      {
        renderRoutes(routes)
      }
    </Router>
  </div>
}

export default App
