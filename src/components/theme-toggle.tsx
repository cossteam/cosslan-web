import {Moon, Sun} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTranslation} from "react-i18next"
import {useEffect, useState} from "react"
import {getLocalState, setLocalState} from "@/lib/state"

const storageKey: string = 'ui-theme';  // storage key
const defaultTheme: string = getLocalState(storageKey, 'system');  // default theme
const themeList: string[] = ['light', 'dark', 'system'];  // theme list

let currentTheme: string = ''
const updateTheme = (theme: string) => {
  setLocalState(storageKey, theme)

  let themeName = theme
  if (themeName === "system") {
    themeName = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  if (currentTheme === themeName) return

  const root = window.document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(currentTheme = themeName)
}
updateTheme(defaultTheme)

export function ThemeToggle({showLabel = false}) {
  const {t} = useTranslation()
  const [themeName, setTheme] = useState<string>(defaultTheme)

  useEffect(() => updateTheme(themeName), [themeName])

  const isChecked = (name: string) => name === themeName

  const themeLabel = (theme: string) => {
    return `theme.${theme}` as 'theme.light' | 'theme.dark' | 'theme.system'
  }

  const menuItems = themeList.map((theme) => {
    return (
      <DropdownMenuCheckboxItem key={theme} checked={isChecked(theme)} onClick={() => setTheme(theme)}>
        {t(themeLabel(theme))}
      </DropdownMenuCheckboxItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={showLabel ? 'default' : 'icon'} className="focus-visible:ring-0 focus-visible:ring-offset-0">
          {themeName === 'light' ?
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            :
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          }
          {showLabel && <span className="pl-2">{t(themeLabel(themeName))}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
