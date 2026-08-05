import RoomCard from "./RoomCard";
import EmptyState from "@/components/EmptyState";

function RoomList({ roomsWithStats, onEdit, onDelete }) {
  if (roomsWithStats.length === 0) {
    return (
      <EmptyState icon="/house.png" message="Henüz bir oda oluşturulmadı." />
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
