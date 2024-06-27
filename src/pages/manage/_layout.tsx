import ManageNav from "@/pages/manage/_nav.tsx";
import {Outlet} from "react-router-dom";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";

const ManageLayout = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-col md:flex-row relative z-10 w-screen h-screen overflow-hidden">
      <div
        className={
          cn(
            "flex-shrink-0 border-r w-full absolute z-20 bg-[hsl(var(--background))] md:relative md:w-52 md:bg-none",
            openMenu ? "h-full" : "h-auto md:h-full"
          )}
      >
        <ManageNav openMenu={openMenu} onClickMenu={() => {
          window.innerWidth < 768 && setOpenMenu(!openMenu);
        }}/>
      </div>
      <div className="flex-1 overflow-auto mt-14 md:mt-0">
        <Outlet/>
      </div>
    </div>
  );
}

export default ManageLayout;
