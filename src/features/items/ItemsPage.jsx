import { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import ItemSearch from "./components/ItemSearch";
import ItemFilters from "./components/ItemFilters";

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
  const [editingItemId, setEditingItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("Tümü");
  const [boxFilter, setBoxFilter] = useState("Tümü");
  const [fragileFilter, setFragileFilter] = useState("Tümü");
  const [valuableFilter, setValuableFilter] = useState("Tümü");

  useEffect(() => {
    localStorage.setItem("kutula-items", JSON.stringify(items));
  }, [items]);

  function handleSubmit(e) {
    e.preventDefault();

    const cleanedItemName = itemName.trim();
    const parsedQuantity = Number(quantity);
    const isEditing = editingItemId !== null;

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

    const matchingItem = items.find(
      (item) =>
        (!isEditing || item.id !== editingItemId) &&
        String(item.boxId) === String(selectedBoxId) &&
        item.name.trim().toLocaleLowerCase("tr-TR") ===
          cleanedItemName.toLocaleLowerCase("tr-TR"),
    );

    if (isEditing) {
      if (matchingItem) {
        const updatedItems = items
          .filter((item) => item.id !== editingItemId)
          .map((item) => {
            if (item.id === matchingItem.id) {
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
        const updatedItems = items.map((item) => {
          if (item.id === editingItemId) {
            return {
              ...item,
              boxId: Number(selectedBoxId),
              name: cleanedItemName,
              quantity: parsedQuantity,
              isFragile,
              isValuable,
            };
          }

          return item;
        });

        setItems(updatedItems);
      }
    } else if (matchingItem) {
      const updatedItems = items.map((item) => {
        if (item.id === matchingItem.id) {
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
      const newItemId =
        items.reduce(
          (highestId, item) => Math.max(highestId, Number(item.id)),
          0,
        ) + 1;

      const newItem = {
        id: newItemId,
        boxId: Number(selectedBoxId),
        name: cleanedItemName,
        quantity: parsedQuantity,
        isFragile,
        isValuable,
      };

      setItems([...items, newItem]);
    }

    resetForm();
  }

  function resetForm() {
    setEditingItemId(null);
    setSelectedBoxId("");
    setItemName("");
    setQuantity("1");
    setIsFragile(false);
    setIsValuable(false);
    setError("");
  }

  function handleDeleteItem(itemId) {
    const updatedItems = items.filter((item) => item.id !== itemId);

    setItems(updatedItems);

    if (itemId === editingItemId) {
      resetForm();
    }
  }

  function handleEditItem(item) {
    setEditingItemId(item.id);
    setSelectedBoxId(String(item.boxId));
    setItemName(item.name);
    setQuantity(String(item.quantity ?? 1));
    setIsFragile(Boolean(item.isFragile));
    setIsValuable(Boolean(item.isValuable));
    setError("");
  }

  function handleCancelEdit() {
    resetForm();
  }

  const cleanedSearchTerm = searchTerm.trim().toLocaleLowerCase("tr-TR");

  const hasActiveFilters =
    cleanedSearchTerm !== "" ||
    roomFilter !== "Tümü" ||
    boxFilter !== "Tümü" ||
    fragileFilter !== "Tümü" ||
    valuableFilter !== "Tümü";

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .trim()
      .toLocaleLowerCase("tr-TR")
      .includes(cleanedSearchTerm);

    const itemBox = boxes.find((box) => String(box.id) === String(item.boxId));

    const matchesRoom =
      roomFilter === "Tümü" || String(itemBox?.roomId) === String(roomFilter);

    const matchesBox =
      boxFilter === "Tümü" || String(item.boxId) === String(boxFilter);

    const matchesFragile =
      fragileFilter === "Tümü" ||
      (fragileFilter === "Evet" && item.isFragile) ||
      (fragileFilter === "Hayır" && !item.isFragile);

    const matchesValuable =
      valuableFilter === "Tümü" ||
      (valuableFilter === "Evet" && item.isValuable) ||
      (valuableFilter === "Hayır" && !item.isValuable);

    return (
      matchesSearch &&
      matchesRoom &&
      matchesBox &&
      matchesFragile &&
      matchesValuable
    );
  });

  function handleRoomFilterChange(roomId) {
    setRoomFilter(roomId);
    setBoxFilter("Tümü");
  }

  const availableFilterBoxes =
    roomFilter === "Tümü"
      ? boxes
      : boxes.filter((box) => String(box.roomId) === String(roomFilter));

  function handleClearFilters() {
    setSearchTerm("");
    setRoomFilter("Tümü");
    setBoxFilter("Tümü");
    setFragileFilter("Tümü");
    setValuableFilter("Tümü");
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
        rooms={rooms}
        boxes={boxes}
        selectedBoxId={selectedBoxId}
        setSelectedBoxId={setSelectedBoxId}
        itemName={itemName}
        setItemName={setItemName}
        quantity={quantity}
        setQuantity={setQuantity}
        isFragile={isFragile}
        setIsFragile={setIsFragile}
        isValuable={isValuable}
        setIsValuable={setIsValuable}
        error={error}
        setError={setError}
        isEditing={editingItemId !== null}
        onCancelEdit={handleCancelEdit}
        onSubmit={handleSubmit}
      />
      <ItemSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <ItemFilters
        rooms={rooms}
        boxes={availableFilterBoxes}
        roomFilter={roomFilter}
        boxFilter={boxFilter}
        fragileFilter={fragileFilter}
        valuableFilter={valuableFilter}
        onRoomFilterChange={handleRoomFilterChange}
        setBoxFilter={setBoxFilter}
        setFragileFilter={setFragileFilter}
        setValuableFilter={setValuableFilter}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <ItemList
        items={filteredItems}
        boxes={boxes}
        rooms={rooms}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        emptyMessage={
          hasActiveFilters
            ? "Seçtiğin ölçütlere uygun eşya bulunamadı."
            : "Henüz kayıtlı eşya bulunmuyor."
        }
      />
    </section>
  );
}

export default ItemsPage;
