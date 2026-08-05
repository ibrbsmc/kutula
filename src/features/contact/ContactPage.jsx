import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Mail, MessageCircle, Send, Sparkles } from "lucide-react";

// TODO: Web3Forms hesabından aldığın Access Key'i buraya yapıştır.
// Ücretsiz key almak için: https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "BURAYA_WEB3FORMS_ACCESS_KEY_YAZ";

const infoItems = [
  {
    icon: Mail,
    title: "E-posta",
    description: "Mesajın doğrudan ekibimize ulaşır.",
  },
  {
    icon: Clock,
    title: "Yanıt Süresi",
    description: "Genellikle 1-2 iş günü içinde dönüş yaparız.",
  },
  {
    icon: MessageCircle,
    title: "Her Konuda",
    description: "Öneri, hata bildirimi veya soruların için buradayız.",
  },
];

function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: subject
            ? `Kutula - ${subject}`
            : "Kutula - Yeni İletişim Mesajı",
          name: `${firstName} ${lastName}`.trim(),
          email,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Mesajın gönderildi, teşekkürler!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Mesaj gönderilemedi, lütfen tekrar dene.");
      }
    } catch {
      toast.error("Bir şeyler ters gitti, lütfen tekrar dene.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3B2A22]">İletişim</h1>

        <p className="text-muted-foreground">
          Soruların, önerilerin veya geri bildirimlerin için bize ulaş.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border shadow-sm md:grid-cols-[320px_1fr]">
        <div className="relative flex flex-col justify-between gap-8 bg-linear-to-br from-[#E08149] via-[#D97847] to-[#BF5223] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -top-8 -right-8 size-40 rounded-full bg-white/10" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="size-3.5" />
              Bize Ulaş
            </span>

            <h2 className="mt-4 text-xl font-bold sm:text-2xl">
              Aklına takılan bir şey mi var?
            </h2>

            <p className="mt-2 text-sm text-white/85">
              Formu doldur, en kısa sürede dönüş yapalım.
            </p>
          </div>

          <div className="relative z-10 space-y-5">
            {infoItems.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                  <item.icon className="size-4.5" />
                </div>

                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-first-name" className="text-sm font-medium">
                Ad
              </label>

              <Input
                id="contact-first-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Adın"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-last-name" className="text-sm font-medium">
                Soyad
              </label>

              <Input
                id="contact-last-name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Soyadın"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">
                E-posta
              </label>

              <Input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-sm font-medium">
                Konu{" "}
                <span className="font-normal text-xs text-muted-foreground">
                  (Opsiyonel)
                </span>
              </label>

              <Input
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Mesajının konusu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium">
              Mesaj
            </label>

            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajını buraya yaz..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-2 bg-[#E08149] text-white hover:bg-[#C96E39] sm:w-auto"
          >
            <Send className="size-4" />
            {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
