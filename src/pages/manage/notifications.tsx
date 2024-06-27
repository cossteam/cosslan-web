import React, {useEffect, useMemo, useState} from "react";
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
import {TableViewOptions} from "@/components/table-view-options.tsx";
import {UserNotification} from "@/api/types/user-notification.ts";
import {userNotificationList} from "@/api/interfaces/user-notification.ts";
import utils from "@/lib/utils.ts";
import {TableTitleSubtitle} from "@/components/table-title-subtitle.tsx";

let notifications: UserNotification.Info[] = [];

const ManageNotifications = () => {
  const [data, setData] = useState<UserNotification.Info[]>(useMemo(() => notifications, []));
  const [rowSelection, setRowSelection] = React.useState({})

  const onRefresh = () => {
    userNotificationList({
      page: 1,
    }).then(({data}) => {
      setData(notifications = data.list);
    })
  }

  useEffect(() => {
    onRefresh()
  }, []);

  const columns: ColumnDef<UserNotification.Info>[] = [
    {
      id: "select",
      header: ({table}) => (
        <div className="ml-1">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({row}) => (
        <div className="relative flex items-center ml-1">
          <div className="w-2 h-2 bg-blue-600 rounded absolute top-1/2 -left-4 -translate-y-1/2"></div>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row}) => {
        const item = row.original
        return (
          <TableTitleSubtitle title={item.title} subtitle={item.network_name || item.network_ip_range}/>
        )
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({getValue}) => {
        return utils.capitalizeFirstLetter(`${getValue()}`)
      },
    },
    {
      accessorKey: "send_name",
      header: "Sender",
      cell: ({row}) => {
        const user = row.original
        return (
          <TableTitleSubtitle title={user.send_name} subtitle={user.send_email}/>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: "Time",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({row}) => {
        const item = row.original
        console.log(item);
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
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Read</DropdownMenuItem>
              <DropdownMenuItem>Unread</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>Agreed</DropdownMenuItem>
              <DropdownMenuItem>Refused</DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {

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
    <div className="space-y-6 p-6 md:p-10">
      <header className="flex gap-2">
        <div className="flex-grow space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            View and process your notifications.
          </p>
        </div>
        <div className="flex justify-end items-end"></div>
      </header>

      <div className="mt-6 mb-6 flex justify-start gap-4">
        <div className="flex-1 relative">
          <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
          <Input
            className="pl-10"
            placeholder="Search by title, type, sender..."
            onChange={e => {
              const {value} = e.target;
              setData(notifications.filter(notification => {
                return (
                  notification.title?.toLowerCase().includes(value.toLowerCase()) ||
                  notification.network_ip_range?.toLowerCase().includes(value.toLowerCase()) ||
                  notification.network_name?.toLowerCase().includes(value.toLowerCase()) ||
                  notification.type?.toLowerCase().includes(value.toLowerCase()) ||
                  notification.send_name?.toLowerCase().includes(value.toLowerCase()) ||
                  notification.send_email?.toLowerCase().includes(value.toLowerCase())
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
  )
}

export default ManageNotifications;
