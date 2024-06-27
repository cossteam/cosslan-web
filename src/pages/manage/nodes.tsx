import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal, Search} from "lucide-react";
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
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {TableViewOptions} from "@/components/table-view-options.tsx";

let nodes: Node[] = [
  {
    "id": "INV004",
    "hostname": "Tokyo",
    "email": "noah.williams@email.com",
    "ip": "20.30.40.50",
    "public_ip": "120.90.70.25",
    "role": "Lighthouse",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
    "role": "Network",
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
  role: string;
  last_seen: string;
  private: boolean;
}

const addFormSchema = z.object({
  hostname: z.string().min(2).max(30),
  public_ip: z.string().ip({version: 'v4'}),
  ssh_username: z.string().min(2).max(30),
  ssh_password: z.string().min(2).max(30),
  ssh_port: z.number().int().min(1).max(65535),
  private: z.boolean(),
})

type AddFormValues = z.infer<typeof addFormSchema>


const ManageNodes = () => {
  const [data, setData] = React.useState(React.useMemo(() => nodes, []));
  const [rowSelection, setRowSelection] = React.useState({})

  const [addOpen, setAddOpen] = React.useState(false)

  const addForm = useForm<AddFormValues>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      ssh_username: 'root',
      ssh_port: 22,
      private: true,
    },
  })

  function onAddSubmit(data: AddFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

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
      accessorKey: "role",
      header: "Role",
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
              <DropdownMenuSeparator/>
              <DropdownMenuItem>View logs</DropdownMenuItem>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuSeparator/>
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

  return (
    <>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md max-h-full sm:max-h-[90%] flex flex-col" onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}>
          <DialogHeader>
            <DialogTitle>Add node</DialogTitle>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-6 p-2 -m-2 mb-2 overflow-auto no-scrollbar">
              <FormField
                control={addForm.control}
                name="hostname"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Hostname
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Host name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Only letters, numbers, and dashes.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="public_ip"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      Public IP
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Public IP" {...field} />
                    </FormControl>
                    <FormDescription>
                      Public IP address of the node.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <div className="flex-auto">
                  <FormField
                    control={addForm.control}
                    name="ssh_username"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          SSH Username
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="SSH Username" {...field} />
                        </FormControl>
                        <FormDescription>
                          SSH username and port for the node.
                        </FormDescription>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-none w-24">
                  <FormField
                    control={addForm.control}
                    name="ssh_port"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>
                          SSH Port
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Port" type="number" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={addForm.control}
                name="ssh_password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      SSH Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="SSH Password" type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      SSH password for the node.
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="private"
                render={({field}) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Private</FormLabel>
                      <FormDescription>
                        {field.value ? 'Make the node private.' : 'Make the node public so that others can use it.'}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter className="max-sm:space-y-2 max-sm:space-y-reverse">
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                addForm.handleSubmit(onAddSubmit)()
              }}
            >Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {nodes.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="space-y-5 p-10 max-w-prose">
            <h1 className="text-3xl">You don’t have any nodes set up</h1>
            <div className="text-lg text-slate-500">Nodes assist in establishing direct connections between hosts and keep track of potential routes to each host.</div>
            <ul className="space-y-1 list-disc list-outside text-slate-500 pl-4 pb-3">
              <li>Each overlay network needs at least one node.</li>
              <li>If you plan to access hosts over the Internet, at least one node will need a static, public IPv4 address with its firewall configured to allow inbound udp traffic on a port.</li>
              <li>A modestly-sized cloud instance should be sufficient for most users.</li>
            </ul>
            <Button onClick={() => setAddOpen(true)}>Add node</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-6 md:p-10">
          <header className="flex gap-2">
            <div className="flex-grow space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Nodes</h2>
              <p className="text-muted-foreground">
                Manage your device export nodes
              </p>
            </div>
            <div className="flex justify-end items-end">
              <Button onClick={() => setAddOpen(true)}>Add node</Button>
            </div>
          </header>

          <div className="mt-6 mb-6 flex justify-start gap-4">
            <div className="flex-1 relative">
              <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
              <Input
                className="pl-10"
                placeholder="Search by hostname, owner, ip, version..."
                onChange={e => {
                  const {value} = e.target;
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
  )
}

export default ManageNodes;
