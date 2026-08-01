import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    localStorage.setItem("kutula-boxes", JSON.stringify(boxes));
  }, [boxes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBox = {
      id: Date.now(),
      roomId: selectedRoomId,
      number: Number(boxNumber),
      status: "Hazırlanıyor",
    };
    setBoxes([...boxes, newBox]);
    setSelectedRoomId("");
    setBoxNumber("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kutular</h1>
        <p className="text-muted-foreground">
          Taşınma kutularını buradan yönetebilirsin.
        </p>
      </div>

      <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="room" className="text-sm font-medium">
            Oda
          </label>

          <select
            id="room"
            required
            value={selectedRoomId}
            onChange={(e) => setSelectedRoomId(e.target.value)}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            disabled={rooms.length === 0}
          >
            <option value="">
              {rooms.length === 0 ? "Önce bir oda oluşturmalısın" : "Oda seç"}
            </option>

            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="box-number" className="text-sm font-medium">
            Kutu Numarası
          </label>

          <Input
            id="box-number"
            type="number"
            min="1"
            required
            placeholder="Örneğin: 1"
            value={boxNumber}
            onChange={(e) => setBoxNumber(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={rooms.length === 0}>
          Kutu Ekle
        </Button>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Kayıtlı Kutular ({boxes.length})
        </h2>

        {boxes.length === 0 ? (
          <p className="text-muted-foreground">Henüz kutu eklenmedi.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {boxes.map((box) => {
              const room = rooms.find(
                (room) => String(room.id) === String(box.roomId),
              );

              return (
                <div key={box.id} className="rounded-lg border p-4">
                  <h3 className="font-semibold">Kutu #{box.number}</h3>

                  <p className="text-sm text-muted-foreground">
                    Oda: {room ? room.name : "Oda bulunamadı"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Durum: {box.status}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BoxesPage;
