import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function BoxCard({ box, roomName, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">Kutu #{box.number}</h3>

      <p className="text-sm text-muted-foreground">Oda: {roomName}</p>

      <p className="text-sm text-muted-foreground">Durum: {box.status}</p>

      <div className="flex">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onEdit(box.id)}
          aria-label={`Kutu ${box.number} düzenle`}
        >
          <Pencil className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(box.id)}
          aria-label={`Kutu ${box.number} sil`}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

export default BoxCard;
