import { Button } from "@/components/ui/button";

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

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
        <label htmlFor="status-filter" className="text-sm font-medium">
          Duruma Göre Filtrele
        </label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tümü</option>
          <option value="Hazırlanıyor">Hazırlanıyor</option>
          <option value="Taşınmaya Hazır">Taşınmaya Hazır</option>
          <option value="Taşındı">Taşındı</option>
          <option value="Açıldı">Açıldı</option>
        </select>
      </div>

      <div className="w-full space-y-2 sm:max-w-xs">
        <label htmlFor="room-filter" className="text-sm font-medium">
          Odaya Göre Filtrele
        </label>

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
