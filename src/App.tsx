import {Suspense, useEffect} from "react";
import Loading from "@/components/loading.tsx";
import Title from "@/components/title.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Alerter} from "@/components/ui+/alerter.tsx";
import {ThemeInit} from "@/components/theme.tsx";
import {LanguageInit} from "@/components/language.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {routeState, userState} from "@/lib/state.ts";
import Router from './router';

ThemeInit()
LanguageInit()

const App = () => {
  const location = useLocation()
  const navigate = useNavigate();

  const updateHistory = () => {
    const {history} = routeState.getState()
    if (history.length === 0 || history[0] !== location.pathname) {
      routeState.setState({
        history: [location.pathname, ...history].slice(0, 100),
      })
    }
  }

  useEffect(() => {
    userState.subscribe(
      state => state.user_id,
      user_id => {
        if (user_id === 0 && !/\/login$/i.test(location.pathname)) {
          navigate("/login");
        }
      },
      {
        fireImmediately: true,
      }
    )
    updateHistory();
  })

  useEffect(updateHistory, [location]);

  return (
    <>
      <Title/>
      <Suspense fallback={<Loading/>}>
        <Router/>
      </Suspense>
      <Toaster/>
      <Alerter/>
    </>
  )
}

export default App
