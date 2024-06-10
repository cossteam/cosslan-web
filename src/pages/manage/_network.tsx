import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const groups = [
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

type Network = (typeof groups)[number]["networks"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface NavNetworkProps extends PopoverTriggerProps {}

export default function NavNetwork({ className }: NavNetworkProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewNetworkDialog, setShowNewNetworkDialog] = React.useState(false)
  const [selectedNetwork, setSelectedNetwork] = React.useState<Network>(
    groups[0].networks[0]
  )

  return (
    <Dialog open={showNewNetworkDialog} onOpenChange={setShowNewNetworkDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a network"
            className={cn("w-[200px] justify-between", className)}
          >
            <div className="mr-2 max-w-full truncate opacity-80">
              Network: {selectedNetwork.label}
            </div>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search network..." />
              <CommandEmpty>No network found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.networks.map((network) => (
                    <CommandItem
                      key={network.value}
                      onSelect={() => {
                        setSelectedNetwork(network)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      <div className="truncate">
                        {network.label}
                      </div>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0",
                          selectedNetwork.value === network.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewNetworkDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
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
            <div className="space-y-2">
              <Label htmlFor="name">Network name</Label>
              <Input id="name" placeholder="Home Work" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewNetworkDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
