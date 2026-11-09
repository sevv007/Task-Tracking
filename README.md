# Task-Tracking

Görevlerinizi ve notlarınızı tek bir arayüz üzerinden kolayca
yönetmenizi sağlayan React tabanlı bir uygulamadır. Uygulama; görev
takibi, takvim görünümü, not yönetimi ve tamamlanan işlere ilişkin
ilerleme istatistiklerini bir araya getirir.

## ✨ Özellikler

-   **Kontrol Paneli:** Günlük görevleri, özet bilgileri ve son notları
    görüntüleme.
-   **Görevler:** Görev oluşturma, düzenleme, tamamlama, yıldızlama,
    arşivleme, silme, arama, filtreleme ve sıralama.
-   **Kategoriler:** Görevleri kategorilerine göre görüntüleme. Kategori
    tanımları `src/data/categories.js` dosyasında tutulur.
-   **Takvim:** Görevleri takvim üzerinde görüntüleme ve tarihe göre
    takip etme.
-   **Notlar:** Not oluşturma ve düzenleme; notları kategori, renk,
    yıldız ve arşiv durumuna göre düzenleme.
-   **İlerleme:** Tamamlanan görev sayısı, devam eden görev sayısı,
    tamamlanma oranı ve son yedi güne ait görev tamamlama grafiği.
-   **Duyarlı Arayüz:** Hamburger menü üzerinden açılıp kapanabilen
    kenar menüsü ve mobil cihazlara uyumlu tasarım.
-   **Açık/Koyu Tema:** Kullanıcının tercihine göre arayüz temasını
    değiştirme.
-   **Tarayıcıda Veri Saklama:** Görevler, notlar ve tema tercihleri
    `localStorage` kullanılarak saklanır.
-   **Türkçe Arayüz:** Kullanıcıya gösterilen başlıklar, menüler ve
    kontroller Türkçe olarak hazırlanmıştır.

## 🛠️ Kullanılan Teknolojiler

-   **React:** Kullanıcı arayüzü geliştirme.
-   **Tailwind CSS:** Stil ve duyarlı tasarım.
-   **Lucide React:** İkon kullanımı.
-   **JavaScript:** Uygulama mantığı ve etkileşimler.
-   **LocalStorage API:** Tarayıcı üzerinde veri saklama.
-   **Vite / Create React App:** Proje yapılandırmasına bağlı geliştirme
    ortamı.

## 📦 Kurulum

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları
izleyebilirsiniz.

### 1. Projeyi Klonlayın

``` bash
git clone <repository-url>
```

### 2. Proje Klasörüne Gidin

``` bash
cd Task-Tracking
```

### 3. Bağımlılıkları Yükleyin

``` bash
npm install
```

### 4. Geliştirme Sunucusunu Başlatın

Vite kullanılıyorsa:

``` bash
npm run dev
```

Create React App kullanılıyorsa:

``` bash
npm start
```

### 5. Üretim Derlemesini Oluşturun

Projede ilgili komut tanımlıysa:

``` bash
npm run build
```

Kullanılabilir komutları `package.json` dosyasından kontrol
edebilirsiniz.

## 📁 Proje Yapısı

``` text
Task-Tracking/
├── public/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TasksView.jsx
│   │   ├── NotesView.jsx
│   │   ├── CalendarView.jsx
│   │   ├── ProgressView.jsx
│   │   ├── TaskModal.jsx
│   │   └── NoteModal.jsx
│   ├── data/
│   │   └── categories.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   └── utils/
│       └── helpers.js
├── package.json
└── README.md
```

> **Not:** Yukarıdaki klasör ve dosya yapısı örnek olarak verilmiştir.
> Projenizin gerçek dosya yapısına göre farklılık gösterebilir.

### Dosya ve Klasörlerin Görevleri

-   **App.jsx:** Uygulamanın genel durumunu, sayfa geçişlerini, tema
    ayarlarını ve modal pencerelerini yönetir.
-   **components/:** Kontrol paneli, görevler, notlar, takvim, ilerleme
    ekranları ve modal bileşenlerini içerir.
-   **data/categories.js:** Uygulamada kullanılan kategorilerin
    adlarını, ikonlarını ve renklerini tanımlar.
-   **hooks/useLocalStorage.js:** React durumunu tarayıcının
    `localStorage` alanıyla senkronize eder.
-   **utils/helpers.js:** Tarih ve saat biçimlendirme, filtreleme ve
    benzeri yardımcı fonksiyonları içerir.

## 🚀 Kullanım

1.  Uygulamayı başlattıktan sonra kontrol paneli üzerinden günlük
    görevlerinizi ve son notlarınızı görüntüleyebilirsiniz.
2.  Sol üst köşedeki hamburger menüsüne tıklayarak kenar menüsünü açıp
    kapatabilirsiniz.
3.  **Kontrol Paneli, Görevler, Notlar, Takvim ve İlerleme** sayfaları
    arasında geçiş yapabilirsiniz.
4.  Görevler sayfasındaki **Yeni Görev** butonunu kullanarak görev
    oluşturabilirsiniz.
5.  Notlar sayfasındaki **Yeni Not** butonuyla not oluşturabilir,
    kategori ve renk seçebilirsiniz.
6.  Görev veya not kartlarındaki üç nokta menüsünden ilgili işlemleri
    gerçekleştirebilirsiniz.
7.  Navbar üzerindeki tema düğmesiyle açık ve koyu mod arasında geçiş
    yapabilirsiniz.

### Klavye Kısayolları

  Kısayol    İşlev
  ---------- ---------------------------------
  `T`        Yeni görev oluşturma
  `N`        Yeni not oluşturma
  `Escape`   Açık modalı veya menüyü kapatma

**Not:** Metin alanlarında yazı yazarken klavye kısayolları devre dışı
kalır.

## 📊 İlerleme Grafiği

İlerleme ekranı, tamamlanan görevlerin `completedAt` alanını kullanarak
son yedi güne ait görev tamamlama dağılımını hesaplar.

-   Bir görev tamamlandığında tamamlanma tarihi görev kaydına eklenir.
-   Tamamlanan görevlerin günlük dağılımı grafik üzerinde gösterilir.
-   Daha önce tamamlanmış ancak `completedAt` alanı bulunmayan
    görevlerde `updatedAt` değeri yaklaşık tarih olarak kullanılabilir.

Bu nedenle eski görevlerin grafikte gösterilen günü, gerçek tamamlanma
tarihiyle tam olarak örtüşmeyebilir.

## 💾 Verilerin Saklanması

Uygulama, verileri tarayıcının `localStorage` alanında saklar.

Saklanan veriler:

-   Görevler
-   Notlar
-   Tema tercihleri

Bu sayede uygulama yenilendiğinde kullanıcı verileri korunur. Ancak
tarayıcı verilerinin temizlenmesi durumunda saklanan bilgiler
silinebilir.

**Önemli:** Önemli görev ve notlarınızı kaybetmemek için tarayıcı
verilerinizi temizlemeden önce yedeklemeniz önerilir.

## 🎨 Arayüz ve Tasarım

Uygulama, kullanıcı deneyimini ön planda tutan sade ve modern bir arayüz
anlayışıyla geliştirilmiştir.

-   Açık ve koyu tema desteği.
-   Mobil ve masaüstü uyumlu tasarım.
-   Kolay erişilebilir navigasyon menüsü.
-   Görev ve notlar için düzenli kart yapısı.
-   İlerlemeyi takip etmeyi kolaylaştıran grafikler.

------------------------------------------------------------------------

## Görsel

<img width="1669" height="1028" alt="Screenshot_8" src="https://github.com/user-attachments/assets/b56c7279-a391-49ba-9f24-747116833099" />

**Task-Tracking** -- Görevlerinizi düzenleyin, notlarınızı yönetin ve
ilerlemenizi takip edin.
