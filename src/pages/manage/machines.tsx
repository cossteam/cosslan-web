import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, Filter, Search} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

const ManageMachines = () => {
  const machines = [
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

  if (machines.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="space-y-5 p-10 max-w-prose">
          <h1 className="text-3xl">You don’t have any machines set up</h1>
          <div className="text-lg text-slate-500">Download the client and login to begin using it in your network.</div>
          <div className="text-lg text-slate-500">Be sure to also create and enroll a node, or your hosts won’t be able to find each other.</div>
          <Button>Add device</Button>
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
              <h2 className="text-2xl font-bold tracking-tight">Machines</h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage the devices connected to your network.
          </p>
        </div>
        <div className="flex justify-end items-end">
          <Button>Add device</Button>
        </div>
      </header>

      <div className="mt-6 mb-6 flex justify-start gap-4">
        <div className="flex-1 relative">
          <Search className="absolute text-gray-400 h-full ml-3 w-5"/>
          <Input className="pl-10" placeholder="Search by name, owner, ip, version..."/>
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
              <TableHead>Machine</TableHead>
              <TableHead>IP address</TableHead>
              <TableHead>Version</TableHead>
              <TableHead className="w-[200px]">Last Seen</TableHead>
              <TableHead className="w-[50px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {machines.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {machine.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {machine.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {machine.ip}
                </TableCell>
                <TableCell>
                  <div>
                    {machine.version}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {machine.os}
                  </div>
                </TableCell>
                <TableCell>
                  {machine.last_seen}
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
                        onClick={() => navigator.clipboard.writeText(machine.id)}
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
              <TableCell className="text-right">{machines.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default ManageMachines;
