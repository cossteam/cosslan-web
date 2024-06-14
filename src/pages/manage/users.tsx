import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, ChevronRight, Columns2, ContactRound, MoreHorizontal, Search, Stamp} from "lucide-react";
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
import {cn} from "@/lib/utils.ts";
import {Link} from "react-router-dom";

let users: User[] = [
  {
    "id": "INV002",
    "name": "Liam Johnson",
    "email": "liam.johnson@email.com",
    "role": "Owner",
    "joined": "Mar 21, 2023",
    "last_seen": "Jun 14, 9:23 AM GMT+8"
  },
  {
    "id": "INV003",
    "name": "Sophia Smith",
    "email": "sophia.smith@email.com",
    "role": "Admin",
    "joined": "Apr 5, 2023",
    "last_seen": "Jun 12, 3:45 PM GMT+8"
  },
  {
    "id": "INV004",
    "name": "Noah Williams",
    "email": "noah.williams@email.com",
    "role": "Admin",
    "joined": "Mar 9, 2023",
    "last_seen": "Jun 15, 11:10 AM GMT+8"
  },
  {
    "id": "INV005",
    "name": "Emma Brown",
    "email": "emma.brown@email.com",
    "role": "Member",
    "joined": "Feb 28, 2023",
    "last_seen": "Jun 14, 6:37 PM GMT+8"
  },
  {
    "id": "INV006",
    "name": "William Jones",
    "email": "william.jones@email.com",
    "role": "Member",
    "joined": "Mar 4, 2023",
    "last_seen": "Jun 13, 10:45 AM GMT+8"
  },
  {
    "id": "INV007",
    "name": "Isabella Davis",
    "email": "isabella.davis@email.com",
    "role": "Member",
    "joined": "Apr 15, 2023",
    "last_seen": "Jun 15, 2:18 PM GMT+8"
  },
  {
    "id": "INV008",
    "name": "James Wilson",
    "email": "james.wilson@email.com",
    "role": "Member",
    "joined": "Mar 27, 2023",
    "last_seen": "Jun 14, 4:59 PM GMT+8"
  },
  {
    "id": "INV009",
    "name": "Ava Taylor",
    "email": "ava.taylor@email.com",
    "role": "Member",
    "joined": "Feb 19, 2023",
    "last_seen": "Jun 13, 8:26 AM GMT+8"
  },
  {
    "id": "INV010",
    "name": "Alexander Martinez",
    "email": "alexander.martinez@email.com",
    "role": "Member",
    "joined": "Mar 7, 2023",
    "last_seen": "Jun 15, 1:30 PM GMT+8"
  }
];

export type User = {
  id: string
  name: string
  email: string
  role: string
  joined: string
  last_seen: string
}


const ManageUsers = () => {
  const [openInviteUsers, setOpenInviteUsers] = useState(false)
  const [openUserManagement, setOpenUserManagement] = useState(false)

  const [data, setData] = React.useState(React.useMemo(() => users, []));
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<User>[] = [
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
      header: "User",
      cell: ({row}) => {
        const user = row.original
        return (
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {user.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "joined",
      header: "Joined",
    },
    {
      accessorKey: "last_seen",
      header: "Last Seen",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const user = row.original
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
                onClick={() => navigator.clipboard.writeText(user.id)}
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
                  setData(users = users.filter(item => item.id !== user.id))
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
    <div className="space-y-6 p-10 pb-16">
      <header className="flex space-y-0.5 gap-2">
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage the users in your network and their permissions.
          </p>
        </div>
      </header>

      <div className="border rounded-lg mt-8 mb-7 divide-y lg:divide-y-0 lg:divide-x lg:flex">
        <div className="flex-1">
          <Button onClick={() => setOpenInviteUsers(!openInviteUsers)} variant="ghost" className={cn(
            "h-auto w-full flex items-center justify-start gap-2 py-5 px-5 hover:bg-transparent hover:cursor-pointer md:hidden md:pointer-events-none",
            openInviteUsers
              ? "pb-0"
              : ""
          )}>
            <ChevronRight className={cn(
              "text-text-disabled dark:text-gray-400 mt-px w-5 transition-transform",
              openInviteUsers
                ? "rotate-90"
                : ""
            )}/>
            <span className="text-lg">Invite users</span>
          </Button>
          <div className={cn(
            "md:!block",
            openInviteUsers
              ? ""
              : "hidden"
          )}
          >
            <div className="flex flex-col p-5 gap-5 md:flex-row">
              <div className="flex-1 flex flex-col">
                <div className="flex gap-2 items-start md:flex-col">
                  <div className="top-px relative">
                    <ContactRound className="text-gray-600 dark:text-gray-300 w-5 h-auto"/>
                  </div>
                  <div>
                    <h3 className="font-medium">Invite users</h3>
                    <p className="text-sm mt-0.5 text-text-muted dark:text-gray-400">You can invite users by generating an invite link to share with them.</p>
                    <Button className="h-9 px-3 text-sm py-[0.35rem] mt-3">Invite external users</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 lg:max-w-[50%]">
          <Button onClick={() => setOpenUserManagement(!openUserManagement)} variant="ghost" className={cn(
            "h-auto w-full flex items-center justify-start gap-2 py-5 px-5 hover:bg-transparent hover:cursor-pointer md:hidden md:pointer-events-none",
            openUserManagement
              ? "pb-0"
              : ""
          )}>
            <ChevronRight className={cn(
              "text-text-disabled dark:text-gray-400 mt-px w-5 transition-transform",
              openUserManagement
                ? "rotate-90"
                : ""
            )}/>
            <span className="text-lg">User management</span>
          </Button>
          <div className={cn(
            "md:!block",
            openUserManagement
              ? ""
              : "hidden"
          )}
          >
            <div className="flex flex-col p-5 gap-5">
              <div className="flex-1 flex flex-col">
                <div className="flex gap-2 items-start md:flex-col">
                  <div className="top-px relative">
                    <Stamp className="text-text-disabled w-5 dark:text-gray-400"/>
                  </div>
                  <div>
                    <h3 className="font-medium">Approval is not required</h3>
                    <p className="text-sm mt-0.5 text-text-muted dark:text-gray-400">Invited users can join without manual approval from admins.</p>
                  </div>
                </div>
              </div>
              <Link to="#" className="link">Edit in Settings →</Link>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6 mb-6 flex justify-start gap-4">
        <div className="flex-1 relative">
          <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
          <Input
            className="pl-10"
            placeholder="Search by name, email, role..."
            onChange={e => {
              const {value} = e.target;
              setData(users.filter(user => {
                return (
                  user.name.toLowerCase().includes(value.toLowerCase()) ||
                  user.email.toLowerCase().includes(value.toLowerCase()) ||
                  user.role.toLowerCase().includes(value.toLowerCase())
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
  );
}

export default ManageUsers;
