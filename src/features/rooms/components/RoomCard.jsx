import { Button } from "@/components/ui/button";
import { DoorOpen, Package, PackageOpen, Pencil, Trash2 } from "lucide-react";

function RoomCard({ room, boxCount, itemCount, onEdit, onDelete }) {
  return (
    <li className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
        {room.image ? (
          <img
            src={room.image}
            alt={`${room.name} odası`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#BF5223]">
            <DoorOpen className="size-10" strokeWidth={1.5} />
            <span className="text-sm">Oda görseli eklenmedi.</span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onEdit(room)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`${room.name} odasını düzenle`}
          >
            <Pencil />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => onDelete(room.id)}
            className="border-white/70 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
            aria-label={`${room.name} odasını sil`}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <h2 className="text-lg font-semibold text-[#3B2A22]">{room.name}</h2>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-black">
          <span className="flex items-center gap-1.5">
            <Package className="size-4 text-[#E08149]" />
            {boxCount} Kutu
          </span>

          <span className="flex items-center gap-1.5">
            <PackageOpen className="size-4 text-[#E08149]" />
            {itemCount} Eşya
          </span>
        </div>
      </div>
    </li>
  );
}

export default RoomCard;
