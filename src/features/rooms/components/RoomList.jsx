import RoomCard from "./RoomCard";

function RoomList({ rooms, onEdit, onDelete }) {
  if (rooms.length === 0) {
    return (
      <p className="text-muted-foreground">Henüz bir oda oluşturulmadı.</p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default RoomList;
