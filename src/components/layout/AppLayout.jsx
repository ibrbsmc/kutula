import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <MobileNav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
