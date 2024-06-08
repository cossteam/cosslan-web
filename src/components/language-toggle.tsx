import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTranslation } from 'react-i18next';
import { languageType, setLanguage } from "@/i18n/config";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const isChecked = (lang: string) => lang === i18n.language;

  const menuItems = Object.keys(languageType).map((lang) => {
    return (
      <DropdownMenuCheckboxItem key={lang} checked={isChecked(lang)} onClick={() => setLanguage(lang)}>
        {languageType[lang]}
      </DropdownMenuCheckboxItem>
    )
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="focus-visible:ring-0 focus-visible:ring-offset-0">
          <Languages className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="pl-2">{languageType[i18n.language] || languageType['en']}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[6rem]">
        {menuItems}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
