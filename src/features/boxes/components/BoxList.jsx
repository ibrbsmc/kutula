import BoxCard from "./BoxCard";

function BoxList({ boxes, totalBoxCount, rooms, onEdit, onDelete }) {
  if (boxes.length === 0) {
    return (
      <p className="text-muted-foreground">
        {totalBoxCount === 0
          ? "Henüz kutu eklenmedi."
          : "Bu filtreye uygun kutu bulunamadı."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {boxes.map((box) => {
        const room = rooms.find(
          (room) => String(room.id) === String(box.roomId),
        );

        return (
          <BoxCard
            key={box.id}
            box={box}
            roomName={room ? room.name : "Oda bulunamadı"}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default BoxList;
