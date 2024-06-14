import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Orbit as Logo} from "lucide-react"

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
import {useState} from "react";
import {cn, onLogout} from "@/lib/utils";
import {userState} from "@/lib/state.ts";
import * as React from "react";
import {CaretSortIcon, CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command.tsx";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

const networkGroups = [
  {
    label: "Networks",
    networks: [
      {
        label: "100.100.0.0/22",
        value: "network-BCGOPNGO36TFI6FRYPTFIGAKWI",
      },
      {
        label: "100.200.0.0/22",
        value: "network-CDGOPNGO36TFI6FRYPTFIGAKWI",
      },
    ],
  },
]

const ipv4s = [
  "10.147.17.*",
  "10.147.18.*",
  "10.147.19.*",
  "10.147.20.*",
  "10.144.*.*",
  "10.241.*.*",
  "10.242.*.*",
  "10.243.*.*",
  "10.244.*.*",
  "172.22.*.*",
  "172.23.*.*",
  "172.24.*.*",
  "172.25.*.*",
  "172.26.*.*",
  "172.27.*.*",
  "172.28.*.*",
  "172.29.*.*",
  "172.30.*.*",
  "192.168.191.*",
  "192.168.192.*",
  "192.168.193.*",
  "192.168.194.*",
  "192.168.195.*",
  "192.168.196.*"
]

const ManageNav = () => {
  const {t} = useTranslation();
  const location = useLocation();

  const [networkOpen, setNetworkOpen] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)
  const [networkSelected, setNetworkSelected] = React.useState(
    networkGroups[0].networks[0]
  )

  const [defaultIpv4, setDefaultIpv4] = React.useState(ipv4s[Math.floor(Math.random() * ipv4s.length)])

  const [openUserAvatar, setOpenUserAvatar] = useState(false)

  const navItems = [
    {
      title: t("pages.manage.overview"),
      href: "/manage",
    },
    {
      title: t("pages.manage.machines"),
      href: "/manage/machines",
    },
    {
      title: t("pages.manage.nodes"),
      href: "/manage/nodes",
    },
    {
      title: t("pages.manage.users"),
      href: "/manage/users",
    },
    {
      title: t("support.support"),
      href: "#",
      children: [
        {
          title: t("support.downloads"),
          href: "#",
        },
        {
          title: t("support.issues"),
          href: "#",
        },
        {
          title: t("support.request"),
          href: "#",
        },
      ],
    },
  ]

  return (
    <nav className="flex flex-col h-full">
      <div className="flex shrink-0 flex-row justify-center items-center p-[0.6rem] border-b">
        <Logo className="h-[2.2rem] w-[2.2rem]"/>
        <div className="flex flex-col h-full pl-3 scale-90 origin-left">
          <div className="text-lg leading-5">COSSLAN</div>
          <div className="text-xs leading-4 opacity-50">NETWORK</div>
        </div>
      </div>

      <Dialog open={networkDialog} onOpenChange={setNetworkDialog}>
        <Popover open={networkOpen} onOpenChange={setNetworkOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={networkOpen}
              aria-label="Select a network"
              className="justify-between shrink-0 w-full border-0 rounded-none border-b pr-3"
            >
              <div className="mr-2 max-w-full truncate opacity-80">
                Network: {networkSelected.label}
              </div>
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search network..."/>
                <CommandEmpty>No network found.</CommandEmpty>
                {networkGroups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.networks.map((network) => (
                      <CommandItem
                        key={network.value}
                        onSelect={() => {
                          setNetworkSelected(network)
                          setNetworkOpen(false)
                        }}
                        className="text-sm"
                      >
                        <div className="truncate">
                          {network.label}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 shrink-0",
                            networkSelected.value === network.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <CommandSeparator/>
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setNetworkOpen(false)
                        setNetworkDialog(true)
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5"/>
                      Create Network
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create network</DialogTitle>
            <DialogDescription>
              Add a new network to manage machines and nodes.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-3">
                <Label htmlFor="name">Network name</Label>
                <Input id="name" placeholder="Home Work"/>
              </div>
              <div className="space-y-4">
                <Label htmlFor="name">IPv4 range</Label>
                <RadioGroup defaultValue={defaultIpv4} onValueChange={setDefaultIpv4}>
                  <div className="grid grid-cols-3 gap-x-4">
                    {ipv4s.map((ipv4, key) => (
                      <Label key={key} htmlFor={ipv4} className="flex items-center space-x-2 py-2.5">
                        <RadioGroupItem value={ipv4} id={ipv4}/>
                        <span>{ipv4}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNetworkDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                {userState.getState().email}
              </p>
            </div>
            <div className="flex flex-col space-y-1 -mb-2">
              <Button variant="ghost" asChild className="justify-start -mx-2" onClick={() => setOpenUserAvatar(false)}>
                <Link to="/manage/settings">User settings</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start -mx-2" onClick={() => setOpenUserAvatar(false)}>
                <Link to="/logout" onClick={onLogout}>Logout</Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}

export default ManageNav;
