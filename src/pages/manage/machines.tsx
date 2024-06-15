import React, {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, Columns2, Copy, MoreHorizontal, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {Checkbox} from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {DataTable} from "@/components/ui+/data-table.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label.tsx";
import {Icons} from "@/components/ui+/icons.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

let machines: Machine[] = [
  {
    "id": "INV003",
    "name": "Sophia Smith",
    "email": "sophia.smith@email.com",
    "ip": "150.200.30.80",
    "version": "2.10.1",
    "os": "iOS 15.2.3",
    "last_seen": "Jun 12, 3:45 PM GMT+8"
  },
  {
    "id": "INV004",
    "name": "Noah Williams",
    "email": "noah.williams@email.com",
    "ip": "120.90.70.25",
    "version": "1.80.6",
    "os": "Windows 11.0",
    "last_seen": "Jun 15, 11:10 AM GMT+8"
  },
  {
    "id": "INV005",
    "name": "Emma Brown",
    "email": "emma.brown@email.com",
    "ip": "90.80.150.40",
    "version": "2.1.5",
    "os": "Android 12.1",
    "last_seen": "Jun 14, 6:37 PM GMT+8"
  },
  {
    "id": "INV006",
    "name": "William Jones",
    "email": "william.jones@email.com",
    "ip": "200.180.50.70",
    "version": "1.90.3",
    "os": "Windows 10.0",
    "last_seen": "Jun 13, 10:45 AM GMT+8"
  },
  {
    "id": "INV007",
    "name": "Isabella Davis",
    "email": "isabella.davis@email.com",
    "ip": "80.120.200.10",
    "version": "2.0.4",
    "os": "iOS 14.7.2",
    "last_seen": "Jun 15, 2:18 PM GMT+8"
  },
  {
    "id": "INV008",
    "name": "James Wilson",
    "email": "james.wilson@email.com",
    "ip": "160.70.110.30",
    "version": "1.75.2",
    "os": "macOS 11.3.1",
    "last_seen": "Jun 14, 4:59 PM GMT+8"
  },
  {
    "id": "INV009",
    "name": "Ava Taylor",
    "email": "ava.taylor@email.com",
    "ip": "70.160.90.20",
    "version": "2.5.0",
    "os": "Android 11.0",
    "last_seen": "Jun 13, 8:26 AM GMT+8"
  },
  {
    "id": "INV010",
    "name": "Alexander Martinez",
    "email": "alexander.martinez@email.com",
    "ip": "110.140.180.60",
    "version": "1.60.8",
    "os": "Windows 8.1",
    "last_seen": "Jun 15, 1:30 PM GMT+8"
  },
  {
    "id": "INV011",
    "name": "Olivia White",
    "email": "olivia.white@email.com",
    "ip": "140.100.70.90",
    "version": "2.3.7",
    "os": "iOS 13.6.1",
    "last_seen": "Jun 16, 10:05 AM GMT+8"
  },
  {
    "id": "INV012",
    "name": "Ethan Lee",
    "email": "ethan.lee@email.com",
    "ip": "100.200.80.120",
    "version": "1.70.5",
    "os": "macOS 11.1.2",
    "last_seen": "Jun 17, 3:45 PM GMT+8"
  }
];

export type Machine = {
  id: string
  name: string
  email: string
  ip: string
  version: string
  os: string
  last_seen: string
}


const ManageMachines = () => {
  const [data, setData] = React.useState(React.useMemo(() => machines, []));
  const [rowSelection, setRowSelection] = React.useState({})

  const [addOpen, setAddOpen] = React.useState(false)
  const [addData, setAddData] = React.useState({desc: '', tip: '', qr: '', url: ''})
  const [addOs, setAddOs] = React.useState('macOS')

  useEffect(() => {
    switch (addOs) {
      case 'Linux':
        setAddData({
          desc: 'Use our installation script on the system terminal.',
          tip: 'Requires Linux kernel 4.4 or later.',
          qr: '',
          url: 'curl -fsSL https://domain.com/install.sh | sh',
        })
        break;
      case 'Windows':
        setAddData({
          desc: 'Download client from our website.',
          tip: 'Requires Windows 10 or later.',
          qr: '',
          url: 'https://domain.com/download/windows',
        })
        break;
      case 'macOS':
        setAddData({
          desc: 'Download client from the Mac App Store.',
          tip: 'Requires macOS Catalina 10.15 or later.',
          qr: '',
          url: 'https://apps.apple.com/ca/app/id2212312313?mt=12'
        })
        break;
      case 'iPhone':
        setAddData({
          desc: 'Scan the QR code, copy the download link.',
          tip: 'Requires iOS 15.0 or later.',
          qr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAABlBMVEX///8AAABVwtN+AAABm0lEQVR42u3aPXKDQAyGYTEpUuYIHCVHg6P5KD5CSheMv6wlkcXEbYiYeb8GZsXTMZr9M0IIIX+XUT1fNt23Q/syBFKZzPn2FmPvutqklotp2ZYhkOJk0CN9bOx/ei9DIP9Gpnv/bT+lBQI5J8khyYkZBHIisp0+DLq116mRXRkCqU52Kz6fJy/2sc6TfwKBVCYvM72uQyDHkSEmxfsttcujD19zb8J7MgRSmeQqT4u/R92iJ0vXHPIyBFKaRM+Wx7mTWOU1It1slBkEUpvY4D3bP8uNijl+/kbUhpxogUCKk6j3FV8m23gGAjmeSC/v7mRPzi01CKQuGdcGnM3Y41tqej6wa4FA6hJf5WXdft/tsfYOgZyAjJpjFy4mxY3Ew9rQmlueRkMgdclzJm1WfDmdHiCQg8n+oHiQdufIsw85h0Aqk+3lndy7mN/k8c/WeTIEUpzEWBC19HlyBAI5Helt3OOXKNY2DoGch/STkTiNzkVgliGQ40ifXewWfl7WPR6LGQRSmfQ4WW+pBbH1wO5RhkDqEkIIITXyDQFcqKG6y190AAAAAElFTkSuQmCC',
          url: 'https://apps.apple.com/ca/app/id2212312313?mt=12'
        })
        break;
      case 'Android':
        setAddData({
          desc: 'Scan the QR code, copy the download link.',
          tip: 'Requires Android 8.0 or later.',
          qr: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAABlBMVEX///8AAABVwtN+AAABm0lEQVR42u3aPXKDQAyGYTEpUuYIHCVHg6P5KD5CSheMv6wlkcXEbYiYeb8GZsXTMZr9M0IIIX+XUT1fNt23Q/syBFKZzPn2FmPvutqklotp2ZYhkOJk0CN9bOx/ei9DIP9Gpnv/bT+lBQI5J8khyYkZBHIisp0+DLq116mRXRkCqU52Kz6fJy/2sc6TfwKBVCYvM72uQyDHkSEmxfsttcujD19zb8J7MgRSmeQqT4u/R92iJ0vXHPIyBFKaRM+Wx7mTWOU1It1slBkEUpvY4D3bP8uNijl+/kbUhpxogUCKk6j3FV8m23gGAjmeSC/v7mRPzi01CKQuGdcGnM3Y41tqej6wa4FA6hJf5WXdft/tsfYOgZyAjJpjFy4mxY3Ew9rQmlueRkMgdclzJm1WfDmdHiCQg8n+oHiQdufIsw85h0Aqk+3lndy7mN/k8c/WeTIEUpzEWBC19HlyBAI5Helt3OOXKNY2DoGch/STkTiNzkVgliGQ40ifXewWfl7WPR6LGQRSmfQ4WW+pBbH1wO5RhkDqEkIIITXyDQFcqKG6y190AAAAAElFTkSuQmCC',
          url: 'https://play.google.com/store/apps/details?id=com.domain.ipn'
        })
        break;
      case 'Synology':
        setAddData({
          desc: 'Use our installation script on the system terminal.',
          tip: 'Requires DSM 6.0 or later.',
          qr: '',
          url: 'curl -fsSL https://domain.com/install.sh | sh',
        })
        break;
    }

  }, [addOs]);

  const columns: ColumnDef<Machine>[] = [
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
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {machine.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {machine.email}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "ip",
      header: "IP address",
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({row}) => {
        const machine = row.original
        return (
          <div className="grid gap-1">
            <div>
              {machine.version}
            </div>
            <div className="text-sm text-muted-foreground">
              {machine.os}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "last_seen",
      header: "Last Seen",
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
                onClick={() => navigator.clipboard.writeText(machine.id)}
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
        <DialogContent className="sm:max-w-md max-h-full sm:max-h-[90%] flex flex-col" onOpenAutoFocus={(event) => {event.preventDefault()}}>
          <DialogHeader>
            <DialogTitle>Add device</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-2 -m-2 mb-2 overflow-auto no-scrollbar">
            <div>To add a new device to your network.</div>
            <RadioGroup value={addOs} onValueChange={setAddOs} defaultValue="macOS" className="flex flex-wrap">
              <Label
                htmlFor="linux"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="linux" id="linux" className="peer sr-only"/>
                <Icons.Linux className="mr-2 size-6"/> Linux
              </Label>
              <Label
                htmlFor="Windows"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="Windows" id="Windows" className="peer sr-only"/>
                <Icons.Windows className="mr-2 size-6"/> Windows
              </Label>
              <Label
                htmlFor="macOS"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="macOS" id="macOS" className="peer sr-only"/>
                <Icons.macOS className="mr-2 size-6"/> macOS
              </Label>
              <Label
                htmlFor="iPhone"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="iPhone" id="iPhone" className="peer sr-only"/>
                <Icons.iPhone className="mr-2 size-6"/> iPhone &amp; iPad
              </Label>
              <Label
                htmlFor="Android"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="Android" id="Android" className="peer sr-only"/>
                <Icons.Android className="mr-2 size-6"/> Android
              </Label>
              <Label
                htmlFor="Synology"
                className="flex items-center rounded-md border dark:border-gray-700 px-3 py-0 h-9 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem value="Synology" id="Synology" className="peer sr-only"/>
                <Icons.Synology className="mr-2 size-6"/> Synology
              </Label>
            </RadioGroup>
            <div>
              <p>{addData.desc}</p>
              <div className="mt-6">
                {addData.qr && (
                  <div className="flex justify-start items-center mb-6">
                    <div className="shrink-0">
                      <img src={addData.qr} className="image-pixelated w-[140px] h-[140px]" alt="qrcode"/>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input value={addData.url} readOnly/>
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    variant="secondary"
                    className="px-3"
                    onClick={() => {
                      navigator.clipboard.writeText(addData.url).then(() => {
                        console.log('Copied to clipboard')
                      })
                    }}
                  >
                    <span className="sr-only">Copy</span>
                    <Copy className="h-4 w-4"/>
                  </Button>
                </div>
              </div>
              {addData.tip && (
                <p className="text-sm text-text-muted dark:text-gray-400 mt-2">{addData.tip}</p>
              )}
            </div>
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
          <header className="flex space-y-0.5 gap-2">
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold tracking-tight">Machines</h2>
                </div>
              </div>
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
                      machine.name.toLowerCase().includes(value.toLowerCase()) ||
                      machine.email.toLowerCase().includes(value.toLowerCase()) ||
                      machine.ip.toLowerCase().includes(value.toLowerCase()) ||
                      machine.version.toLowerCase().includes(value.toLowerCase())
                    );
                  }))
                }}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Columns2 className="mr-2 h-4 w-4"></Columns2>
                  Columns
                  <ChevronDown className="ml-2 h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(value)
                        }
                      >
                        {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
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
