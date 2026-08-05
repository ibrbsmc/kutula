import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BOX_STATUS_OPTIONS } from "@/lib/boxStatus";
import { selectClassName } from "@/lib/formStyles";

function BoxFilters({
  rooms,
  statusFilter,
  setStatusFilter,
  roomFilter,
  setRoomFilter,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:p-5">
      <div className="w-full space-y-2 sm:max-w-xs">
        <Label htmlFor="status-filter">Duruma Göre Filtrele</Label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tümü</option>

          {BOX_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full space-y-2 sm:max-w-xs">
        <Label htmlFor="room-filter">Odaya Göre Filtrele</Label>

        <select
          id="room-filter"
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tüm Odalar</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        Filtreleri Temizle
      </Button>
    </div>
  );
}

export default BoxFilters;
