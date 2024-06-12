import {Button} from "@/components/ui/button.tsx";

const ManageMachines = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="space-y-5 p-10 max-w-prose">
        <h1 className="text-3xl">You don’t have any machines set up</h1>
        <div className="text-lg text-slate-500">Download the client and login to begin using it in your network.</div>
        <div className="text-lg text-slate-500">Be sure to also create and enroll a node, or your hosts won’t be able to find each other.</div>
        <Button>Download client</Button>
      </div>
    </div>
  );
}

export default ManageMachines;
