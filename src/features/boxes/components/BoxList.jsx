import BoxCard from "./BoxCard";
import EmptyState from "@/components/EmptyState";

function BoxList({
  boxes,
  totalBoxCount,
  rooms,
  items,
  onOpenItems,
  onEdit,
  onDelete,
}) {
  if (boxes.length === 0) {
    return (
      <EmptyState
        icon="/empty_box.png"
        message={
          totalBoxCount === 0
            ? "Henüz kutu eklenmedi."
            : "Bu filtreye uygun kutu bulunamadı."
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {boxes.map((box) => {
        const room = rooms.find(
          (room) => String(room.id) === String(box.roomId),
        );

        const itemCount = items.reduce((total, item) => {
          if (String(item.boxId) !== String(box.id)) {
            return total;
          }

          return total + (Number(item.quantity) || 1);
        }, 0);

        return (
          <BoxCard
            key={box.id}
            box={box}
            roomName={room ? room.name : "Oda bulunamadı"}
            itemCount={itemCount}
            onOpenItems={onOpenItems}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default BoxList;
