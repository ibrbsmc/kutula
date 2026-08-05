import { Link } from "react-router";

function EmptyState({ icon, iconClassName, message, actionTo, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/60 p-10 text-center shadow-sm">
      <img
        src={icon}
        alt=""
        className={`size-14 object-contain opacity-70 ${iconClassName ?? ""}`}
      />

      <p className="text-muted-foreground">{message}</p>

      {actionTo && (
        <Link
          to={actionTo}
          className="text-sm font-medium text-[#E08149] hover:text-[#C96E39]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
