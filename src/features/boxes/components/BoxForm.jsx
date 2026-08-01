import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BoxForm({
  rooms,
  selectedRoomId,
  setSelectedRoomId,
  boxNumber,
  setBoxNumber,
  boxStatus,
  setBoxStatus,
  editingBoxId,
  error,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <form className="max-w-md space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label htmlFor="room" className="text-sm font-medium">
          Oda
        </label>

        <select
          id="room"
          required
          value={selectedRoomId}
          onChange={(e) => setSelectedRoomId(e.target.value)}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          disabled={rooms.length === 0}
        >
          <option value="">
            {rooms.length === 0 ? "Önce bir oda oluşturmalısın" : "Oda seç"}
          </option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="box-number" className="text-sm font-medium">
          Kutu Numarası
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Input
          id="box-number"
          type="number"
          min="1"
          required
          placeholder="Örneğin: 1"
          value={boxNumber}
          onChange={(e) => setBoxNumber(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="box-status" className="text-sm font-medium">
          Durum
        </label>

        <select
          id="box-status"
          value={boxStatus}
          onChange={(e) => setBoxStatus(e.target.value)}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="Hazırlanıyor">Hazırlanıyor</option>
          <option value="Taşınmaya Hazır">Taşınmaya Hazır</option>
          <option value="Taşındı">Taşındı</option>
          <option value="Açıldı">Açıldı</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={rooms.length === 0}>
          {editingBoxId !== null ? "Değişiklikleri Kaydet" : "Kutu Ekle"}
        </Button>

        {editingBoxId !== null && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            Vazgeç
          </Button>
        )}
      </div>
    </form>
  );
}

export default BoxForm;
