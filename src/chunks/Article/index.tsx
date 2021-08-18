import React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

export default function () {
    return renderRoutes(routes)
}
