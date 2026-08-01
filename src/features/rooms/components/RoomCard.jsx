import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function RoomCard({ room, onEdit, onDelete }) {
  return (
    <li className="flex items-center justify-between rounded-lg border p-4">
      <span className="font-medium">{room.name}</span>

      <div className="flex gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onEdit(room)}
          aria-label={`${room.name} odasını düzenle`}
        >
          <Pencil className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(room.id)}
          aria-label={`${room.name} odasını sil`}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </li>
  );
}

export default RoomCard;
