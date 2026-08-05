import { House, DoorOpen, Package, PackageOpen, Info, Mail } from "lucide-react";
import { NavLink } from "react-router";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 ${
      isActive
        ? "bg-[#E08149] text-white"
        : "text-black hover:bg-[#E08149]/10 [&>svg]:text-[#E08149]"
    }`;

  const secondaryLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
      isActive
        ? "bg-[#E08149]/10 text-[#BF5223]"
        : "text-muted-foreground hover:bg-[#E08149]/10 hover:text-[#BF5223]"
    }`;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-r-[#F6F4EE] p-4 md:block">
      <div className="mb-6 flex items-center gap-3">
        <img src="/favicon.png" alt="Kutula Logo" width={48} height={48} />
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

      <div className="mt-6 space-y-1 border-t border-t-[#F6F4EE] pt-4">
        <NavLink to="/hakkinda" className={secondaryLinkClass}>
          <Info size={18} />
          Kutula Nedir?
        </NavLink>

        <NavLink to="/iletisim" className={secondaryLinkClass}>
          <Mail size={18} />
          İletişim
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
