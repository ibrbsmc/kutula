import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function RoomForm({
  roomName,
  setRoomName,
  editingRoomId,
  error,
  setError,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-3">
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

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-1.5">
        <Button type="submit">
          {editingRoomId !== null ? "Kaydet" : "Ekle"}
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
