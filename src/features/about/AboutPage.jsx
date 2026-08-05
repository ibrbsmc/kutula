import { Link } from "react-router";
import {
  ArrowRight,
  Layers,
  Lock,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: "/house.png",
    title: "Odalarını Oluştur",
    description:
      "Taşınacağın evdeki her oda için bir kayıt aç, istersen odanın fotoğrafını da ekleyerek başla.",
  },
  {
    icon: "/boxes.png",
    iconClassName: "scale-135",
    title: "Kutularını Ekle",
    description:
      "Her kutuyu ait olduğu odaya bağla, numarasını gir ve durumunu adım adım güncel tut.",
  },
  {
    icon: "/items.png",
    title: "Kutularına Eşya Ekle",
    description:
      "Kutu kartına tıkla, açılan pencerede eşyaları görüntüle, ekle ve düzenle.",
  },
];

const features = [
  {
    icon: MousePointerClick,
    title: "Kutuya Tıkla, Eşyaları Yönet",
    description:
      "Kutular sayfasında bir kutu kartına tıklamak yeter, eşyalarını anında görür ve düzenlersin.",
  },
  {
    icon: Search,
    title: "Anında Bul",
    description:
      "Eşya, kutu ve oda arasındaki bağlantıyı tek ekrandan gör, hiçbir şeyi arama.",
  },
  {
    icon: Layers,
    title: "Tek Ekrandan Yönet",
    description:
      "Odalar, kutular ve eşyalar birbirine bağlı, birini güncellersin diğerleri senkron kalır.",
  },
  {
    icon: ShieldCheck,
    title: "Kırılabilir & Değerli Takibi",
    description:
      "Hassas eşyalarını işaretle, taşırken hangi kutuya özen göstermen gerektiğini unutma.",
  },
  {
    icon: Lock,
    title: "Verin Sende Kalır",
    description:
      "Tüm bilgilerin yalnızca kendi tarayıcında saklanır, hiçbir sunucuya gönderilmez.",
  },
];

function AboutPage() {
  return (
    <section className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#E08149] via-[#D97847] to-[#BF5223] p-8 text-white sm:p-12">
        <div className="pointer-events-none absolute -top-10 -right-10 size-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 right-24 size-40 rounded-full bg-white/10" />

        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="size-3.5" />
            Kutula Nedir?
          </span>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            Taşınma kaosuna son. Her şey, tek bir yerde.
          </h1>

          <p className="mt-4 text-white/90">
            Kutula, taşınırken odalarını, kutularını ve eşyalarını birbirine
            bağlayarak takip etmeni sağlayan bir organizasyon aracı. Hangi
            eşyanın hangi kutuda, hangi kutunun hangi odada olduğunu her an
            bilir, yeni evine hiçbir şey kaybetmeden taşınırsın.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/odalar"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-medium text-[#BF5223] transition hover:bg-white/90"
            >
              Hemen Başla
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-2.5 font-medium text-white transition hover:bg-white/10"
            >
              Sorularını İlet
            </Link>
          </div>
        </div>

        <img
          src="/bus.png"
          alt=""
          className="pointer-events-none absolute -right-2 -bottom-6 hidden h-44 object-contain drop-shadow-xl sm:block sm:h-56"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#3B2A22]">Nasıl Çalışır?</h2>

        <div className="grid items-start gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm sm:p-5"
            >
              <span className="absolute right-4 top-4 text-4xl font-bold text-[#FCF5ED]">
                {index + 1}
              </span>

              <div className="relative flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#F6D4BE] via-[#FCF5ED] to-[#E7B18F]">
                <img
                  src={step.icon}
                  alt=""
                  className={`size-8 object-contain ${step.iconClassName ?? ""}`}
                />
              </div>

              <h3 className="relative mt-3 font-semibold text-[#3B2A22]">
                {step.title}
              </h3>

              <p className="relative mt-1 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#3B2A22]">Neden Kutula?</h2>

        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-3 rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FCF5ED] text-[#E08149]">
                <feature.icon className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-[#3B2A22]">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
