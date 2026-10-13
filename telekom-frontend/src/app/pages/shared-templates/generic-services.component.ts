import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <!-- Header -->
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">{{ pageTitle }}</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">{{ categoryName }}</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">{{ pageTitle }}</span>
        </div>
      </div>

      <div class="max-w-6xl">
        <!-- Dinamik İçerik -->
        @switch (pageId) {
          
          @case ('lirapaylas') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl shadow-sm">
              <h3 class="text-xl font-bold text-slate-800 mb-2">LiraPaylaş</h3>
              <p class="text-sm text-slate-500 mb-8">Sevdiklerinize anında TL gönderin. Gönderilen TL faturanıza yansıtılacaktır.</p>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">Gönderilecek Numara</label>
                  <input type="tel" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent" placeholder="05XX XXX XX XX">
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">Gönderilecek Tutar</label>
                  <select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                    <option>50 TL</option>
                    <option>100 TL</option>
                    <option>250 TL</option>
                  </select>
                </div>
                <button class="w-full bg-net-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                  Lira Gönder
                </button>
                <p class="text-xs text-slate-400 text-center">İşlem ücreti vergiler dahil 5.99 TL'dir.</p>
              </div>
            </div>
          }

          @case ('hediye-net') {
            <div class="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-8 max-w-3xl text-white shadow-xl relative overflow-hidden">
              <div class="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
              <h3 class="text-2xl font-black mb-2 relative z-10">Hediye İnternet</h3>
              <p class="text-cyan-100 text-sm mb-8 relative z-10">Başkalarına internet hediye edin, bağlantıyı koparmayın.</p>
              
              <div class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-xs font-bold text-cyan-200 mb-1.5 uppercase">Numara</label>
                    <input type="tel" class="w-full bg-white/20 border border-white/30 text-white placeholder-cyan-200/50 rounded-xl px-4 py-3 focus:outline-none focus:bg-white/30" placeholder="05XX XXX XX XX">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-cyan-200 mb-1.5 uppercase">Paket</label>
                    <select class="w-full bg-white border border-white/30 text-slate-800 rounded-xl px-4 py-3 focus:outline-none">
                      <option>Haftalık 2 GB (40 TL)</option>
                      <option>Haftalık 5 GB (75 TL)</option>
                      <option>Aylık 10 GB (150 TL)</option>
                    </select>
                  </div>
                </div>
                <button class="w-full bg-white text-cyan-800 font-black py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  İnterneti Hediye Et
                </button>
              </div>
            </div>
          }

          @case ('sebeke-ici') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl shadow-sm text-center">
              <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-net-primary" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
              </div>
              <h3 class="text-xl font-bold text-slate-800 mb-2">Şebeke İçi mi?</h3>
              <p class="text-sm text-slate-500 mb-8">Aradığınız numaranın NetTelekom şebekesine ait olup olmadığını kolayca öğrenin.</p>
              
              <div class="flex gap-4 max-w-md mx-auto">
                <input type="tel" class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-mono text-center focus:outline-none focus:border-net-accent" placeholder="05XX XXX XX XX">
                <button class="bg-net-primary text-white font-bold px-8 rounded-xl shadow-md hover:bg-slate-800 transition-colors">Sorgula</button>
              </div>
            </div>
          }

          @case ('rehber') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl shadow-sm">
              <h3 class="text-xl font-bold text-slate-800 mb-6">11855 Bilinmeyen Numaralar</h3>
              <div class="flex items-start justify-between p-6 bg-slate-50 rounded-xl border border-slate-100">
                <div class="max-w-sm">
                  <h4 class="font-bold text-slate-800 text-lg">Rehber Görünürlüğü</h4>
                  <p class="text-sm text-slate-500 mt-2 leading-relaxed">Numaranızın 11855 rehber sorgulamalarında bulunabilmesine izin verin. Kapattığınızda kimse numaranızı rehberden sorgulayamaz.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer mt-1">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-net-accent"></div>
                </label>
              </div>
            </div>
          }

          @case ('arayanibil') {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
              <!-- Ayarlar -->
              <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <h3 class="text-xl font-bold text-slate-800 mb-6">ArayanıBil Servisi</h3>
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                  <div>
                    <h4 class="font-bold text-slate-800">Servis Durumu</h4>
                    <p class="text-xs text-slate-500 mt-1">Aylık ücret: 14.99 TL</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
                <p class="text-sm text-slate-500">Telefonunuz kapalıyken sizi kimlerin aradığını SMS ile öğrenin ve arama kayıtlarını anında görüntüleyin.</p>
              </div>
              
              <!-- Son Çağrılar -->
              <div class="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-net-accent opacity-10 rounded-full blur-3xl"></div>
                <h3 class="text-xl font-bold mb-6 relative z-10">Son Cevapsız Çağrılar</h3>
                <div class="space-y-4 relative z-10">
                  <div class="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div>
                      <div class="font-bold">0532 123 45 67</div>
                      <div class="text-xs text-slate-400">Dün, 14:30 (2 Kez Aradı)</div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-net-accent cursor-pointer hover:bg-slate-700">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.853-1.44-5.284-3.87-6.72-6.72l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                  </div>
                  <div class="flex items-center justify-between border-b border-slate-700 pb-4">
                    <div>
                      <div class="font-bold">0212 999 88 77</div>
                      <div class="text-xs text-slate-400">10 Temmuz, 09:15</div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-net-accent cursor-pointer hover:bg-slate-700">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.853-1.44-5.284-3.87-6.72-6.72l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          @case ('kampanya') {
            <div class="mb-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl max-w-4xl">
              <h3 class="text-lg font-bold text-net-primary mb-2">Size Özel Teklifler</h3>
              <p class="text-sm">Fatura kullanımlarınıza ve tercihlerinize özel olarak hazırladığımız kampanyaları aşağıdan inceleyebilirsiniz.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div class="h-32 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center p-6">
                  <h4 class="text-2xl font-black text-white text-center">Gençlere Özel Sınırsız Sinema</h4>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                  <p class="text-slate-600 text-sm mb-6">Hafta sonları Netflix, Exxen ve BluTV kullanımlarınız kotanızdan düşmez!</p>
                  <button class="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-net-accent hover:text-slate-900 transition-colors">
                    Hemen Katıl
                  </button>
                </div>
              </div>
              <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div class="h-32 bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center p-6">
                  <h4 class="text-2xl font-black text-white text-center">Sosyal Medya Paketi</h4>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                  <p class="text-slate-600 text-sm mb-6">Instagram, Twitter ve YouTube'da geçerli aylık ek 20GB. Sadece 45 TL.</p>
                  <button class="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-net-accent hover:text-slate-900 transition-colors">
                    Satın Al
                  </button>
                </div>
              </div>
            </div>
          }

          @case ('benim') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-4xl shadow-sm">
              <h3 class="text-xl font-bold text-slate-800 mb-6">Aktif Servislerim</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">AB</div>
                    <div>
                      <h4 class="font-bold text-slate-800">ArayanıBil Servisi</h4>
                      <p class="text-xs text-slate-500 mt-1">Aylık 14.99 TL • Otomatik Yenileme: Açık</p>
                    </div>
                  </div>
                  <button class="text-red-500 font-bold text-sm hover:underline">İptal Et</button>
                </div>
                <div class="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-net-accent rounded-lg flex items-center justify-center text-slate-900 font-bold">PB</div>
                    <div>
                      <h4 class="font-bold text-slate-800">Premium Bulut (50GB)</h4>
                      <p class="text-xs text-slate-500 mt-1">Ücretsiz • Paket Kapsamında</p>
                    </div>
                  </div>
                  <button class="text-red-500 font-bold text-sm hover:underline">İptal Et</button>
                </div>
              </div>
            </div>
          }

          @case ('tum') {
            <!-- Orijinal Tüm Servisler Grid Tasarımı (Değişmedi) -->
            <div class="mb-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl">
              <p class="font-bold text-lg mb-2 text-net-primary">{{ pageTitle }} Listesi</p>
              <p class="text-sm">Aşağıdaki servislerden dilediğinizi seçerek detaylı bilgi alabilir veya hemen kullanmaya başlayabilirsiniz.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Card 1 -->
              <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div class="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-200 group-hover:bg-slate-200 transition-colors">
                  <svg class="w-12 h-12 text-net-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-net-primary transition-colors">Premium Bulut</h3>
                  <p class="text-sm text-slate-500 mb-6">Dosyalarınızı güvenle saklayın, her yerden anında erişin. 50GB kapasite ile başlar.</p>
                  <button class="w-full bg-slate-50 text-net-primary font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-net-primary hover:text-white transition-all">İncele</button>
                </div>
              </div>
              <!-- Card 2 -->
              <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div class="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-200 group-hover:bg-slate-200 transition-colors">
                  <svg class="w-12 h-12 text-net-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-net-primary transition-colors">Sınırsız Eğlence</h3>
                  <p class="text-sm text-slate-500 mb-6">Müzik ve video platformlarında geçerli, kotanızdan düşmeyen internet deneyimi.</p>
                  <button class="w-full bg-slate-50 text-net-primary font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-net-primary hover:text-white transition-all">İncele</button>
                </div>
              </div>
              <!-- Card 3 -->
              <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div class="h-32 bg-slate-100 flex items-center justify-center border-b border-slate-200 group-hover:bg-slate-200 transition-colors">
                  <svg class="w-12 h-12 text-net-accent" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
                </div>
                <div class="p-6">
                  <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-net-primary transition-colors">Güvenli Aile</h3>
                  <p class="text-sm text-slate-500 mb-6">Çocuklarınız için internet ortamını zararlı içeriklerden koruyan güvenlik kalkanı.</p>
                  <button class="w-full bg-slate-50 text-net-primary font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-net-primary hover:text-white transition-all">İncele</button>
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class GenericServicesComponent implements OnInit {
  pageTitle: string = 'Servisler';
  categoryName: string = 'Kategori';
  pageId: string = 'tum';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.pageTitle = data['title'];
      if (data['category']) this.categoryName = data['category'];
      if (data['pageId']) this.pageId = data['pageId'];
    });
  }
}
