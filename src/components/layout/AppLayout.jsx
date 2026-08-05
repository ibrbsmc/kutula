import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="min-h-dvh md:flex">
      <Sidebar />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <MobileNav />

        <main className="flex-1 overflow-x-hidden bg-[#FCF5ED] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
