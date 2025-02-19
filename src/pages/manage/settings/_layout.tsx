import {Separator} from "@/components/ui/separator"
import SettingsNav from "@/pages/manage/settings/_nav"
import {Outlet} from "react-router-dom";

const ManageSettingsLayout = () => {
  return (
    <div className="space-y-6 p-6 md:p-10">
      <header className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings preferences.
        </p>
      </header>

      <Separator className="my-6"/>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5 max-lg:overflow-x-auto max-lg:no-scrollbar">
          <SettingsNav/>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
export default ManageSettingsLayout;
