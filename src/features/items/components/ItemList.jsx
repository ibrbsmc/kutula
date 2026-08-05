import ItemCard from "./ItemCard";
import EmptyState from "@/components/EmptyState";

function ItemList({ items, boxes, rooms, onEditItem, onDeleteItem, emptyMessage }) {
  if (items.length === 0) {
    return <EmptyState icon="/items.png" message={emptyMessage} />;
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((item) => {
        const box = boxes.find(
          (box) => String(box.id) === String(item.boxId),
        );

        const room = rooms.find(
          (room) => String(room.id) === String(box?.roomId),
        );

        return (
          <ItemCard
            key={item.id}
            item={item}
            roomName={room ? room.name : "Oda bulunamadı"}
            boxLabel={box ? `Kutu ${box.number}` : "Kutu bulunamadı"}
            onEdit={onEditItem}
            onDelete={onDeleteItem}
          />
        );
      })}
    </ul>
  );
}

export default ItemList;
