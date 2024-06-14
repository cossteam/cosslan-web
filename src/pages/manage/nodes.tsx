import {Button} from "@/components/ui/button.tsx";
import {ChevronDown, Filter, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

const ManageNodes = () => {
  const nodes = [
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
          <Input className="pl-10" placeholder="Search by hostname, owner, ip, version..."/>
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
              <TableHead>Hostname</TableHead>
              <TableHead>IP address</TableHead>
              <TableHead>Public ip</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Private</TableHead>
              <TableHead className="w-[200px]">Last Seen</TableHead>
              <TableHead className="w-[50px] text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.map((node) => (
              <TableRow key={node.id}>
                <TableCell>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {node.hostname}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {node.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {node.ip}
                </TableCell>
                <TableCell>
                  {node.public_ip}
                </TableCell>
                <TableCell>
                  <div>
                    {node.version}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {node.os}
                  </div>
                </TableCell>
                <TableCell>
                  {node.private ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  {node.last_seen}
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
                        onClick={() => navigator.clipboard.writeText(node.id)}
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
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell className="text-right">{nodes.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default ManageNodes;
