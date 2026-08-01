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

  useEffect(() => {
    localStorage.setItem("kutula-items", JSON.stringify(items));
  }, [items]);

  function handleSubmit(e) {
    e.preventDefault();
    const cleanedItemName = itemName.trim();
    if (!selectedBoxId) {
      setError("Lütfen bir kutu seçin.");
      return;
    }
    if (!cleanedItemName) {
      setError("Lütfen bir eşya adı girin.");
      return;
    }
    const newItem = {
      id: Date.now(),
      boxId: Number(selectedBoxId),
      name: cleanedItemName,
      isFragile, // Eşya kırılabilir mi?
      isValuable, // Eşya değerli mi?
    };
    setItems([...items, newItem]);
    setItemName("");
    setSelectedBoxId("");
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
