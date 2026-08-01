import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

function ItemList({ items, boxes, rooms, onEditItem, onDeleteItem }) {
  const totalItemCount = items.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0,
  );
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Henüz kayıtlı eşya bulunmuyor.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Kayıtlı Eşyalar ({totalItemCount} adet)
      </h2>

      <ul className="space-y-3">
        {items.map((item) => {
          const box = boxes.find(
            (box) => String(box.id) === String(item.boxId),
          );

          const room = rooms.find(
            (room) => String(room.id) === String(box?.roomId),
          );

          return (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border p-4"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{item.name}</h3>

                  <span className="rounded-full bg-muted px-2 py-1 text-xs">
                    {item.quantity ?? 1} adet
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {room?.name ?? "Oda bulunamadı"} -{" "}
                  {box ? `Kutu ${box.number}` : "Kutu bulunamadı"}
                </p>

                {(item.isFragile || item.isValuable) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.isFragile && (
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700">
                        Kırılabilir
                      </span>
                    )}

                    {item.isValuable && (
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                        Değerli
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`${item.name} eşyasını düzenle`}
                  onClick={() => onEditItem(item)}
                >
                  <Pencil className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`${item.name} eşyasını sil`}
                  onClick={() => onDeleteItem(item.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemList;
