import routes from '~react-pages'
import {useLocation, useRoutes} from 'react-router-dom'
import {userState} from "@/lib/state.ts";


const Router = () => {
  const routerView = useRoutes(routes)
  const location = useLocation()

  if (/\/logout$/i.test(location.pathname)) {
    userState.setState({user_id: 0})
    return null
  }

  return routerView
}

export default Router
