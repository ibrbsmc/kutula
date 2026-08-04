import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  DoorOpen,
  Gem,
  ImageOff,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

function ItemCard({ item, roomName, boxLabel, onEdit, onDelete }) {
  return (
    <li className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
        {item.image ? (
          <img
            src={item.image}
            alt={`${item.name} görseli`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#BF5223]">
            <ImageOff className="size-10" strokeWidth={1.5} />
            <span className="text-sm">Eşya görseli eklenmedi.</span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onEdit(item)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`${item.name} eşyasını düzenle`}
          >
            <Pencil />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onDelete(item.id)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`${item.name} eşyasını sil`}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#3B2A22] shadow-sm backdrop-blur">
          {item.quantity ?? 1} adet
        </span>
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-[#3B2A22]">
            {item.name}
          </h3>

          {item.isFragile && (
            <AlertTriangle
              className="size-4 text-amber-600"
              aria-label="Kırılabilir"
            />
          )}

          {item.isValuable && (
            <Gem className="size-4 text-yellow-600" aria-label="Değerli" />
          )}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black">
          <span className="flex items-center gap-1.5">
            <DoorOpen className="size-4 text-[#E08149]" />
            {roomName}
          </span>

          <span className="flex items-center gap-1.5">
            <Package className="size-4 text-[#E08149]" />
            {boxLabel}
          </span>
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
