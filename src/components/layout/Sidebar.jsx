import { House, DoorOpen } from "lucide-react";
import { NavLink } from "react-router";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted"
    }`;

  return (
    <aside className="hidden w-64 shrink-0 border-r p-4 md:block">
      <h1 className="mb-8 text-2xl font-bold">Kutula</h1>

      <nav className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          <House size={20} />
          Ana Sayfa
        </NavLink>

        <NavLink to="/odalar" className={linkClass}>
          <DoorOpen size={20} />
          Odalar
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
