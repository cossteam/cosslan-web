import {Check, Search, X as CloseIcon} from "lucide-react"

import {cn} from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect, useState} from "react";
import {User} from "@/api/types/user.ts";
import {Avatar} from "@/components/ui/avatar.tsx";
import {userSearch} from "@/api/interfaces/user.ts";
import {AvatarFallbackByName} from "@/lib/utils+.tsx";
import {CommandLoading} from "cmdk";

interface UserSelectProps {
  ignoreNetworkId?: number;
  className?: string;
  onValueChange?(value: string): void;
}

export function UserSelect({...props}: UserSelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [users, setUsers] = useState<User.InfoSimple[]>([])
  const [selected, setSelected] = useState<User.InfoSimple[]>([])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  interface UserItemProps {
    user: User.InfoSimple;
    simple?: boolean;
    className?: string;
    avatarClassName?: string;
  }

  const UserItem = ({user, simple, className, avatarClassName}: UserItemProps) => {
    if (!user) {
      return null
    }
    return (
      <div className={
        cn(
          "flex items-center space-x-3",
          className
        )}
      >
        <Avatar className={
          cn(
            "h-8 w-8",
            avatarClassName
          )}>
          <AvatarFallbackByName name={user.name || user.email || ''}/>
        </Avatar>
        <div className="space-y-0.5">
          {simple ? (
            <p className="text-sm text-muted-foreground">
              {user.name || user.email}
            </p>
          ) : (
            <>
              {user.name && (
                <p className="text-sm font-medium leading-none">
                  {user.name}
                </p>
              )}
              <p className="text-sm text-muted-foreground leading-none">
                {user.email}
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!open) {
      setValue("")
    }
  }, [open]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
      setLoading(false)
    }
    if (value === "" && users.length > 0) {
      return
    }
    setLoading(true)
    setTimer(setTimeout(() => {
      setTimer(null)
      userSearch({
        key: value,
        ignore_network_id: props.ignoreNetworkId || undefined,
      }).then(({data}) => {
        const arr = users
        data.list.forEach((u) => {
          if (!arr.find((s) => s.email === u.email)) {
            arr.push(u)
          }
        })
        setUsers(arr)
      }).finally(() => {
        setLoading(false)
      })
    }, users.length === 0 ? 0 : 600))
  }, [value]);

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange(selected.map((u) => u.user_id).join(","))
    }
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={
            cn(
              "border border-input py-1 pl-1 pr-3 flex items-center justify-between min-h-10 rounded-md",
              props.className,
            )
          }
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap -mb-1">
              {selected.map((u) => (
                <div key={u.user_id} className="flex items-center p-0.5 mr-1.5 mb-1 rounded-2xl	border">
                  <UserItem user={u} simple={true} className="space-x-1" avatarClassName="w-6 h-6"/>
                  <CloseIcon onClick={(e) => {
                    e.preventDefault()
                    setSelected(selected.filter((s) => s.email !== u.email))
                  }} className="w-4 h-4 ml-1 mr-[0.1rem] text-muted-foreground"/>
                </div>
              ))}
            </div>
          ) : (
            <div className="pl-2 text-sm font-medium text-muted-foreground">Find users by email...</div>
          )}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Find users by email..." value={value} onValueChange={setValue}/>
          <CommandList>
            {loading && <CommandLoading></CommandLoading>}
            <CommandEmpty>{loading ? 'Loading...' : 'No framework found.'}</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.user_id}
                  value={user.email}
                  onSelect={(currentValue) => {
                    if (selected.find((u) => u.email === currentValue)) {
                      setSelected(selected.filter((u) => u.email !== currentValue))
                    } else {
                      setSelected([...selected, user])
                    }
                    setOpen(false)
                  }}
                >
                  <UserItem user={user}/>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected.find((u) => u.email === user.email) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
