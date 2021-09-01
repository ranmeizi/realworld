import Home from './pages/Home'
import { MyRoute } from '@/routes/renderRoutes'

const routes: MyRoute[] = [
    {
        path: '/article',
        isTransition: true,
        component: Home
    }
]

export default routes
