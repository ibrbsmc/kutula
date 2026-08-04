import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import RoomForm from "./components/RoomForm";
import RoomList from "./components/RoomList";
import resizeImage from "@/lib/resizeImage";

function RoomsPage() {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [error, setError] = useState("");
  const [imageWarning, setImageWarning] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [boxes] = useState(() => {
    const savedBoxes = localStorage.getItem("kutula-boxes");
    return savedBoxes ? JSON.parse(savedBoxes) : [];
  });

  const [items] = useState(() => {
    const savedItems = localStorage.getItem("kutula-items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("kutula-rooms", JSON.stringify(rooms));
    } catch {
      toast.error(
        "Görsel kaydedilemedi. Daha küçük bir görsel deneyebilirsin.",
      );
    }
  }, [rooms]);

  async function handleImageChange(file) {
    if (!file) {
      return;
    }

    setIsImageLoading(true);
    setError("");
    setImageWarning("");

    try {
      const { resizedImage, isLowResolution } = await resizeImage(file);

      setRoomImage(resizedImage);

      if (isLowResolution) {
        setImageWarning(
          "Bu görsel düşük çözünürlüklü olduğu için kartta daha az net görünebilir.",
        );
      }
    } catch (imageError) {
      setError(imageError.message);
    } finally {
      setIsImageLoading(false);
    }
  }

  function handleRemoveImage() {
    setRoomImage("");
    setImageWarning("");
  }

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
              image: roomImage,
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
        image: roomImage,
      };

      setRooms([...rooms, newRoom]);
      toast.success("Oda eklendi.");
    }

    setRoomName("");
    setRoomImage("");
    setImageWarning("");
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
    setRoomImage(room.image ?? "");
    setImageWarning("");
    setError("");
  }

  function handleCancelEdit() {
    setEditingRoomId(null);
    setRoomName("");
    setRoomImage("");
    setImageWarning("");
    setError("");
  }

  const roomsWithStats = rooms.map((room) => {
    const roomBoxes = boxes.filter(
      (box) => String(box.roomId) === String(room.id),
    );

    const roomBoxIds = roomBoxes.map((box) => String(box.id));

    const itemCount = items.reduce((total, item) => {
      if (!roomBoxIds.includes(String(item.boxId))) {
        return total;
      }

      return total + (Number(item.quantity) || 1);
    }, 0);

    return {
      room,
      boxCount: roomBoxes.length,
      itemCount,
    };
  });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3B2A22]">Odalar</h1>

        <p className="text-muted-foreground">
          Taşınma kutularını yerleştirebileceğin odaları oluştur.
        </p>
      </div>

      <RoomForm
        roomName={roomName}
        setRoomName={setRoomName}
        roomImage={roomImage}
        editingRoomId={editingRoomId}
        error={error}
        imageWarning={imageWarning}
        isImageLoading={isImageLoading}
        setError={setError}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
      />

      <RoomList
        roomsWithStats={roomsWithStats}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
