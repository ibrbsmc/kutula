import { Button } from "@/components/ui/button";

const selectClassName =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function ItemFilters({
  rooms,
  boxes,
  roomFilter,
  boxFilter,
  fragileFilter,
  valuableFilter,
  onRoomFilterChange,
  setBoxFilter,
  setFragileFilter,
  setValuableFilter,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <label htmlFor="room-filter" className="text-sm font-medium">
          Odaya Göre Filtrele
        </label>

        <select
          id="room-filter"
          value={roomFilter}
          onChange={(e) => onRoomFilterChange(e.target.value)}
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

      <div className="space-y-2">
        <label htmlFor="box-filter" className="text-sm font-medium">
          Kutuya Göre Filtrele
        </label>

        <select
          id="box-filter"
          value={boxFilter}
          onChange={(e) => setBoxFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tüm Kutular</option>

          {boxes.map((box) => {
            const room = rooms.find(
              (room) => String(room.id) === String(box.roomId),
            );

            return (
              <option key={box.id} value={box.id}>
                {roomFilter === "Tümü" && room
                  ? `${room.name} - Kutu ${box.number}`
                  : `Kutu ${box.number}`}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="fragile-filter" className="text-sm font-medium">
          Kırılabilir
        </label>

        <select
          id="fragile-filter"
          value={fragileFilter}
          onChange={(e) => setFragileFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tümü</option>
          <option value="Evet">Evet</option>
          <option value="Hayır">Hayır</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="valuable-filter" className="text-sm font-medium">
          Değerli
        </label>

        <select
          id="valuable-filter"
          value={valuableFilter}
          onChange={(e) => setValuableFilter(e.target.value)}
          className={selectClassName}
        >
          <option value="Tümü">Tümü</option>
          <option value="Evet">Evet</option>
          <option value="Hayır">Hayır</option>
        </select>
      </div>

      <div className="sm:col-span-2 lg:col-span-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Filtreleri Temizle
        </Button>
      </div>
    </div>
  );
}

export default ItemFilters;
