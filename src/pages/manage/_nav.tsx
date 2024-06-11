import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Terminal} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import NavNetwork from "@/pages/manage/_network.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";

const ManageNav = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const [openUserAvatar, setOpenUserAvatar] = useState(false)

  const navItems = [
    {
      title: t("page.manage.overview"),
      href: "/manage",
    },
    {
      title: t("page.manage.machines"),
      href: "/manage/machines",
    },
    {
      title: t("page.manage.nodes"),
      href: "/manage/nodes",
    },
    {
      title: t("page.manage.support.index"),
      href: "#",
      children: [
        {
          title: t("page.manage.support.contact"),
          href: "#",
        },
        {
          title: t("page.manage.support.downloads"),
          href: "#",
        },
      ],
    },
  ]

  return (
    <nav className="flex flex-col h-full">
      <div className="flex shrink-0 flex-row justify-center items-center p-2 border-b">
        <Terminal className="h-[2.3rem] w-[2.3rem]"/>
        <div className="flex flex-col h-full pl-2 scale-90 origin-left">
          <div className="text-lg">COSSLAN</div>
          <div className="text-xs -mt-1 opacity-50">NETWORK</div>
        </div>
      </div>

      <NavNetwork className="shrink-0 w-full border-0 rounded-none border-b pr-3"/>

      <div className="flex-1 space-y-4 py-4 overflow-y-auto overflow-x-hidden">
        <div className="px-3 space-y-1">
          {navItems.map((item, key) => {
            if (item.children) {
              return (
                <Accordion type="single" collapsible key={key}>
                  <AccordionItem value={item.href} className="border-b-0">
                    <Button variant={location.pathname === item.href ? 'secondary' : 'ghost'} className="w-full justify-start hover:no-underline" asChild>
                      <AccordionTrigger>
                        <div className="flex-1 text-left">{item.title}</div>
                      </AccordionTrigger>
                    </Button>
                    <AccordionContent className="p-4 flex flex-col space-y-3">
                      {item.children.map((child, key) => (
                        <Link key={key} to={child.href} className="text-sm font-normal opacity-60 hover:opacity-80">{child.title}</Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            } else {
              return (
                <Button
                  key={key}
                  variant={location.pathname === item.href ? 'secondary' : 'ghost'}
                  className={cn("w-full", "justify-start")}
                  asChild>
                  <Link to={item.href}>{item.title}</Link>
                </Button>
              )
            }
          })}
        </div>
      </div>

      <div className="shrink-0 p-4">
        <Popover open={openUserAvatar} onOpenChange={setOpenUserAvatar}>
          <PopoverTrigger asChild>
            <div className="flex flex-row justify-center items-center cursor-pointer">
              <Avatar className="shrink-0 size-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                <AvatarFallback>L</AvatarFallback>
              </Avatar>
              <span className="ml-2">Your Account</span>
            </div>
          </PopoverTrigger>
          <PopoverContent sideOffset={12} className="w-auto">
            <div className="p-2 pt-0 pb-3">
              <p className="text-sm text-muted-foreground">
                aabb@sarzla.com
              </p>
            </div>
            <div className="flex flex-col space-y-1 -mb-2">
              <Button variant="ghost" asChild className="justify-start -mx-2" onClick={() => setOpenUserAvatar(false)}>
                <Link to="/manage/settings">User settings</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start -mx-2" onClick={() => setOpenUserAvatar(false)}>
                <Link to="/logout">Logout</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
export default ManageNav;
