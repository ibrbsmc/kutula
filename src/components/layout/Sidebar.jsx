import { House, DoorOpen, Package, PackageOpen } from "lucide-react";
import { NavLink } from "react-router";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 ${
      isActive
        ? "bg-[#E08149] text-white"
        : "text-black hover:bg-[#E08149]/10 [&>svg]:text-[#E08149]"
    }`;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-r-[#F6F4EE] p-4 md:block">
      <div className="mb-6 flex items-center gap-3">
        <img src="/favicon.png" alt="Kutula Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-[#BF5223]">Kutula</h1>
      </div>

      <nav className="space-y-2 ">
        <NavLink to="/" end className={linkClass}>
          <House size={20} />
          Ana Sayfa
        </NavLink>

        <NavLink to="/odalar" className={linkClass}>
          <DoorOpen size={20} />
          Odalar
        </NavLink>

        <NavLink to="/kutular" className={linkClass}>
          <Package size={20} />
          Kutular
        </NavLink>

        <NavLink to="/esyalar" className={linkClass}>
          <PackageOpen size={20} />
          Eşyalar
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
