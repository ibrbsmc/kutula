import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Pie, PieChart } from "recharts";
import EmptyState from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BOX_STATUS_OPTIONS,
  BOX_STATUS_RING_COLORS,
  BOX_STATUS_DOT_STYLES,
} from "@/lib/boxStatus";

// Kartın turuncu gradyanlı görsel alanı üzerinde okunabilir olması için
// paylaşılan rozet renklerine hafif saydamlık eklenmiş hali kullanılıyor.
const STATUS_BADGE_OVERLAY_STYLES = {
  Hazırlanıyor: "bg-amber-100/90 text-amber-800",
  "Taşınmaya Hazır": "bg-sky-100/90 text-sky-800",
  Taşındı: "bg-emerald-100/90 text-emerald-800",
};

function StatCard({ label, value, icon, imageClassName }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-5 pt-6 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#E7B18F] to-[#E08149]" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
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

function PreviewCard({
  image,
  fallbackIcon,
  fallbackIconClassName,
  title,
  subtitle,
  badge,
}) {
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

  const totalBoxes = boxes.length;

  const statusBreakdown = BOX_STATUS_OPTIONS.map((status) => ({
    status,
    count: boxes.filter((box) => box.status === status).length,
  }));

  const movedCount = boxes.filter((box) => box.status === "Taşındı").length;
  const completedPercentage =
    totalBoxes === 0 ? 0 : Math.round((movedCount / totalBoxes) * 100);

  const chartData = statusBreakdown
    .filter((item) => item.count > 0)
    .map((item) => ({
      status: item.status,
      count: item.count,
      fill: BOX_STATUS_RING_COLORS[item.status],
    }));

  const chartConfig = BOX_STATUS_OPTIONS.reduce((config, status) => {
    config[status] = { label: status, color: BOX_STATUS_RING_COLORS[status] };
    return config;
  }, {});

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3B2A22]">Hoş geldiniz!</h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Toplam Oda" value={rooms.length} icon="/house.png" />
        <StatCard
          label="Toplam Kutu"
          value={boxes.length}
          icon="/boxes.png"
          imageClassName="scale-135"
        />
        <StatCard
          label="Toplam Eşya"
          value={totalItemCount}
          icon="/items.png"
        />
      </div>

      <div className="relative mb-6 rounded-2xl border bg-white shadow-sm">
        <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between sm:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            {totalBoxes === 0 ? (
              <div className="flex size-40 shrink-0 items-center justify-center rounded-full bg-[#F3D9C4]/40">
                <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold text-[#3B2A22]">%0</span>
                  <span className="text-sm text-muted-foreground">
                    Tamamlandı
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative size-40 shrink-0">
                <ChartContainer config={chartConfig} className="size-40">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />

                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={80}
                      strokeWidth={4}
                      stroke="var(--card, #fff)"
                      paddingAngle={chartData.length > 1 ? 3 : 0}
                    />
                  </PieChart>
                </ChartContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-[#3B2A22]">
                    %{completedPercentage}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Tamamlandı
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center sm:items-start">
              <h2 className="text-xl font-semibold text-[#3B2A22]">
                Paketleme İlerlemesi
              </h2>

              <p className="text-sm text-muted-foreground">
                {totalBoxes === 0
                  ? "Henüz kutu eklenmedi."
                  : "Kutularının durumlarına göre dağılımı."}
              </p>

              {totalBoxes > 0 && (
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-start">
                  {statusBreakdown.map(({ status, count }) => (
                    <span
                      key={status}
                      className="flex items-center gap-1.5 text-sm text-[#3B2A22]"
                    >
                      <span
                        className={`size-2.5 rounded-full ${BOX_STATUS_DOT_STYLES[status]}`}
                      />
                      {status}
                      <span className="text-muted-foreground">({count})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Otobüs görseli kartın dışına taşacağı için burada sadece
              layoutta yer kaplayan görünmez bir boşluk bırakılıyor. */}
          <div className="hidden sm:block sm:w-28 lg:w-36" />
        </div>

        <img
          src="/bus.png"
          alt=""
          className="pointer-events-none absolute top-2/3 -right-12 hidden h-44 w-auto -translate-y-1/2 object-contain drop-shadow-xl sm:block lg:-right-2 lg:h-64 -"
        />
      </div>

      <div className="space-y-3">
        <SectionHeader title="Odalarınız" to="/odalar" />

        {recentRooms.length === 0 ? (
          <EmptyState
            icon="/empty_room.png"
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
            icon="/empty_box.png"
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
                  fallbackIcon="/boxes.png"
                  fallbackIconClassName="scale-135"
                  title={`Kutu #${box.number}`}
                  subtitle={room ? room.name : "Oda bulunamadı"}
                  badge={
                    <Badge
                      className={`shadow-sm backdrop-blur ${
                        STATUS_BADGE_OVERLAY_STYLES[box.status] ??
                        "bg-slate-200/90 text-slate-700"
                      }`}
                    >
                      {box.status}
                    </Badge>
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
            icon="/empty_items.png"
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
                    <Badge className="bg-white/90 text-[#3B2A22] shadow-sm backdrop-blur">
                      {item.quantity ?? 1} adet
                    </Badge>
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
