import ManageNav from "@/pages/manage/_nav.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {userState} from "@/lib/state.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

const ManageLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.getState().email) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="relative z-10 flex w-screen h-screen overflow-hidden">
      <div className="h-full w-52 flex-shrink-0 border-r">
        <ManageNav/>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet/>
      </div>
      <Toaster />
    </div>
  );
}

export default ManageLayout;
