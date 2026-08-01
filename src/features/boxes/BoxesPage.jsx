import { useEffect, useState } from "react";
import BoxFilters from "./components/BoxFilters";
import BoxForm from "./components/BoxForm";
import BoxList from "./components/BoxList";

function BoxesPage() {
  const [rooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [boxNumber, setBoxNumber] = useState("");

  const [boxes, setBoxes] = useState(() => {
    const savedBoxes = localStorage.getItem("kutula-boxes");
    return savedBoxes ? JSON.parse(savedBoxes) : [];
  });

  const [error, setError] = useState("");
  const [editingBoxId, setEditingBoxId] = useState(null);
  const [boxStatus, setBoxStatus] = useState("Hazırlanıyor");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [roomFilter, setRoomFilter] = useState("Tümü");

  useEffect(() => {
    localStorage.setItem("kutula-boxes", JSON.stringify(boxes));
  }, [boxes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericBoxNumber = Number(boxNumber);

    const boxAlreadyExists = boxes.some(
      (box) =>
        box.id !== editingBoxId &&
        String(box.roomId) === String(selectedRoomId) &&
        box.number === numericBoxNumber,
    );

    if (boxAlreadyExists) {
      setError("Bu odada aynı numaraya sahip bir kutu zaten var.");
      return;
    }

    if (editingBoxId !== null) {
      const updatedBoxes = boxes.map((box) =>
        box.id === editingBoxId
          ? {
              ...box,
              roomId: Number(selectedRoomId),
              number: numericBoxNumber,
              status: boxStatus,
            }
          : box,
      );

      setBoxes(updatedBoxes);
      setEditingBoxId(null);
    } else {
      const newBox = {
        id: Date.now(),
        roomId: Number(selectedRoomId),
        number: numericBoxNumber,
        status: boxStatus,
      };

      setBoxes([...boxes, newBox]);
    }

    setSelectedRoomId("");
    setBoxNumber("");
    setBoxStatus("Hazırlanıyor");
    setError("");
  };

  const handleDelete = (boxId) => {
    const updatedBoxes = boxes.filter((box) => box.id !== boxId);
    setBoxes(updatedBoxes);
  };

  const handleEdit = (boxId) => {
    const boxToEdit = boxes.find((box) => box.id === boxId);

    setSelectedRoomId(String(boxToEdit.roomId));
    setBoxNumber(String(boxToEdit.number));
    setBoxStatus(boxToEdit.status);
    setEditingBoxId(boxId);
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingBoxId(null);
    setSelectedRoomId("");
    setBoxNumber("");
    setBoxStatus("Hazırlanıyor");
    setError("");
  };

  const filteredBoxes = boxes.filter((box) => {
    const matchesStatus =
      statusFilter === "Tümü" || box.status === statusFilter;

    const matchesRoom =
      roomFilter === "Tümü" || String(box.roomId) === String(roomFilter);

    return matchesStatus && matchesRoom;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kutular</h1>

        <p className="text-muted-foreground">
          Taşınma kutularını buradan yönetebilirsin.
        </p>
      </div>

      <BoxForm
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
        boxNumber={boxNumber}
        setBoxNumber={setBoxNumber}
        boxStatus={boxStatus}
        setBoxStatus={setBoxStatus}
        editingBoxId={editingBoxId}
        error={error}
        setError={setError}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Kayıtlı Kutular ({boxes.length})
        </h2>

        <BoxFilters
          rooms={rooms}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          roomFilter={roomFilter}
          setRoomFilter={setRoomFilter}
        />

        <BoxList
          boxes={filteredBoxes}
          totalBoxCount={boxes.length}
          rooms={rooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default BoxesPage;
