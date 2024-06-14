import {
  Server,
  MonitorSmartphone,
  ArrowDownUp, Users,
} from "lucide-react"
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Machine} from "@/pages/manage/machines.tsx";

const barData = [
  {"name": "1st", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "2nd", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "3rd", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "4th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "5th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "6th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "7th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "8th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "9th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "10th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "11th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "12th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "13th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "14th", "total": Math.floor(Math.random() * 50000000000) + 10000000000},
  {"name": "15th", "total": Math.floor(Math.random() * 50000000000) + 10000000000}
]

const machines: Machine[] = [
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
];

const ManageOverview = () => {
  const abbreviatedName = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2);
  }

  const trafficConversion = (value: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }

    return `${value.toFixed(2)}${units[unitIndex]}`;
  }


  return (
    <div className="space-y-6 p-10 pb-16">
      <header className="flex space-y-0.5 gap-2">
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            View traffic statistics and recent machines.
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly traffic
            </CardTitle>
            <ArrowDownUp className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.56189 TB</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Machines
            </CardTitle>
            <MonitorSmartphone className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              210<span className="text-sm pl-0.5">/ 231</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Online accounts for 90%
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nodes
            </CardTitle>
            <Server className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              48<span className="text-sm pl-0.5">/ 50</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Online accounts for 96%
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              8<span className="text-sm pl-0.5">/ 10</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Online accounts for 80%
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hidden lg:block">
          <CardHeader>
            <CardTitle>Traffic statistics</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={trafficConversion}
                />
                <Bar
                  dataKey="total"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>Machines</CardTitle>
            <CardDescription>
              Recent connected machines.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            {machines.map((machine) => (
              <div key={machine.id} className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                  <AvatarFallback>{abbreviatedName(machine.name)}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{machine.name}</p>
                  <p className="text-sm text-muted-foreground">{machine.email}</p>
                </div>
                <div className="ml-auto text-sm font-medium">{machine.last_seen}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ManageOverview;

