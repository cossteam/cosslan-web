import React from "react";
import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {alerter} from "@/components/ui+/use-alert.ts";
import {userState} from "@/lib/state.ts";

type navItem = {
  title: string;
  href: string;
}

const navItems: navItem[] = [
  {
    title: "Account",
    href: "/manage/settings",
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

export default function SettingsNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/logout") {
      event.preventDefault()
      alerter({
        title: "Logout",
        description: "Are you sure you want to logout?",
        onOk: () => {
          userState.setState({user_id: 0})
          navigate("/login");
        },
      })
    }
  }

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
          onClick={(event) => onLogout(event, item.href)}
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
