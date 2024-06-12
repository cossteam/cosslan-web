import ManageNav from "@/pages/manage/_nav.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userState} from "@/lib/state.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const ManageLayout = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    userState.subscribe(
      state => state.user_id,
      user_id => {
        if (user_id === 0) {  // 身份失效
          navigate("/login");
        }
      },
      {
        fireImmediately: true,
      }
    )
  })

  return (
    <>
      <div className="relative z-10 flex w-screen h-screen overflow-hidden">
        <div className="h-full w-52 flex-shrink-0 border-r">
          <ManageNav/>
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet/>
        </div>
      </div>

      <Toaster/>

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/logout")}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ManageLayout;
