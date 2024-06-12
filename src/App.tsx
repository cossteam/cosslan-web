import {Suspense, useEffect} from "react";
import Loading from "@/components/loading.tsx";
import Title from "@/components/title.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Alerter} from "@/components/ui+/alerter.tsx";
import {ThemeInit} from "@/components/theme.tsx";
import {LanguageInit} from "@/components/language.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {userState} from "@/lib/state.ts";
import Router from './router'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate();

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
  })

  return (
    <>
      <Title/>
      <ThemeInit/>
      <LanguageInit/>
      <Suspense fallback={<Loading/>}>
        <Router/>
      </Suspense>
      <Toaster/>
      <Alerter/>
    </>
  )
}

export default App
