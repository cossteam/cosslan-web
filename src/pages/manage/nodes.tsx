import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, Columns2, MoreHorizontal, Search} from "lucide-react";
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

let nodes: Node[] = [
  {
    "id": "INV004",
    "hostname": "Tokyo",
    "email": "noah.williams@email.com",
    "ip": "20.30.40.50",
    "public_ip": "120.90.70.25",
    "version": "1.80.6",
    "os": "Ubuntu 20.04",
    "last_seen": "Jun 15, 11:10 AM GMT+8",
    "private": false
  },
  {
    "id": "INV005",
    "hostname": "London",
    "email": "emma.brown@email.com",
    "ip": "60.70.80.90",
    "public_ip": "90.80.150.40",
    "version": "2.1.5",
    "os": "CentOS 7",
    "last_seen": "Jun 14, 6:37 PM GMT+8",
    "private": true
  },
  {
    "id": "INV006",
    "hostname": "New York",
    "email": "william.jones@email.com",
    "ip": "40.50.60.70",
    "public_ip": "200.180.50.70",
    "version": "1.90.3",
    "os": "Debian 10",
    "last_seen": "Jun 13, 10:45 AM GMT+8",
    "private": false
  },
  {
    "id": "INV007",
    "hostname": "Sydney",
    "email": "isabella.davis@email.com",
    "ip": "80.90.100.110",
    "public_ip": "80.120.200.10",
    "version": "2.0.4",
    "os": "Ubuntu 18.04",
    "last_seen": "Jun 15, 2:18 PM GMT+8",
    "private": true
  },
  {
    "id": "INV008",
    "hostname": "Paris",
    "email": "james.wilson@email.com",
    "ip": "120.130.140.150",
    "public_ip": "160.70.110.30",
    "version": "1.75.2",
    "os": "Debian 9",
    "last_seen": "Jun 14, 4:59 PM GMT+8",
    "private": false
  },
  {
    "id": "INV009",
    "hostname": "Berlin",
    "email": "ava.taylor@email.com",
    "ip": "150.160.170.180",
    "public_ip": "70.160.90.20",
    "version": "2.5.0",
    "os": "CentOS 8",
    "last_seen": "Jun 13, 8:26 AM GMT+8",
    "private": true
  },
  {
    "id": "INV010",
    "hostname": "Los Angeles",
    "email": "alexander.martinez@email.com",
    "ip": "100.110.120.130",
    "public_ip": "110.140.180.60",
    "version": "1.60.8",
    "os": "Ubuntu 16.04",
    "last_seen": "Jun 15, 1:30 PM GMT+8",
    "private": false
  },
  {
    "id": "INV011",
    "hostname": "Singapore",
    "email": "olivia.white@email.com",
    "ip": "130.140.150.160",
    "public_ip": "140.100.70.90",
    "version": "2.3.7",
    "os": "CentOS 6",
    "last_seen": "Jun 16, 10:05 AM GMT+8",
    "private": true
  },
  {
    "id": "INV012",
    "hostname": "Toronto",
    "email": "ethan.lee@email.com",
    "ip": "170.180.190.200",
    "public_ip": "100.200.80.120",
    "version": "1.70.5",
    "os": "Ubuntu 14.04",
    "last_seen": "Jun 17, 3:45 PM GMT+8",
    "private": false
  },
  {
    "id": "INV013",
    "hostname": "Dubai",
    "email": "michael.nguyen@email.com",
    "ip": "210.220.230.240",
    "public_ip": "50.60.70.80",
    "version": "2.7.3",
    "os": "Debian 8",
    "last_seen": "Jun 18, 8:30 AM GMT+8",
    "private": true
  }
];

type Node = {
  id: string;
  hostname: string;
  email: string;
  ip: string;
  public_ip: string;
  version: string;
  os: string;
  last_seen: string;
  private: boolean;
}


const ManageNodes = () => {
  const [data, setData] = React.useState(React.useMemo(() => nodes, []));
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Node>[] = [
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
      accessorKey: "hostname",
      header: "Hostname",
      cell: ({row}) => {
        const node = row.original
        return (
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {node.hostname}
            </p>
            <p className="text-sm text-muted-foreground">
              {node.email}
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
      accessorKey: "public_ip",
      header: "Public ip",
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({row}) => {
        const node = row.original
        return (
          <div className="grid gap-1">
            <div>
              {node.version}
            </div>
            <div className="text-sm text-muted-foreground">
              {node.os}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "private",
      header: "Private",
      cell: ({row}) => {
        const node = row.original
        return (
          <div>
            {node.private ? 'Yes' : 'No'}
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
        const node = row.original
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
                onClick={() => navigator.clipboard.writeText(node.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View logs</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setData(nodes = nodes.filter(item => item.id !== node.id))
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

  if (nodes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="space-y-5 p-10 max-w-prose">
          <h1 className="text-3xl">You don’t have any nodes set up</h1>
          <div className="text-lg text-slate-500">Nodes assist in establishing direct connections between hosts and keep track of potential routes to each host.</div>
          <ul className="space-y-1 list-disc list-outside text-slate-500 pl-4 pb-3">
            <li>Each overlay network needs at least one node.</li>
            <li>If you plan to access hosts over the Internet, at least one node will need a static, public IPv4 address with its firewall configured to allow inbound udp traffic on a port.</li>
            <li>A modestly-sized cloud instance should be sufficient for most users.</li>
          </ul>
          <Button>Add Node</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10 pb-16">
      <header className="flex space-y-0.5 gap-2">
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold tracking-tight">Nodes</h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage your device export nodes
          </p>
        </div>
        <div className="flex justify-end items-end">
          <Button>Add nodes</Button>
        </div>
      </header>

      <div className="mt-6 mb-6 flex justify-start gap-4">
        <div className="flex-1 relative">
          <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
          <Input
            className="pl-10"
            placeholder="Search by hostname, owner, ip, version..."
            onChange={e => {
              const { value } = e.target;
              setData(nodes.filter(node => {
                return (
                  node.hostname.toLowerCase().includes(value.toLowerCase()) ||
                  node.email.toLowerCase().includes(value.toLowerCase()) ||
                  node.ip.toLowerCase().includes(value.toLowerCase()) ||
                  node.public_ip.toLowerCase().includes(value.toLowerCase()) ||
                  node.version.toLowerCase().includes(value.toLowerCase())
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
              <ChevronDown className="ml-2 h-4 w-4" />
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

      <DataTable table={table} columns={columns} data={data} />

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
  );
}

export default ManageNodes;
