# Kutula

Taşınma sürecinde odaları, kutuları ve eşyaları takip etmek için bir web uygulaması.

## Özellikler

- **Odalar**: oda kaydı oluşturma, düzenleme, silme
- **Kutular**: her kutu bir odaya bağlanır, durum takibi yapılır (Hazırlanıyor, Taşınmaya Hazır, Taşındı); kutu kartına tıklayınca açılan pencereden o kutudaki eşyalar görüntülenir, eklenir ve düzenlenir
- **Eşyalar**: her eşya bir kutuya bağlanır; opsiyonel görsel, kırılabilir/değerli işaretleme, arama ve filtreleme
- **Ana sayfa**: toplam oda/kutu/eşya sayıları, kutu durumlarına göre paketleme ilerlemesi, son eklenen kayıtların önizlemesi
- **İletişim**: Web3Forms üzerinden çalışan iletişim formu

## Kullanılan teknolojiler

- React + React Router
- Tailwind CSS
- Base UI (bileşen tabanı) ve shadcn tarzı bileşen yapısı
- Recharts (paketleme ilerlemesi grafiği)
- Web3Forms (iletişim formu gönderimi)

## Kurulum

```bash
npm install
npm run dev
```

## İletişim formu için gerekli ayar

src/features/contact/ContactPage.jsx dosyasında bir WEB3FORMS_ACCESS_KEY değişkeni bulunur. Formun çalışması için bu değerin [web3forms.com](https://web3forms.com) üzerinden alınan geçerli bir access key olması gerekir.

## Klasör yapısı

```
src/
  components/       Paylaşılan arayüz bileşenleri (ui/, layout/)
  features/
    rooms/          Odalar sayfası ve bileşenleri
    boxes/          Kutular sayfası, bileşenleri
    items/          Eşyalar sayfası ve bileşenleri
    dashboard/      Ana sayfa
    about/          Kutula Nedir?
    contact/        İletişim sayfası
  lib/              Paylaşılan yardımcı fonksiyonlar ve sabitler
public/             Statik görseller
```

## Veri saklama

Uygulama üç localStorage anahtarı kullanır: kutula-rooms, kutula-boxes, kutula-items. Bir oda silindiğinde bağlı kutular ve eşyalar da silinir; bir kutu silindiğinde bağlı eşyalar da silinir.
