import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import React from "react";
import {alerter} from "@/components/ui+/use-alert.ts";
import {userState} from "@/lib/state.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function onLogout(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = event.currentTarget
  if (target.tagName === 'A') {
    const href = target.getAttribute('href')
    if (/\/logout$/i.test(`${href}`)) {
      event.preventDefault()
      alerter({
        title: "Logout",
        description: "Are you sure you want to logout?",
        onOk: () => {
          userState.setState({user_id: 0})
        },
      })
    }
  }
}
