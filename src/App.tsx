import {Suspense} from "react";
import Loading from "@/components/loading.tsx";
import Title from "@/components/title.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Alerter} from "@/components/ui+/alerter.tsx";
import {ThemeInit} from "@/components/theme.tsx";
import {LanguageInit} from "@/components/language.tsx";
import BeforeRouter from './permission'

const App = () => {
  return (
    <>
      <Title/>
      <ThemeInit/>
      <LanguageInit/>
      <Suspense fallback={<Loading/>}>
        <BeforeRouter/>
      </Suspense>
      <Toaster/>
      <Alerter/>
    </>
  )
}

export default App
