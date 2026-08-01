import { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";

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
      isFragile: false, // Eşya kırılabilir mi?
      isValuable: false, // Eşya değerli mi?
    };
    setItems([...items, newItem]);
    setItemName("");
    setSelectedBoxId("");
    setError("");
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
      />
    </section>
  );
}

export default ItemsPage;
