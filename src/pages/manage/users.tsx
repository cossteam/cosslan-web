import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Separator} from "@/components/ui/separator.tsx";
import {ChevronDown, ChevronRight, ContactRound, Filter, Search, Stamp} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

const ManageUsers = () => {
  const [openInviteUsers, setOpenInviteUsers] = useState(false)
  const [openUserManagement, setOpenUserManagement] = useState(false)

  const users = [
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
  ]

  return (
    <div className="space-y-6 p-10 pb-16">
      <header className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage the users in your network and their permissions.
        </p>
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
          <Input className="pl-10" placeholder="Search users..."/>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4"/>
          Filter
          <ChevronDown className="ml-2 h-4 w-4"/>
        </Button>
      </div>

      <Separator className="my-6"/>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[200px]">Last Seen</TableHead>
              <TableHead className="w-[50px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.role}
                </TableCell>
                <TableCell>
                  {user.joined}
                </TableCell>
                <TableCell>
                  {user.last_seen}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(user.id)}
                      >
                        Copy payment ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View logs</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{users.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default ManageUsers;
