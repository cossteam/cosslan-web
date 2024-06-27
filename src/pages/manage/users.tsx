import {useEffect, useMemo, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ChevronRight, ContactRound, Loader2, MoreHorizontal, Search, Stamp} from "lucide-react";
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
import utils, {cn} from "@/lib/utils.ts";
import {Link} from "react-router-dom";
import {Dialog, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {DialogContent} from "@/components/ui/dialog.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {networkUserInvite, networkUserList} from "@/api/interfaces/network-user.ts";
import {NetworkUser} from "@/api/types/network-user.ts";
import {UserSelect} from "@/components/user-select.tsx";
import {localState} from "@/lib/state.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {alerter} from "@/components/ui+/use-alert.ts";
import {TableViewOptions} from "@/components/table-view-options.tsx";
import {TableTitleSubtitle} from "@/components/table-title-subtitle.tsx";

let users: NetworkUser.InfoJoinUser[] = [];

const inviteFormSchema = z.object({
  user_id: z.string().min(1, {
    message: "Please select the users you want to invite.",
  }),
  role: z.string().optional(),
})

type InviteFormValues = z.infer<typeof inviteFormSchema>

const ManageUsers = () => {
  const [networkSelectedId, setNetworkSelectedId] = useState(localState.getState().networkSelectedId)
  const [inviteUserInfo, setInviteUserInfo] = useState(false)
  const [userManageInfo, setUserManageInfo] = useState(false)

  const [data, setData] = useState<NetworkUser.InfoJoinUser[]>(useMemo(() => users, []));
  const [rowSelection, setRowSelection] = useState({})
  const [openInvite, setOpenInvite] = useState(false)
  const [loadInvite, setLoadInvite] = useState(false)

  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      role: 'member',
    },
  })

  const onRefreshNetworkUserList = () => {
    networkUserList({
      network_id: networkSelectedId,
    }).then(({data}) => {
      setData(users = data.list);
    })
  }

  const onInviteSubmit = (data: InviteFormValues) => {
    setLoadInvite(true)
    networkUserInvite({
      network_id: networkSelectedId,
      user_id: data.user_id,
      role: data.role || 'member',
    }).then(() => {
      setOpenInvite(false)
      onRefreshNetworkUserList()
      toast({
        title: "User invited",
        description: "The user has been invited to join the network.",
      })
    }).catch(({msg}) => {
      alerter({
        title: (
          <div className="text-red-600">Error</div>
        ),
        description: msg,
        cancelHide: true,
        okText: "OK",
      })
    }).finally(() => {
      setLoadInvite(false)
    })
  }

  useEffect(() => {
    localState.subscribe(({networkSelectedId}) => {
      setNetworkSelectedId(networkSelectedId)
    })
    onRefreshNetworkUserList()
  }, []);

  const columns: ColumnDef<NetworkUser.InfoJoinUser>[] = [
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
      accessorKey: "user_name",
      header: "User",
      cell: ({row}) => {
        const user = row.original
        return (
          <TableTitleSubtitle title={user.user_name} subtitle={user.user_email}/>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({getValue}) => {
        return utils.capitalizeFirstLetter(`${getValue()}`)
      },
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({getValue}) => {
        return utils.capitalizeFirstLetter(`${getValue()}`)
      },
    },
    {
      accessorKey: "created_at",
      header: "Joined",
    },
    {
      accessorKey: "updated_at",
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
                onClick={() => navigator.clipboard.writeText(`${user.user_id}`)}
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
    <div className="space-y-6 p-6 md:p-10">
      <header className="flex gap-2">
        <div className="flex-grow space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage the users in your network and their permissions.
          </p>
        </div>
        <div className="flex justify-end items-end"></div>
      </header>

      <Dialog open={openInvite} onOpenChange={setOpenInvite}>
        <DialogContent className="sm:max-w-md max-h-full sm:max-h-[90%] flex flex-col" onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}>
          <DialogHeader>
            <DialogTitle>Invite external user</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-2 -m-2 overflow-auto no-scrollbar">
            <div>
              Invite users to join this network and access its machines, as allowed by ACLs. If you only want to give a user access to one node, share the node instead.
            </div>
            <Form {...inviteForm}>
              <form onSubmit={inviteForm.handleSubmit(onInviteSubmit)} className="flex space-x-4">
                <FormField
                  control={inviteForm.control}
                  name="user_id"
                  render={({field}) => (
                    <FormItem className="flex-auto">
                      <FormControl>
                        <UserSelect className="w-full" ignoreNetworkId={networkSelectedId} onValueChange={field.onChange}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteForm.control}
                  name="role"
                  render={({field}) => (
                    <FormItem className="flex-none w-auto">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <SelectTrigger className="w-full appearance-none font-normal space-x-1">
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="px-5"
                disabled={loadInvite}
                onClick={() => {
                  inviteForm.handleSubmit(onInviteSubmit)()
                }}
              >
                {loadInvite && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                )}
                Invite
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg mt-8 mb-7 divide-y lg:divide-y-0 lg:divide-x lg:flex">
        <div className="flex-1">
          <Button onClick={() => setInviteUserInfo(!inviteUserInfo)} variant="ghost" className={cn(
            "h-auto w-full flex items-center justify-start gap-2 py-5 px-5 hover:bg-transparent hover:cursor-pointer md:hidden md:pointer-events-none",
            inviteUserInfo
              ? "pb-0"
              : ""
          )}>
            <ChevronRight className={cn(
              "text-text-disabled dark:text-gray-400 mt-px w-5 transition-transform",
              inviteUserInfo
                ? "rotate-90"
                : ""
            )}/>
            <span className="text-lg">Invite users</span>
          </Button>
          <div className={cn(
            "md:!block",
            inviteUserInfo
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
                    <Button className="h-9 px-3 text-sm py-[0.35rem] mt-3" onClick={() => setOpenInvite(true)}>Invite external users</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 lg:max-w-[50%]">
          <Button onClick={() => setUserManageInfo(!userManageInfo)} variant="ghost" className={cn(
            "h-auto w-full flex items-center justify-start gap-2 py-5 px-5 hover:bg-transparent hover:cursor-pointer md:hidden md:pointer-events-none",
            userManageInfo
              ? "pb-0"
              : ""
          )}>
            <ChevronRight className={cn(
              "text-text-disabled dark:text-gray-400 mt-px w-5 transition-transform",
              userManageInfo
                ? "rotate-90"
                : ""
            )}/>
            <span className="text-lg">User management</span>
          </Button>
          <div className={cn(
            "md:!block",
            userManageInfo
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
                    <p className="text-sm mt-0.5 text-text-muted dark:text-gray-400">Invited to join the network without human approval to join.</p>
                  </div>
                </div>
              </div>
              <Link to="/manage/settings">Edit in Settings →</Link>
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
                  `${user.user_id}`.includes(value.toLowerCase()) ||
                  `${user.role}`.includes(value.toLowerCase())
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
  );
}

export default ManageUsers;
