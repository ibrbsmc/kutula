import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function RoomsPage() {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });
  const [roomName, setRoomName] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [error, setError] = useState("");

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
    setError("");

    const normalizedRoomName = cleanedRoomName.toLocaleLowerCase("tr-TR");

    const roomAlreadyExists = rooms.some((room) => {
      const normalizedExistingName = room.name.toLocaleLowerCase("tr-TR");

      return (
        normalizedExistingName === normalizedRoomName &&
        room.id !== editingRoomId
      );
    });

    if (roomAlreadyExists) {
      setError("Bu isimde bir oda zaten var.");
      return;
    }

    setError("");

    if (editingRoomId) {
      const updatedRooms = rooms.map((room) => {
        if (room.id === editingRoomId) {
          return {
            ...room,
            name: cleanedRoomName,
          };
        }

        return room;
      });

      setRooms(updatedRooms);
      setEditingRoomId(null);
    } else {
      const newRoom = {
        id: Date.now(),
        name: cleanedRoomName,
      };

      setRooms([...rooms, newRoom]);
    }

    setRoomName("");
  }

  const handleDelete = (roomId) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  function handleEdit(room) {
    setEditingRoomId(room.id);
    setRoomName(room.name);
  }

  function handleCancelEdit() {
    setEditingRoomId(null);
    setRoomName("");
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Odalar</h1>
        <p className="text-muted-foreground">
          Taşınma kutularını yerleştirebileceğin odaları oluştur.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-3">
        <label htmlFor="room-name" className="text-sm font-medium">
          Oda Adı
        </label>
        <div className="flex gap-2">
          <Input
            id="room-name"
            placeholder="Örneğin: Salon"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit">{editingRoomId ? "Kaydet" : "Ekle"}</Button>
        {editingRoomId && (
          <Button type="button" variant="outline" onClick={handleCancelEdit}>
            İptal
          </Button>
        )}
      </form>

      {rooms.length === 0 ? (
        <p className="text-muted-foreground">Henüz bir oda oluşturulmadı.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => {
            return (
              <li
                key={room.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <span className="font-medium">{room.name}</span>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(room)}
                    aria-label={`${room.name} odasını düzenle`}
                  >
                    <Pencil />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(room.id)}
                    aria-label={`${room.name} odasını sil`}
                  >
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default RoomsPage;
