// Native <select> elemanları için paylaşılan stiller.
// Form içindeki select'ler devre dışı bırakılabildiği için ekstra
// disabled stiline sahip; filtre select'leri asla devre dışı kalmaz.

export const selectClassName =
  "h-8 w-full truncate rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export const formSelectClassName = `${selectClassName} disabled:cursor-not-allowed disabled:opacity-50`;
