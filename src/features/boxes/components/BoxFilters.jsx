function BoxFilters({
  rooms,
  statusFilter,
  setStatusFilter,
  roomFilter,
  setRoomFilter,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="w-full max-w-xs space-y-2">
        <label htmlFor="status-filter" className="text-sm font-medium">
          Duruma Göre Filtrele
        </label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="Tümü">Tümü</option>
          <option value="Hazırlanıyor">Hazırlanıyor</option>
          <option value="Taşınmaya Hazır">Taşınmaya Hazır</option>
          <option value="Taşındı">Taşındı</option>
          <option value="Açıldı">Açıldı</option>
        </select>
      </div>

      <div className="w-full max-w-xs space-y-2">
        <label htmlFor="room-filter" className="text-sm font-medium">
          Odaya Göre Filtrele
        </label>

        <select
          id="room-filter"
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="Tümü">Tüm Odalar</option>

          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BoxFilters;
