import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import RoomForm from "./components/RoomForm";
import RoomList from "./components/RoomList";

function RoomsPage() {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [roomName, setRoomName] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [error, setError] = useState("");
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("kutula-rooms", JSON.stringify(rooms));
  }, [rooms]);

  function handleSubmit(e) {
    e.preventDefault();

    const cleanedRoomName = roomName.trim();

    if (!cleanedRoomName) {
      setError("Oda adı boş bırakılamaz.");
      return;
    }

    const normalizedRoomName = cleanedRoomName.toLocaleLowerCase("tr-TR");

    const roomAlreadyExists = rooms.some((room) => {
      const normalizedExistingName = room.name.toLocaleLowerCase("tr-TR");

      return (
        normalizedExistingName === normalizedRoomName &&
        String(room.id) !== String(editingRoomId)
      );
    });

    if (roomAlreadyExists) {
      setError("Bu isimde bir oda zaten var.");
      return;
    }

    if (editingRoomId !== null) {
      const updatedRooms = rooms.map((room) =>
        String(room.id) === String(editingRoomId)
          ? {
              ...room,
              name: cleanedRoomName,
            }
          : room,
      );

      setRooms(updatedRooms);
      setEditingRoomId(null);
      toast.success("Oda güncellendi.");
    } else {
      const newRoom = {
        id: Date.now(),
        name: cleanedRoomName,
      };

      setRooms([...rooms, newRoom]);
      toast.success("Oda eklendi.");
    }

    setRoomName("");
    setError("");
  }

  function handleDelete(roomId) {
    const savedBoxes = localStorage.getItem("kutula-boxes");
    const savedItems = localStorage.getItem("kutula-items");

    const boxes = savedBoxes ? JSON.parse(savedBoxes) : [];
    const items = savedItems ? JSON.parse(savedItems) : [];

    const relatedBoxes = boxes.filter(
      (box) => String(box.roomId) === String(roomId),
    );

    const relatedBoxIds = relatedBoxes.map((box) => String(box.id));

    const relatedItems = items.filter((item) =>
      relatedBoxIds.includes(String(item.boxId)),
    );

    const room = rooms.find((room) => String(room.id) === String(roomId));

    setRoomToDelete({
      id: roomId,
      name: room?.name ?? "",
      boxCount: relatedBoxes.length,
      itemCount: relatedItems.length,
    });
  }

  function handleConfirmDelete() {
    if (!roomToDelete) {
      return;
    }

    const savedBoxes = localStorage.getItem("kutula-boxes");
    const savedItems = localStorage.getItem("kutula-items");

    const boxes = savedBoxes ? JSON.parse(savedBoxes) : [];
    const items = savedItems ? JSON.parse(savedItems) : [];

    const relatedBoxIds = boxes
      .filter((box) => String(box.roomId) === String(roomToDelete.id))
      .map((box) => String(box.id));

    const remainingBoxes = boxes.filter(
      (box) => String(box.roomId) !== String(roomToDelete.id),
    );

    const remainingItems = items.filter(
      (item) => !relatedBoxIds.includes(String(item.boxId)),
    );

    localStorage.setItem("kutula-boxes", JSON.stringify(remainingBoxes));

    localStorage.setItem("kutula-items", JSON.stringify(remainingItems));

    setRooms((currentRooms) =>
      currentRooms.filter(
        (room) => String(room.id) !== String(roomToDelete.id),
      ),
    );

    if (String(editingRoomId) === String(roomToDelete.id)) {
      handleCancelEdit();
    }

    toast.success("Oda silindi.");
    setRoomToDelete(null);
  }

  function handleEdit(room) {
    setEditingRoomId(room.id);
    setRoomName(room.name);
    setError("");
  }

  function handleCancelEdit() {
    setEditingRoomId(null);
    setRoomName("");
    setError("");
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Odalar</h1>

        <p className="text-muted-foreground">
          Taşınma kutularını yerleştirebileceğin odaları oluştur.
        </p>
      </div>

      <RoomForm
        roomName={roomName}
        setRoomName={setRoomName}
        editingRoomId={editingRoomId}
        error={error}
        setError={setError}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <RoomList rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} />

      <DeleteConfirmDialog
        open={roomToDelete !== null}
        title="Oda silinsin mi?"
        description={
          roomToDelete
            ? roomToDelete.boxCount > 0
              ? `"${roomToDelete.name}" odasındaki ${roomToDelete.boxCount} kutu ve ${roomToDelete.itemCount} eşya da silinecek. Bu işlem geri alınamaz.`
              : `"${roomToDelete.name}" odası silinecek. Bu işlem geri alınamaz.`
            : ""
        }
        onOpenChange={(open) => {
          if (!open) {
            setRoomToDelete(null);
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}

export default RoomsPage;
