import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

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
  setError,
  onSubmit,
  onCancelEdit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl space-y-4 rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="room" className="text-sm font-medium">
            Oda
          </label>

          <select
            id="room"
            required
            value={selectedRoomId}
            onChange={(e) => {
              setSelectedRoomId(e.target.value);
              setError("");
            }}
            className={selectClassName}
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

          <Input
            id="box-number"
            type="number"
            min="1"
            required
            placeholder="Örneğin: 1"
            value={boxNumber}
            onChange={(e) => {
              setBoxNumber(e.target.value);
              setError("");
            }}
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
            className={selectClassName}
          >
            <option value="Hazırlanıyor">Hazırlanıyor</option>
            <option value="Taşınmaya Hazır">Taşınmaya Hazır</option>
            <option value="Taşındı">Taşındı</option>
            <option value="Açıldı">Açıldı</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-1.5">
        <Button
          type="submit"
          disabled={rooms.length === 0}
          className="bg-[#E08149] text-white hover:bg-[#C96E39]"
        >
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
