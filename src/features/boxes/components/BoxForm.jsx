import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BOX_STATUS_OPTIONS } from "@/lib/boxStatus";
import { formSelectClassName } from "@/lib/formStyles";

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
          <Label htmlFor="room">Oda</Label>

          <select
            id="room"
            required
            value={selectedRoomId}
            onChange={(e) => {
              setSelectedRoomId(e.target.value);
              setError("");
            }}
            className={formSelectClassName}
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
          <Label htmlFor="box-number">Kutu Numarası</Label>

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
          <Label htmlFor="box-status">Durum</Label>

          <select
            id="box-status"
            value={boxStatus}
            onChange={(e) => setBoxStatus(e.target.value)}
            className={formSelectClassName}
          >
            {BOX_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
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
