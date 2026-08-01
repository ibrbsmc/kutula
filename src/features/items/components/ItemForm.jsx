import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ItemForm({
  rooms,
  boxes,
  selectedBoxId,
  setSelectedBoxId,
  itemName,
  setItemName,
  quantity,
  setQuantity,
  isFragile,
  setIsFragile,
  isValuable,
  setIsValuable,
  error,
  setError,
  isEditing,
  onCancelEdit,
  onSubmit,
}) {
  return (
    <form className="max-w-md space-y-4" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="item-box" className="text-sm font-medium">
          Kutu
        </label>

        <select
          id="item-box"
          required
          value={selectedBoxId}
          onChange={(e) => {
            setSelectedBoxId(e.target.value);
            setError("");
          }}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          disabled={boxes.length === 0}
        >
          <option value="">
            {boxes.length === 0 ? "Önce bir kutu oluşturmalısın" : "Kutu seç"}
          </option>

          {boxes.map((box) => {
            const room = rooms.find(
              (room) => String(room.id) === String(box.roomId),
            );

            return (
              <option key={box.id} value={box.id}>
                {room?.name ?? "Oda bulunamadı"} - Kutu {box.number}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="item-name" className="text-sm font-medium">
          Eşya Adı
        </label>

        <Input
          id="item-name"
          placeholder="Örneğin: Bardak takımı"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            setError("");
          }}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-2">
        <label htmlFor="item-quantity" className="text-sm font-medium">
          Adet
        </label>

        <Input
          id="item-quantity"
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm">
          <Input
            type="checkbox"
            checked={isFragile}
            onChange={(e) => setIsFragile(e.target.checked)}
            className="size-4"
          />
          Kırılabilir
        </label>

        <label className="flex items-center gap-2 text-sm">
          <Input
            type="checkbox"
            checked={isValuable}
            onChange={(e) => setIsValuable(e.target.checked)}
            className="size-4"
          />
          Değerli
        </label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={boxes.length === 0}>
          {isEditing ? "Değişiklikleri Kaydet" : "Eşya Ekle"}
        </Button>

        {isEditing && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            İptal
          </Button>
        )}
      </div>
    </form>
  );
}

export default ItemForm;
