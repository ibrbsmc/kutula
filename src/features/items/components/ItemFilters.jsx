function ItemFilters({
  rooms,
  boxes,
  roomFilter,
  boxFilter,
  onRoomFilterChange,
  setBoxFilter,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="room-filter" className="text-sm font-medium">
          Odaya Göre Filtrele
        </label>

        <select
          id="room-filter"
          value={roomFilter}
          onChange={(e) => onRoomFilterChange(e.target.value)}
          className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
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
          className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
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
    </div>
  );
}

export default ItemFilters;
