import ManageNav from "@/pages/manage/_nav.tsx";
import {Outlet} from "react-router-dom";

const ManageLayout = () => {
  return (
    <div className="relative z-10 flex w-screen h-screen overflow-hidden">
      <div className="h-full w-52 flex-shrink-0 border-r">
        <ManageNav/>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet/>
      </div>
    </div>
  );
}

export default ManageLayout;
