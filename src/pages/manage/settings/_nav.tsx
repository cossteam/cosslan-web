import React from "react";
import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {Link, useLocation} from "react-router-dom";


const navItems = [
  {
    title: "Profile",
    href: "/manage/settings",
  },
  {
    title: "Account",
    href: "/manage/settings/account",
  },
  {
    title: "Appearance",
    href: "/manage/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/manage/settings/notifications",
  },
  {
    title: "Logout",
    href: "/logout",
  },
]

export function SettingsNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 sticky top-5 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({variant: "ghost"}),
            location.pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
