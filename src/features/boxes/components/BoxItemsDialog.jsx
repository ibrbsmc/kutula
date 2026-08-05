import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";

function ItemRow({ item, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(String(item.quantity ?? 1));

  function handleSave() {
    if (!name.trim()) {
      return;
    }

    onUpdate(item.id, { name: name.trim(), quantity: Number(quantity) || 1 });
    setIsEditing(false);
  }

  function handleCancel() {
    setName(item.name);
    setQuantity(String(item.quantity ?? 1));
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 rounded-lg border bg-white p-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1"
          autoFocus
        />

        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-16"
        />

        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          onClick={handleSave}
          aria-label="Kaydet"
        >
          <Check />
        </Button>

        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          onClick={handleCancel}
          aria-label="Vazgeç"
        >
          <X />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-white p-2.5">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="truncate font-medium text-[#3B2A22]">
          {item.name}
        </span>

        <Badge variant="outline">{item.quantity ?? 1} adet</Badge>

        {item.isFragile && (
          <Badge className="bg-amber-100 text-amber-800">Kırılabilir</Badge>
        )}

        {item.isValuable && (
          <Badge className="bg-yellow-100 text-yellow-800">Değerli</Badge>
        )}
      </div>

      <div className="flex shrink-0 gap-1">
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          onClick={() => setIsEditing(true)}
          aria-label={`${item.name} eşyasını düzenle`}
        >
          <Pencil />
        </Button>

        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          onClick={() => onDelete(item.id)}
          aria-label={`${item.name} eşyasını sil`}
        >
          <Trash2 className="text-destructive" />
        </Button>
      </div>
    </div>
  );
}

function BoxItemsDialog({
  box,
  roomName,
  items,
  open,
  onOpenChange,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");

  function handleAdd(e) {
    e.preventDefault();

    if (!newItemName.trim()) {
      return;
    }

    onAddItem({
      name: newItemName.trim(),
      quantity: Number(newItemQuantity) || 1,
      isFragile: false,
      isValuable: false,
    });

    setNewItemName("");
    setNewItemQuantity("1");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {box && (
          <>
            <DialogHeader>
              <DialogTitle>
                Kutu #{box.number}{" "}
                <span className="font-normal text-muted-foreground">
                  · {roomName}
                </span>
              </DialogTitle>
              <DialogDescription>
                Bu kutudaki eşyaları görüntüle, ekle ve düzenle.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAdd} className="flex gap-2">
              <Input
                placeholder="Eşya adı"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1"
              />

              <Input
                type="number"
                min="1"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                className="w-16"
              />

              <Button type="submit" size="icon" aria-label="Eşya ekle">
                <Plus />
              </Button>
            </form>

            <div className="max-h-72 space-y-2 overflow-y-auto">
              {items.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  Bu kutuda henüz eşya yok.
                </p>
              ) : (
                items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onUpdate={onUpdateItem}
                    onDelete={onDeleteItem}
                  />
                ))
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BoxItemsDialog;
