import ManageNav from "@/pages/manage/_nav.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {X as CloseIcon} from "lucide-react"
import {routeState} from "@/lib/state.ts";

const ManageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [navMask, setNavMask] = useState(false);

  const goBackToManage = () => {
    const {history} = routeState.getState()
    history.findIndex((path) => {
      if (/^\/manage\/(?!(settings|notifications))/.test(path) && path !== location.pathname) {
        navigate(path);
        return true;
      }
    }) === -1 && navigate("/manage")
  }

  useEffect(() => {
    setNavMask(/^\/manage\/(settings|notifications)/.test(location.pathname));
  }, [location]);

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
        <div
          className={
            cn(
              "absolute top-0 left-0 right-0 bottom-0 z-20 bg-black/80 items-start justify-end hidden",
              navMask ? "md:flex" : ""
            )}
        >
          <CloseIcon className="m-3 w-6 h-6 text-white cursor-pointer transition-transform hover:rotate-90" onClick={goBackToManage}/>
        </div>
      </div>
      <div className="flex-1 overflow-auto mt-14 md:mt-0">
        <Outlet/>
      </div>
    </div>
  );
}

export default ManageLayout;
