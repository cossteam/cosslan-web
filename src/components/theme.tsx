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
import {uiState} from "@/lib/state.ts";

const ThemeList: string[] = [
  'light',
  'dark',
  'system'
];
const ThemeTool = {
  default: uiState.getState().theme || 'system',
  setTheme: (theme: string) => {
    if (!ThemeList.includes(theme)) {
      theme = ThemeList[0]
    }
    uiState.setState({theme})
    //
    if (theme === "system") {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }
}

export {ThemeList, ThemeTool}

export function ThemeInit() {
  ThemeTool.setTheme(ThemeTool.default)
  return null
}

export function Theme({showLabel = false}) {
  const {t} = useTranslation()
  const [themeName, setThemeName] = useState<string>(ThemeTool.default)

  useEffect(() => {
    uiState.subscribe(({theme}) => {
      setThemeName(theme)
    })
  }, [themeName])

  const themeLabel = (theme: string) => {
    return t(`theme.${theme}` as 'theme.light' | 'theme.dark' | 'theme.system')
  }

  const menuItems = ThemeList.map((theme) => {
    return (
      <DropdownMenuCheckboxItem key={theme} checked={theme === themeName} onClick={() => ThemeTool.setTheme(theme)}>
        {themeLabel(theme)}
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
          {showLabel && <span className="pl-2">{themeLabel(themeName)}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
