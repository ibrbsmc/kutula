import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, LoaderCircle, X } from "lucide-react";

function RoomForm({
  roomName,
  setRoomName,
  roomImage,
  editingRoomId,
  error,
  imageWarning,
  isImageLoading,
  setError,
  onImageChange,
  onRemoveImage,
  onSubmit,
  onCancelEdit,
}) {
  const fileInputRef = useRef(null);

  // Oda görseli dışarıdan (kaldırma, kaydetme, iptal) temizlendiğinde
  // dosya seçme input'unu da eski dosya adını göstermemesi için sıfırla.
  useEffect(() => {
    if (!roomImage && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [roomImage]);

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl space-y-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
        <div className="space-y-2">
          <label htmlFor="room-name" className="text-sm font-medium">
            Oda Adı
          </label>

          <Input
            id="room-name"
            placeholder="Örneğin: Salon"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setError("");
            }}
          />

          <div className="space-y-2 pt-2">
            <label htmlFor="room-image" className="text-sm font-medium">
              Oda Görseli{" "}
              <span className="font-normal text-xs text-muted-foreground">
                (Opsiyonel)
              </span>
            </label>

            <Input
              id="room-image"
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
          {roomImage ? (
            <>
              <img
                src={roomImage}
                alt="Oda görseli önizlemesi"
                className="h-full min-h-32 w-full object-cover"
              />

              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={onRemoveImage}
                className="absolute right-2 top-2 bg-white/90"
                aria-label="Oda görselini kaldır"
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

      <div className="flex gap-1.5">
        <Button
          type="submit"
          disabled={isImageLoading}
          className="bg-[#E08149] text-white hover:bg-[#C96E39]"
        >
          {editingRoomId !== null ? "Kaydet" : "Oda Ekle"}
        </Button>

        {editingRoomId !== null && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            İptal
          </Button>
        )}
      </div>
    </form>
  );
}

export default RoomForm;
