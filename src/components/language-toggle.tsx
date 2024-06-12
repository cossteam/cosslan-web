import {Languages} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {useTranslation} from 'react-i18next';
import {setLanguage} from "@/i18n/config";

const LanguageList: {type: string, label:string}[] = [
  {type: 'en', label: 'English'},
  {type: 'zhCN', label: '简体中文'},
  {type: 'zhTW', label: '繁体中文'},
]

export {LanguageList};

export function LanguageToggle({showLabel = false}) {
  const {i18n} = useTranslation();

  const isChecked = (lang: string) => lang === i18n.language;

  const languageName = (lang: string) => {
    return LanguageList.find(item => item.type === lang)?.label || lang;
  }

  const menuItems = LanguageList.map(({type, label}) => {
    return (
      <DropdownMenuCheckboxItem key={type} checked={isChecked(type)} onClick={() => setLanguage(type)}>
        {label}
      </DropdownMenuCheckboxItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={showLabel ? 'default' : 'icon'} className="focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
          {showLabel && <span className="pl-2">{languageName(i18n.language) || languageName('en')}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
