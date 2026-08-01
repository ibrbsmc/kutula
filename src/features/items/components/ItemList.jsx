function ItemList({ items, boxes, rooms }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Henüz kayıtlı eşya bulunmuyor.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Kayıtlı Eşyalar ({items.length})
      </h2>

      <ul className="space-y-3">
        {items.map((item) => {
          const box = boxes.find(
            (box) => String(box.id) === String(item.boxId),
          );

          const room = rooms.find(
            (room) => String(room.id) === String(box?.roomId),
          );

          return (
            <li key={item.id} className="rounded-lg border p-4">
              <h3 className="font-medium">{item.name}</h3>

              <p className="text-sm text-muted-foreground">
                {room?.name ?? "Oda bulunamadı"} -{" "}
                {box ? `Kutu ${box.number}` : "Kutu bulunamadı"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ItemList;
