import { ThemeToggle } from "./components/theme-toggle"
import { LanguageToggle } from "./components/language-toggle"


const App = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <ThemeToggle />
        <div className="w-4" />
        <LanguageToggle />
      </div>
    </>
  )
}

export default App