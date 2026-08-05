// Kutu durumlarıyla ilgili tüm sabitler burada toplanır.
// Böylece durum listesi veya renkleri değiştiğinde tek yer güncellenir.

export const BOX_STATUS_OPTIONS = [
  "Hazırlanıyor",
  "Taşınmaya Hazır",
  "Taşındı",
];

export const BOX_STATUS_BADGE_STYLES = {
  Hazırlanıyor: "bg-amber-100 text-amber-800",
  "Taşınmaya Hazır": "bg-sky-100 text-sky-800",
  Taşındı: "bg-emerald-100 text-emerald-800",
};

export const BOX_STATUS_RING_COLORS = {
  Hazırlanıyor: "#f59e0b",
  "Taşınmaya Hazır": "#0ea5e9",
  Taşındı: "#10b981",
};

export const BOX_STATUS_DOT_STYLES = {
  Hazırlanıyor: "bg-amber-500",
  "Taşınmaya Hazır": "bg-sky-500",
  Taşındı: "bg-emerald-500",
};
