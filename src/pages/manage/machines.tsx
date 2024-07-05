import React, {useEffect, useMemo, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Copy, Check, MoreHorizontal, Search, Loader2} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {Checkbox} from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {DataTable} from "@/components/ui+/data-table.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label.tsx";
import {DeviceIcons} from "@/components/ui+/icons.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {TableViewOptions} from "@/components/table-view-options.tsx";
import {TableTitleSubtitle} from "@/components/table-title-subtitle.tsx";
import utils, {cn} from "@/lib/utils.ts";
import {networkMachineCreateDevice, networkMachineList} from "@/api/interfaces/network-machine.ts";
import {NetworkMachine} from "@/api/types/network-machine.ts";
import {networkState} from "@/lib/state.ts";

const devices: Device[] = [
  {
    platform: 'Linux',
  },
  {
    platform: 'Windows',
  },
  {
    platform: 'macOS',
  },
  {
    platform: 'iPhone',
    label: 'iPhone & iPad',
  },
  {
    platform: 'Android',
  },
  {
    platform: 'Synology',
  }
]

export type Device = {
  platform: string
  label?: string
  desc?: string
  tip?: string
  qr?: string
  url?: string
}

let machines: NetworkMachine.Info[] = [];

const ManageMachines = () => {
  const [data, setData] = useState<NetworkMachine.Info[]>(useMemo(() => machines, []));
  const [rowSelection, setRowSelection] = useState({})
  const [networkSelected, setNetworkSelected] = useState(networkState.getState());

  const [copyRight, setCopyRight] = React.useState(false)
  const [addOpen, setAddOpen] = React.useState(false)
  const [addData, setAddData] = React.useState<Device>(devices[0])
  const [addPlatform, setAddPlatform] = React.useState(devices[0].platform)

  const onRefresh = () => {
    networkMachineList({
      network_id: networkSelected.network_id,
      page: 1,
    }).then(({data}) => {
      setData(machines = data.list);
    })
  }

  useEffect(() => {
    networkState.subscribe(setNetworkSelected)
    onRefresh()
  }, []);

  useEffect(() => {
    const index = Math.max(0, devices.findIndex((device) => device.platform === addPlatform))
    setAddData(devices[index])
    if (addOpen) {
      networkMachineCreateDevice({
        platform: devices[index].platform,
      }).then(({data}) => {
        devices[index] = Object.assign({}, devices[index], data)
      }).catch(({msg}) => {
        devices[index] = Object.assign({}, devices[index], {
          tip: `<u class="text-red-700">${msg || 'An error occurred while creating the device. Please try again later.'}</u>`
        })
      }).finally(() => {
        setAddData(devices[index])
      })
    }
  }, [addPlatform, addOpen]);

  const columns: ColumnDef<NetworkMachine.Info>[] = [
    {
      id: "select",
      header: ({table}) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({row}) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Machine",
      cell: ({row}) => {
        const machine = row.original
        return (
          <TableTitleSubtitle title={machine.hostname} subtitle={machine.user_name || machine.user_email}/>
        )
      },
    },
    {
      accessorKey: "ip",
      header: "IP address",
      cell: ({row}) => {
        const machine = row.original
        return (
          <TableTitleSubtitle title={machine.client_ip} subtitle={machine.public_ip}/>
        )
      },
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({row}) => {
        const machine = row.original
        return (
          <TableTitleSubtitle title={machine.version} subtitle={machine.kernel}/>
        )
      },
    },
    {
      accessorKey: "last_seen",
      header: "Last Seen",
      cell: ({row}) => {
        const machine = row.original
        if (machine.state === 'connected') {
          return (
            <span className="text-sm text-gray-600 dark:text-gray-300" title={`Last Seen: ${machine.connected_at}`}>
              <span className="inline-block w-2 h-2 rounded-full bg-green-300 dark:bg-green-400 mr-2"></span>
              Connected
            </span>
          )
        }
        return (
          <span className="text-sm text-gray-600 dark:text-gray-300" title={machine.state}>
            <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 mr-2"></span>
            {machine.connected_at || machine.state}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const machine = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(`${machine.id}`)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>View logs</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setData(machines = machines.filter(item => item.id !== machine.id))
                }}
              >Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md max-h-full sm:max-h-[90%] flex flex-col" onOpenAutoFocus={utils.preventDefault}>
          <DialogHeader>
            <DialogTitle>Add device</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-2 -m-2 mb-2 overflow-auto no-scrollbar">
            <div>To add a new device to your network.</div>
            <RadioGroup value={addPlatform} onValueChange={setAddPlatform} defaultValue={addPlatform} className="flex flex-wrap">
              {devices.map((device) => (
                <Label
                  key={device.platform}
                  htmlFor={device.platform}
                  className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value={device.platform} id={device.platform} className="peer sr-only"/>
                  <DeviceIcons type={device.platform} className="mr-2 size-6"/> {device.label || device.platform}
                </Label>
              ))}
            </RadioGroup>
            {addData.desc || addData.tip ? (
              <div>
                {addData.desc && (
                  <p>{addData.desc}</p>
                )}
                <div className="mt-6">
                  {addData.qr && (
                    <div className="flex justify-start items-center mb-6">
                      <div className="shrink-0">
                        <img src={addData.qr} className="image-pixelated w-[140px] h-[140px]" alt="qrcode"/>
                      </div>
                    </div>
                  )}
                  {addData.url && (
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Input value={addData.url} readOnly/>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        variant="secondary"
                        className={
                          cn("px-3", copyRight ? 'bg-green-600 hover:bg-green-600' : '')
                        }
                        onClick={() => {
                          navigator.clipboard.writeText(addData.url || '').then(() => {
                            setCopyRight(true)
                            setTimeout(() => setCopyRight(false), 1200)
                          })
                        }}
                      >
                        <span className="sr-only">Copy</span>
                        {copyRight ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                      </Button>
                    </div>
                  )}
                </div>
                {addData.tip && (
                  <p className="text-sm text-text-muted dark:text-gray-400 mt-2" dangerouslySetInnerHTML={{__html: addData.tip}}></p>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Loader2 className="h-5 w-5 animate-spin"/>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {machines.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="space-y-5 p-10 max-w-prose">
            <h1 className="text-3xl">You don’t have any machines set up</h1>
            <div className="text-lg text-slate-500">Download the client and login to begin using it in your network.</div>
            <div className="text-lg text-slate-500">Be sure to also create and enroll a node, or your hosts won’t be able to find each other.</div>
            <Button onClick={() => setAddOpen(true)}>Add device</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-6 md:p-10">
          <header className="flex gap-2">
            <div className="flex-grow space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Machines</h2>
              <p className="text-muted-foreground">
                Manage the devices connected to your network.
              </p>
            </div>
            <div className="flex justify-end items-end">
              <Button onClick={() => setAddOpen(true)}>Add device</Button>
            </div>
          </header>

          <div className="mt-6 mb-6 flex justify-start gap-4">
            <div className="flex-1 relative">
              <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
              <Input
                className="pl-10"
                placeholder="Search by name, owner, ip, version..."
                onChange={e => {
                  const {value} = e.target;
                  setData(machines.filter(machine => {
                    return (
                      machine.hostname?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.kernel?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.client_ip?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.public_ip?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.user_name?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.user_email?.toLowerCase().includes(value.toLowerCase()) ||
                      machine.version?.toLowerCase().includes(value.toLowerCase())
                    );
                  }))
                }}
              />
            </div>
            <TableViewOptions table={table}/>
          </div>

          <Separator className="my-6"/>

          <DataTable table={table} columns={columns} data={data}/>

          <div className="flex items-center justify-end space-x-2 py-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageMachines;
