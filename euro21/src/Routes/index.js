import { lazy } from 'react'
import { ROUTES } from './routes'

export const routes = () => {
  return [
    {path: ROUTES.APP, component: lazy(() => import('../Pages/App'))},
    {path: ROUTES.ADMIN, component: lazy(() => import('../Pages/Admin'))},
    {path: ROUTES.LANDING, component: lazy(() => import('../Pages/Home'))},
    {path: ROUTES.PROFILE, component: lazy(() => import('../Pages/Profile'))},
    {path: `${ROUTES.INVITE}/:id`, component: lazy(() => import('../Pages/Invite'))},
    {path: `${ROUTES.TOURNAMENT}`, component: lazy(() => import('../Pages/Tournaments/'))},
    {path: `${ROUTES.TOURNAMENT}/:id`, component: lazy(() => import('../Pages/Tournaments/Tournament'))},
    
  ]
}
