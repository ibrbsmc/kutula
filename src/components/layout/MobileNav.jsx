import { DoorOpen, House, Package, PackageOpen } from "lucide-react";
import { NavLink } from "react-router";

function MobileNav() {
  const linkClass = ({ isActive }) =>
    isActive ? "font-semibold text-primary" : "text-muted-foreground";

  return (
    <header className="border-b p-4 md:hidden">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">Kutula</span>

        <nav className="flex gap-4">
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
