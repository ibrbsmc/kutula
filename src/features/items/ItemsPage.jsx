import { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

function ItemsPage() {
  const [rooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");

    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [boxes] = useState(() => {
    const savedBoxes = localStorage.getItem("kutula-boxes");
    return savedBoxes ? JSON.parse(savedBoxes) : [];
  });

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("kutula-items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [itemName, setItemName] = useState("");
  const [selectedBoxId, setSelectedBoxId] = useState("");
  const [error, setError] = useState("");
  const [isFragile, setIsFragile] = useState(false);
  const [isValuable, setIsValuable] = useState(false);
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    localStorage.setItem("kutula-items", JSON.stringify(items));
  }, [items]);

  function handleSubmit(e) {
    e.preventDefault();

    const cleanedItemName = itemName.trim();
    const parsedQuantity = Number(quantity);

    if (!selectedBoxId) {
      setError("Lütfen bir kutu seç.");
      return;
    }

    if (!cleanedItemName) {
      setError("Eşya adı boş bırakılamaz.");
      return;
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setError("Eşya adedi en az 1 olan tam sayı olmalıdır.");
      return;
    }

    const existingItem = items.find(
      (item) =>
        String(item.boxId) === String(selectedBoxId) &&
        item.name.trim().toLocaleLowerCase("tr-TR") ===
          cleanedItemName.toLocaleLowerCase("tr-TR"),
    );

    if (existingItem) {
      const updatedItems = items.map((item) => {
        if (item.id === existingItem.id) {
          return {
            ...item,
            quantity: (item.quantity ?? 1) + parsedQuantity,
            isFragile: item.isFragile || isFragile,
            isValuable: item.isValuable || isValuable,
          };
        }

        return item;
      });

      setItems(updatedItems);
    } else {
      const newItem = {
        id: Date.now(),
        boxId: Number(selectedBoxId),
        name: cleanedItemName,
        quantity: parsedQuantity,
        isFragile,
        isValuable,
      };

      setItems([...items, newItem]);
    }

    setItemName("");
    setSelectedBoxId("");
    setQuantity("1");
    setIsFragile(false);
    setIsValuable(false);
    setError("");
  }

  function handleDeleteItem(itemId) {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Eşyalar</h1>

        <p className="text-muted-foreground">
          Kutuların içindeki eşyaları buradan yönetebilirsin.
        </p>
      </div>
      <ItemForm
        itemName={itemName}
        setItemName={setItemName}
        boxes={boxes}
        rooms={rooms}
        selectedBoxId={selectedBoxId}
        setSelectedBoxId={setSelectedBoxId}
        error={error}
        setError={setError}
        onSubmit={handleSubmit}
        isFragile={isFragile}
        setIsFragile={setIsFragile}
        isValuable={isValuable}
        setIsValuable={setIsValuable}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <ItemList
        items={items}
        boxes={boxes}
        rooms={rooms}
        onDeleteItem={handleDeleteItem}
      />
    </section>
  );
}

export default ItemsPage;
