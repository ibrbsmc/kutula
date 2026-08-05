import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoorOpen, PackageOpen, Pencil, Trash2 } from "lucide-react";
import { BOX_STATUS_BADGE_STYLES } from "@/lib/boxStatus";

function BoxCard({ box, roomName, itemCount, onOpenItems, onEdit, onDelete }) {
  const statusClassName =
    BOX_STATUS_BADGE_STYLES[box.status] ?? "bg-slate-200 text-slate-700";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenItems(box)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenItems(box);
        }
      }}
      className="cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
        <img
          src="/favicon.png"
          alt="Kutu"
          className="size-20 scale-135 object-contain drop-shadow-sm"
        />

        <div className="absolute right-3 top-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(box.id);
            }}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`Kutu ${box.number} düzenle`}
          >
            <Pencil />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(box.id);
            }}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`Kutu ${box.number} sil`}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>

        <Badge className={`absolute left-3 top-3 ${statusClassName}`}>
          {box.status}
        </Badge>
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

        <p className="text-xs text-muted-foreground">
          Eşyaları görmek için karta tıkla
        </p>
      </div>
    </div>
  );
}

export default BoxCard;
