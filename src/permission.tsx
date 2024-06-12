import routes from '~react-pages'
import {useLocation, useNavigate, useRoutes} from 'react-router-dom'
import {userState} from "@/lib/state.ts";
import {useEffect} from "react";

const ToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userState.setState({user_id: 0})
    navigate("/login");
  })

  return null
}

const BeforeRouter = () => {
  const routerView = useRoutes(routes)
  const location = useLocation()

  if (/\/logout$/i.test(location.pathname)) {
    return <ToLogin/>
  }
  if (!/\/login$/i.test(location.pathname) && userState.getState().user_id === 0) {
    return <ToLogin/>
  }

  return routerView
}

export default BeforeRouter
