import RoomCard from "./RoomCard";

function RoomList({ roomsWithStats, onEdit, onDelete }) {
  if (roomsWithStats.length === 0) {
    return (
      <p className="text-muted-foreground">Henüz bir oda oluşturulmadı.</p>
    );
  }

  return (
    <ul
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    "
    >
      {roomsWithStats.map(({ room, boxCount, itemCount }) => (
        <RoomCard
          key={room.id}
          room={room}
          boxCount={boxCount}
          itemCount={itemCount}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default RoomList;
