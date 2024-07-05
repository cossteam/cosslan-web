import {Link, useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Menu as MenuIcon, X as CloseIcon, Orbit as LogoIcon, Loader2} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react";
import utils, {cn, onLogout} from "@/lib/utils";
import {networkState, userState} from "@/lib/state.ts";
import * as React from "react";
import {CaretSortIcon, CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator} from "@/components/ui/command.tsx";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {networkCreate, networkIpRangeRand, networkList} from "@/api/interfaces/network.ts";
import {Network} from "@/api/types/network.ts";
import {AvatarFallbackByName} from "@/lib/utils+.tsx";

export interface ManageNavProps {
  openMenu?: boolean;

  onClickMenu?(): void;
}

const ManageNav = ({
                     openMenu = true,
                     onClickMenu = () => {
                     }
                   }: ManageNavProps) => {
  const {t} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(userState.getState())

  const [networkOpen, setNetworkOpen] = React.useState(false)
  const [networkDialog, setNetworkDialog] = React.useState(false)
  const [networkSelected, setNetworkSelected] = React.useState<Network.Info>({ip_range: 'Loading...', network_id: 0})
  const [networkItems, setNetworkItems] = React.useState<Network.Info[]>([])
  const [networkIpRanges, setNetworkIpRanges] = React.useState<string[]>([])
  const [networkFormData, setNetworkFormData] = React.useState({ip_range: '', name:'', load: false})

  const [openUserAvatar, setOpenUserAvatar] = useState(false)

  const navigationItems = [
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

  const onRefreshNetworkList = (selectLatest = false) => {
    networkList().then(({data}) => {
      setNetworkItems(data.list)
      if (selectLatest) {
        onNetworkSelected(data.list[0])
      } else {
        setNetworkSelected(data.list.find(({network_id}) => network_id === networkState.getState().network_id) || data.list[0])
      }
    })
  }

  const onNetworkCreate = () => {
    setNetworkFormData({...networkFormData, load: true})
    networkCreate(networkFormData).then(() => {
      setNetworkDialog(false)
      onRefreshNetworkList(true)
    }).finally(() => {
      setNetworkFormData({...networkFormData, load: false})
    })
  }

  useEffect(() => {
    userState.subscribe(setUserInfo)
    onRefreshNetworkList()
  }, []);

  useEffect(() => {
    if (!networkDialog) {
      return
    }
    networkIpRangeRand({num: 18}).then(({data}) => {
      setNetworkIpRanges(data.list)
      setNetworkFormData({...networkFormData, ip_range: data.list[Math.floor(Math.random() * data.list.length)]})
    })
  }, [networkDialog]);

  useEffect(() => {
    if (!networkSelected.network_id) {
      return
    }
    networkState.setState(networkSelected)
  }, [networkSelected]);

  const onNetworkSelected = (network: Network.Info) => {
    setNetworkSelected(network)
    if (location.pathname === '/manage') {
      navigate(0)
    } else {
      navigate("/manage", {replace: true});
    }
  }

  return (
    <nav className="flex flex-col h-full">
      <div className="shrink-0 flex flex-row justify-between items-center h-14 border-b space-x-4 md:justify-center">
        <div className="flex flex-row items-center px-4">
          <LogoIcon className="h-[2.2rem] w-[2.2rem]"/>
          <div className="flex flex-col pl-3 scale-90 origin-left">
            <div className="text-lg leading-5">COSSLAN</div>
            <div className="text-xs leading-4 opacity-50">NETWORK</div>
          </div>
        </div>
        <div
          className={cn(
            "shrink-0 h-full px-4 flex items-center transition-transform md:hidden",
            openMenu
              ? "-rotate-90"
              : ""
          )}
          onClick={onClickMenu}
        >
          {openMenu ? (
            <CloseIcon/>
          ) : (
            <MenuIcon/>
          )}
        </div>
      </div>

      <div className={
        cn(
          "flex-col flex-1 h-0",
          openMenu ? "flex" : "hidden md:flex"
        )
      }>
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
                  Network: {networkSelected.name || networkSelected.ip_range}
                </div>
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search network..."/>
                  <CommandEmpty>No network found.</CommandEmpty>
                  <CommandGroup>
                    {networkItems.map((network) => (
                      <CommandItem
                        key={network.network_id}
                        onSelect={() => {
                          onNetworkSelected(network)
                          setNetworkOpen(false)
                        }}
                        className="text-sm"
                      >
                        <div className="truncate">
                          {network.name || network.ip_range}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 shrink-0",
                            networkSelected.network_id === network.network_id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
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
          <DialogContent onOpenAutoFocus={utils.preventDefault}>
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
                  <Input id="name" placeholder="Network name" value={networkFormData.name} onChange={({target}) => {
                    setNetworkFormData({...networkFormData, name: target.value})
                  }}/>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="name">IPv4 range</Label>
                  <RadioGroup value={networkFormData.ip_range} onValueChange={(val) => {
                    setNetworkFormData({...networkFormData, ip_range: val})
                  }}>
                    <div className="grid grid-cols-3 gap-x-4">
                      {networkIpRanges.map((ip_range, key) => (
                        <Label key={key} htmlFor={ip_range} className="flex items-center space-x-2 py-2.5">
                          <RadioGroupItem value={ip_range} id={ip_range}/>
                          <span>{ip_range}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <DialogFooter className="max-sm:space-y-2 max-sm:space-y-reverse">
              <Button variant="outline" onClick={() => setNetworkDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={networkFormData.load} onClick={onNetworkCreate}>
                {networkFormData.load && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex-1 space-y-4 py-4 overflow-y-auto overflow-x-hidden">
          <div className="px-3 space-y-1">
            {navigationItems.map((item, key) => {
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
                          <Link key={key} to={child.href} onClick={onClickMenu} className="text-sm font-normal opacity-60 hover:opacity-80">{child.title}</Link>
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
                    <Link to={item.href} onClick={onClickMenu}>{item.title}</Link>
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
                <div className="relative shrink-0">
                  <Avatar className="size-8">
                    <AvatarImage src={userInfo.avatar} alt={userInfo.name}/>
                    <AvatarFallbackByName name={userInfo.name || userInfo.email}/>
                  </Avatar>
                  {userInfo.notification_unread || 0 > 0 && (
                    <div className="w-2 h-2 bg-blue-600 rounded absolute top-0 right-0"></div>
                  )}
                </div>
                <span className="ml-2 truncate">{userInfo.name || 'Your Account'}</span>
              </div>
            </PopoverTrigger>
            <PopoverContent sideOffset={12} className="w-auto">
              <div className="p-2 pt-0 pb-3">
                <p className="text-sm text-muted-foreground">
                  {userInfo.email}
                </p>
              </div>
              <div className="flex flex-col space-y-1 -mb-2" onClick={() => setOpenUserAvatar(false)}>
                <Button variant="ghost" asChild className="justify-start -mx-2">
                  <Link to="/manage/settings" onClick={onClickMenu}>User settings</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start -mx-2">
                  <Link to="/manage/notifications" className="relative" onClick={onClickMenu}>
                    Notifications
                    {userInfo.notification_unread || 0 > 0 && (
                      <div className="w-2 h-2 bg-blue-600 rounded absolute top-1 right-1"></div>
                    )}
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start -mx-2">
                  <Link to="/logout" onClick={onLogout}>Logout</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

export default ManageNav;
