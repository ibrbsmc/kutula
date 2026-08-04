import { Button } from "@/components/ui/button";
import { DoorOpen, PackageOpen, Pencil, Trash2 } from "lucide-react";

const STATUS_STYLES = {
  Hazırlanıyor: "bg-amber-100 text-amber-800",
  "Taşınmaya Hazır": "bg-sky-100 text-sky-800",
  Taşındı: "bg-emerald-100 text-emerald-800",
  Açıldı: "bg-slate-200 text-slate-700",
};

function BoxCard({ box, roomName, itemCount, onEdit, onDelete }) {
  const statusClassName =
    STATUS_STYLES[box.status] ?? "bg-slate-200 text-slate-700";

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
        <img
          src="/favicon.png"
          alt="Kutu"
          className="size-16 object-contain drop-shadow-sm"
        />

        <div className="absolute right-3 top-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onEdit(box.id)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`Kutu ${box.number} düzenle`}
          >
            <Pencil />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onDelete(box.id)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`Kutu ${box.number} sil`}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${statusClassName}`}
        >
          {box.status}
        </span>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-[#3B2A22]">
          Kutu #{box.number}
        </h3>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black">
          <span className="flex items-center gap-1.5">
            <DoorOpen className="size-4 text-[#E08149]" />
            {roomName}
          </span>

          <span className="flex items-center gap-1.5">
            <PackageOpen className="size-4 text-[#E08149]" />
            {itemCount} Eşya
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoxCard;
