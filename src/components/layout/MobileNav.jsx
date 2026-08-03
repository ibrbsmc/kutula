import { DoorOpen, House, Package, PackageOpen } from "lucide-react";
import { NavLink } from "react-router";

function MobileNav() {
  const linkClass = ({ isActive }) =>
    `flex items-center justify-center rounded-md p-2 ${
      isActive ? "bg-[#E08149] text-white" : "text-[#E08149]"
    }`;

  return (
    <header className="border-b border-b-[#F6F4EE] p-4 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Kutula Logo" width={36} height={36} />
          <span className="text-xl font-bold text-[#BF5223]">Kutula</span>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <House size={22} />
            <span className="sr-only">Ana Sayfa</span>
          </NavLink>

          <NavLink to="/odalar" className={linkClass}>
            <DoorOpen size={22} />
            <span className="sr-only">Odalar</span>
          </NavLink>

          <NavLink to="/kutular" className={linkClass}>
            <Package size={22} />
            <span className="sr-only">Kutular</span>
          </NavLink>

          <NavLink to="/esyalar" className={linkClass}>
            <PackageOpen size={22} />
            <span className="sr-only">Eşyalar</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default MobileNav;
