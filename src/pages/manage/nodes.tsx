import {Button} from "@/components/ui/button.tsx";

const ManageNodes = () => {
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

export default ManageNodes;
