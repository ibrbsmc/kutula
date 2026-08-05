import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import EmptyState from "@/components/EmptyState";

const STATUS_STYLES = {
  Hazırlanıyor: "bg-amber-100/90 text-amber-800",
  "Taşınmaya Hazır": "bg-sky-100/90 text-sky-800",
  Taşındı: "bg-emerald-100/90 text-emerald-800",
  Açıldı: "bg-slate-200/90 text-slate-700",
};

function StatCard({ label, value, icon, imageClassName }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-5 pt-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#E7B18F] to-[#E08149]" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p className="text-3xl font-bold text-[#3B2A22]">{value}</p>
        </div>

        <div className="flex size-16 shrink-0 items-center justify-center">
          <img
            src={icon}
            alt=""
            className={`max-h-full max-w-full object-contain ${imageClassName ?? ""}`}
          />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, to }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-[#3B2A22]">{title}</h2>

      <Link
        to={to}
        className="flex items-center gap-1 text-sm font-medium text-[#E08149] hover:text-[#C96E39]"
      >
        Tümünü Gör
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function PreviewCard({ image, fallbackIcon, fallbackIconClassName, title, subtitle, badge }) {
  return (
    <div className="group relative h-32 overflow-hidden rounded-2xl shadow-sm transition hover:shadow-md">
      {image ? (
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
          <img
            src={fallbackIcon}
            alt=""
            className={`size-10 object-contain opacity-80 ${fallbackIconClassName ?? ""}`}
          />
        </div>
      )}

      {badge && <div className="absolute right-2 top-2">{badge}</div>}

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/25 to-transparent p-2.5 pt-6">
        <p className="truncate text-sm font-semibold text-white">{title}</p>
        <p className="truncate text-xs text-white/85">{subtitle}</p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const rooms = JSON.parse(localStorage.getItem("kutula-rooms") || "[]");
  const boxes = JSON.parse(localStorage.getItem("kutula-boxes") || "[]");
  const items = JSON.parse(localStorage.getItem("kutula-items") || "[]");

  const totalItemCount = items.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0,
  );

  const recentRooms = [...rooms].slice(-3).reverse();
  const recentBoxes = [...boxes].slice(-3).reverse();
  const recentItems = [...items].slice(-3).reverse();

  // Not: Paketleme ilerlemesi şu an için sabit (placeholder) bir değerdir.
  // İleride kutu durumlarına (örn. "Taşındı" olan kutu oranı) bağlanabilir.
  const packingProgress = 0;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3B2A22]">Hoş geldiniz!</h1>
        <p className="text-muted-foreground">
          Taşınma sürecini buradan takip edebilirsin.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Toplam Oda" value={rooms.length} icon="/house.png" />
        <StatCard
          label="Toplam Kutu"
          value={boxes.length}
          icon="/boxes.png"
          imageClassName="scale-125"
        />
        <StatCard
          label="Toplam Eşya"
          value={totalItemCount}
          icon="/items.png"
        />
      </div>

      <div className="relative mb-6 flex flex-col gap-6 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative z-10 flex items-center gap-5">
          <div
            className="relative flex size-28 shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#E08149 ${packingProgress * 3.6}deg, #F3D9C4 0deg)`,
            }}
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-white">
              <span className="text-2xl font-bold text-[#3B2A22]">
                %{packingProgress}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-[#3B2A22]">
                Paketleme İlerlemesi
              </h2>

              <span className="rounded-full bg-[#FCF5ED] px-2 py-0.5 text-xs font-medium text-[#BF5223]">
                Yakında
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              Bu bölüm yakında kutu durumlarına göre otomatik hesaplanacak.
            </p>
          </div>
        </div>

        <img
          src="/bus.png"
          alt=""
          className="pointer-events-none relative right-0 bottom-0 z-10 h-32 w-auto self-end object-contain drop-shadow-xl sm:absolute sm:-right-6 sm:-bottom-8 sm:h-56"
        />
      </div>

      <div className="space-y-3">
        <SectionHeader title="Odalarınız" to="/odalar" />

        {recentRooms.length === 0 ? (
          <EmptyState
            icon="/house.png"
            message="Henüz oda eklenmedi."
            actionTo="/odalar"
            actionLabel="Oda ekle"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentRooms.map((room) => {
              const boxCount = boxes.filter(
                (box) => String(box.roomId) === String(room.id),
              ).length;

              const itemCount = items.reduce((total, item) => {
                const box = boxes.find(
                  (box) => String(box.id) === String(item.boxId),
                );

                if (!box || String(box.roomId) !== String(room.id)) {
                  return total;
                }

                return total + (item.quantity ?? 1);
              }, 0);

              return (
                <PreviewCard
                  key={room.id}
                  image={room.image}
                  fallbackIcon="/house.png"
                  title={room.name}
                  subtitle={`${boxCount} Kutu · ${itemCount} Eşya`}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <SectionHeader title="Kutularınız" to="/kutular" />

        {recentBoxes.length === 0 ? (
          <EmptyState
            icon="/boxes.png"
            iconClassName="scale-125"
            message="Henüz kutu eklenmedi."
            actionTo="/kutular"
            actionLabel="Kutu ekle"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentBoxes.map((box) => {
              const room = rooms.find(
                (room) => String(room.id) === String(box.roomId),
              );

              return (
                <PreviewCard
                  key={box.id}
                  fallbackIcon="/favicon.png"
                  fallbackIconClassName="scale-125"
                  title={`Kutu #${box.number}`}
                  subtitle={room ? room.name : "Oda bulunamadı"}
                  badge={
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur ${
                        STATUS_STYLES[box.status] ??
                        "bg-slate-200/90 text-slate-700"
                      }`}
                    >
                      {box.status}
                    </span>
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <SectionHeader title="Eşyalarınız" to="/esyalar" />

        {recentItems.length === 0 ? (
          <EmptyState
            icon="/items.png"
            message="Henüz eşya eklenmedi."
            actionTo="/esyalar"
            actionLabel="Eşya ekle"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentItems.map((item) => {
              const box = boxes.find(
                (box) => String(box.id) === String(item.boxId),
              );

              const room = rooms.find(
                (room) => String(room.id) === String(box?.roomId),
              );

              const location = box
                ? `${room ? room.name : "Oda bulunamadı"} · Kutu ${box.number}`
                : "Kutu bulunamadı";

              return (
                <PreviewCard
                  key={item.id}
                  image={item.image}
                  fallbackIcon="/items.png"
                  title={item.name}
                  subtitle={location}
                  badge={
                    <span className="shrink-0 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[#3B2A22] shadow-sm backdrop-blur">
                      {item.quantity ?? 1} adet
                    </span>
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
