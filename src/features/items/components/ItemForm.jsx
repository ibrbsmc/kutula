import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, LoaderCircle, X } from "lucide-react";
import { formSelectClassName } from "@/lib/formStyles";

function ToggleChip({ pressed, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
        pressed
          ? "border-[#E08149] bg-[#E08149]/10 text-[#C96E39]"
          : "border-input bg-transparent text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

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
  itemImage,
  isImageLoading,
  imageWarning,
  onImageChange,
  onRemoveImage,
  error,
  setError,
  isEditing,
  onCancelEdit,
  onSubmit,
}) {
  const fileInputRef = useRef(null);

  // Eşya görseli dışarıdan (kaldırma, kaydetme, iptal) temizlendiğinde
  // dosya seçme input'unu da eski dosya adını göstermemesi için sıfırla.
  useEffect(() => {
    if (!itemImage && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [itemImage]);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="max-w-2xl space-y-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="item-box">Kutu</Label>

              <select
                id="item-box"
                required
                value={selectedBoxId}
                onChange={(e) => {
                  setSelectedBoxId(e.target.value);
                  setError("");
                }}
                className={formSelectClassName}
                disabled={boxes.length === 0}
              >
                <option value="" className="py-1.5">
                  {boxes.length === 0
                    ? "Önce bir kutu oluşturmalısın"
                    : "Kutu seç"}
                </option>

                {boxes.map((box) => {
                  const room = rooms.find(
                    (room) => String(room.id) === String(box.roomId),
                  );

                  return (
                    <option key={box.id} value={box.id} className="py-1.5">
                      {room?.name ?? "Oda bulunamadı"} - Kutu {box.number}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-name">Eşya Adı</Label>

              <Input
                id="item-name"
                placeholder="Örneğin: Bardak"
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value);
                  setError("");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="item-quantity">Adet</Label>

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
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-image">
              Eşya Görseli{" "}
              <span className="font-normal text-xs text-muted-foreground">
                (Opsiyonel)
              </span>
            </Label>

            <Input
              id="item-image"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              disabled={isImageLoading}
              onChange={(e) => onImageChange(e.target.files[0])}
              className="file:mr-3 file:cursor-pointer file:font-medium"
            />

            <p className="text-xs text-muted-foreground">
              Maksimum dosya boyutu: 10 MB
            </p>
          </div>
        </div>

        <div className="relative flex min-h-32 items-center justify-center overflow-hidden rounded-xl border border-dashed bg-[#FCF5ED]">
          {itemImage ? (
            <>
              <img
                src={itemImage}
                alt="Eşya görseli önizlemesi"
                className="h-full min-h-32 w-full object-cover"
              />

              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={onRemoveImage}
                className="absolute right-2 top-2 bg-white/90"
                aria-label="Eşya görselini kaldır"
              >
                <X />
              </Button>
            </>
          ) : isImageLoading ? (
            <LoaderCircle className="size-7 animate-spin text-[#E08149]" />
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 text-center text-muted-foreground">
              <ImagePlus className="size-8 text-[#E08149]" />
              <span className="text-xs">Görsel Önizlemesi</span>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {imageWarning && <p className="text-sm text-amber-700">{imageWarning}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <ToggleChip
          pressed={isFragile}
          onClick={() => setIsFragile(!isFragile)}
        >
          Kırılabilir
        </ToggleChip>

        <ToggleChip
          pressed={isValuable}
          onClick={() => setIsValuable(!isValuable)}
        >
          Değerli
        </ToggleChip>
      </div>

      <div className="flex gap-1.5">
        <Button
          type="submit"
          disabled={boxes.length === 0}
          className="bg-[#E08149] text-white hover:bg-[#C96E39]"
        >
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
