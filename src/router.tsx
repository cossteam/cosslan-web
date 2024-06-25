import routes from '~react-pages'
import {useLocation, useRoutes} from 'react-router-dom'
import {userLogout} from "@/api/interfaces/user.ts";


const Router = () => {
  const routerView = useRoutes(routes)
  const location = useLocation()

  if (/\/logout$/i.test(location.pathname)) {
    userLogout()
    return null
  }

  return routerView
}

export default Router
