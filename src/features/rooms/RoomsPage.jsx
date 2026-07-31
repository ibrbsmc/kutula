import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function RoomsPage() {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem("kutula-rooms");
    return savedRooms ? JSON.parse(savedRooms) : [];
  });
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    localStorage.setItem("kutula-rooms", JSON.stringify(rooms));
  }, [rooms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedRoomName = roomName.trim();
    if (!cleanedRoomName) return;
    const newRoom = { id: Date.now(), name: cleanedRoomName };
    setRooms([...rooms, newRoom]);
    setRoomName("");
  };

  const handleDelete = (roomId) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

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
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <Button type="submit">Ekle</Button>
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
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(room.id)}
                  aria-label={`${room.name} odasını sil`}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default RoomsPage;
