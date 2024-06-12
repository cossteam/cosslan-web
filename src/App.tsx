import {Suspense} from "react";
import Loading from "@/components/loading.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import BeforeRouter from './permission'
import {ThemeInit} from "@/components/theme.tsx";
import {LanguageInit} from "@/components/language.tsx";

const App = () => {
  return (
    <>
      <ThemeInit/>
      <LanguageInit/>
      <Suspense fallback={<Loading/>}>
        <BeforeRouter/>
      </Suspense>
      <Toaster/>
    </>
  )
}

export default App
