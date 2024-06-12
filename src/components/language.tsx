import {Languages} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useTranslation} from 'react-i18next';
import {setLanguage as updateLanguage} from "@/i18n/config";
import {uiState} from "@/lib/state.ts";

const LanguageList = [
  {type: 'en', label: 'English'},
  {type: 'zhCN', label: '简体中文'},
  {type: 'zhTW', label: '繁体中文'},
]
const LanguageTool = {
  default: uiState.getState().language || 'en',
  setLanguage: (language: string) => {
    if (LanguageList.find(item => item.type === language) === undefined) {
      language = LanguageList[0].type
    }
    updateLanguage(language).then(() => {
      uiState.setState({language})
    })
  }
}

export {LanguageList, LanguageTool};

export function LanguageInit() {
  LanguageTool.setLanguage(LanguageTool.default);
  return null
}

export function Language({showLabel = false}) {
  const {i18n} = useTranslation();

  const languageLabel = (lang: string) => {
    return LanguageList.find(item => item.type === lang)?.label || null;
  }

  const menuItems = LanguageList.map(({type, label}) => {
    return (
      <DropdownMenuCheckboxItem key={type} checked={type === i18n.language} onClick={() => LanguageTool.setLanguage(type)}>
        {label}
      </DropdownMenuCheckboxItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={showLabel ? 'default' : 'icon'} className="focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
          {showLabel && <span className="pl-2">{languageLabel(i18n.language) || languageLabel('en')}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
