import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-settings',
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

      <div class="max-w-4xl">
        <div class="mb-8 bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
          <div class="mt-1 text-net-primary">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
          </div>
          <div class="text-slate-700 text-sm leading-relaxed">
            Şu anda <strong class="text-net-primary">{{ pageTitle }}</strong> işlemini yapmaktasınız. Aşağıdaki form ve ayarları kullanarak işlemlerinizi gerçekleştirebilirsiniz.
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          
          <!-- Dinamik İçerik -->
          @switch (pageId) {
            
            @case ('numara') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Yeni Numaranızı Belirleyin</h3>
              <div class="space-y-4 max-w-md">
                <label class="block text-sm font-bold text-slate-700">İstediğiniz Numara (Son 4 Hane)</label>
                <div class="flex gap-2">
                  <input type="text" value="0555 *** " disabled class="w-1/2 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 font-mono text-center">
                  <input type="text" maxlength="4" placeholder="XXXX" class="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent font-mono text-center tracking-widest text-lg">
                </div>
                <button class="w-full bg-net-primary text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors mt-2">Uygunluğu Kontrol Et</button>
              </div>
            }

            @case ('devir') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Devralacak Kişinin Bilgileri</h3>
              <div class="space-y-5 max-w-lg">
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">T.C. Kimlik Numarası</label>
                  <input type="text" maxlength="11" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent" placeholder="11 Haneli TC Kimlik No">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-1.5">Ad</label>
                    <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-1.5">Soyad</label>
                    <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                  </div>
                </div>
                <button class="w-full bg-net-primary text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors mt-4">Devir İşlemini Başlat</button>
              </div>
            }

            @case ('kayip-calinti') {
              <div class="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-lg mx-auto">
                <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <h3 class="text-xl font-bold text-red-700 mb-2">Acil Durum Kapama</h3>
                <p class="text-red-600 text-sm mb-6">Cihazınızın kaybolması veya çalınması durumunda hattınızı derhal giden aramalara kapatabilirsiniz.</p>
                <button class="bg-red-600 text-white font-black px-8 py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors w-full">Hattımı Geçici Olarak Kapat</button>
              </div>
            }

            @case ('esim') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Cihazınız e-SIM Destekliyor mu?</h3>
              <div class="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                <input type="text" placeholder="Cihazınızın IMEI Numarası" class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                <button class="bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-300 transition-colors">Sorgula</button>
              </div>
              <div class="text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl">
                <div class="w-32 h-32 bg-slate-100 mx-auto mb-4 rounded-xl flex items-center justify-center">
                  <span class="text-slate-400 font-bold text-sm">QR KOD<br>ALANI</span>
                </div>
                <button class="bg-net-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors">e-SIM Profilimi Oluştur</button>
              </div>
            }

            @case ('telefon-ayarlari') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Çağrı ve Gizlilik Ayarları</h3>
              <div class="space-y-6">
                <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h4 class="font-bold text-slate-800">Numaramı Gizle</h4>
                    <p class="text-xs text-slate-500">Aramalarınız karşı tarafa "Gizli Numara" olarak görünür.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>

                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 class="font-bold text-slate-800 mb-1">Çağrı Yönlendirme</h4>
                  <p class="text-xs text-slate-500 mb-4">Ulaşılamadığınız durumlarda çağrılarınızı başka bir numaraya yönlendirin.</p>
                  <div class="flex gap-2">
                    <input type="tel" placeholder="Yönlendirilecek Numara" class="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-net-accent">
                    <button class="bg-net-primary text-white font-bold px-6 py-2 rounded-xl hover:bg-slate-800 transition-colors">Kaydet</button>
                  </div>
                </div>
              </div>
            }

            @case ('yurtdisi') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Yurt Dışı (Roaming) Erişimi</h3>
              <div class="flex items-center justify-between p-6 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                <div>
                  <h4 class="font-bold text-slate-800 text-lg">Yurt Dışı Kullanım Durumu</h4>
                  <p class="text-sm text-slate-500">Hattınızı yurt dışındayken kullanıma açın veya kapatın.</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-net-accent"></div>
                </label>
              </div>
              
              <h4 class="font-bold text-slate-800 mb-4">Popüler Yurt Dışı Paketleri</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:border-net-accent cursor-pointer transition-colors">
                  <div>
                    <div class="font-bold text-slate-800">Avrupa Paketi</div>
                    <div class="text-xs text-slate-500">Günlük 250 MB</div>
                  </div>
                  <div class="font-bold text-net-primary text-lg">85 TL</div>
                </div>
                <div class="border border-slate-200 p-4 rounded-xl flex justify-between items-center hover:border-net-accent cursor-pointer transition-colors">
                  <div>
                    <div class="font-bold text-slate-800">Dünya Paketi</div>
                    <div class="text-xs text-slate-500">Haftalık 1 GB</div>
                  </div>
                  <div class="font-bold text-net-primary text-lg">250 TL</div>
                </div>
              </div>
            }

            @case ('iptal') {
              <div class="border-2 border-red-200 bg-red-50 p-8 rounded-2xl max-w-2xl mx-auto text-center">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 class="text-2xl font-black text-red-700 mb-4">Abonelik İptal Talebi</h3>
                <p class="text-red-600 text-sm mb-8 leading-relaxed">
                  Aboneliğinizi iptal etmeniz durumunda numaranız geri alınamaz şekilde silinecek ve varsa kalan paket kullanımlarınız iptal edilecektir. Lütfen iptal nedeninizi seçiniz.
                </p>
                <div class="text-left max-w-sm mx-auto space-y-4">
                  <label class="block text-sm font-bold text-red-800">İptal Nedeni</label>
                  <select class="w-full bg-white border border-red-300 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 text-slate-700">
                    <option>Hizmet kalitesinden memnun değilim</option>
                    <option>Fiyatları yüksek buluyorum</option>
                    <option>Yurt dışına taşınıyorum</option>
                    <option>Başka operatöre geçeceğim</option>
                    <option>Diğer</option>
                  </select>
                  <button class="w-full bg-red-600 text-white font-black px-8 py-4 rounded-xl shadow-lg hover:bg-red-700 transition-colors mt-4">
                    İptal Talebini Onayla
                  </button>
                  <button class="w-full bg-white text-slate-600 font-bold px-8 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    Vazgeç
                  </button>
                </div>
              </div>
            }

            @case ('kayitlar') {
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold text-slate-800">Son İşlem Kayıtları</h3>
                <button class="text-net-accent text-sm font-bold hover:underline">Tümünü İndir (PDF)</button>
              </div>
              <div class="space-y-4">
                <!-- Record 1 -->
                <div class="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800">TL Yükleme İşlemi Başarılı</h4>
                    <p class="text-sm text-slate-500 mt-1">Kredi kartı ile hatta 250 TL yüklendi.</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-slate-800">12 Temmuz 2026</div>
                    <div class="text-xs text-slate-400">14:30</div>
                  </div>
                </div>

                <!-- Record 2 -->
                <div class="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.054-2.066.012a5 5 0 01-3.923-1.42 5 5 0 01-1.42-3.923c.066-.68.072-1.378.012-2.066a5 5 0 011.42-3.923 5 5 0 013.923-1.42c.68.06 1.378.054 2.066-.012a5 5 0 013.923 1.42 5 5 0 011.42 3.923c-.06.688-.054 1.386.012 2.066a5 5 0 01-1.42 3.923 5 5 0 01-3.923 1.42z" /></svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800">Yurt Dışı Ayarları Değiştirildi</h4>
                    <p class="text-sm text-slate-500 mt-1">Hattınız yurt dışı (roaming) kullanımına açıldı.</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-slate-800">5 Temmuz 2026</div>
                    <div class="text-xs text-slate-400">09:15</div>
                  </div>
                </div>
                
                <!-- Record 3 -->
                <div class="flex items-start gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 flex-shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-slate-800">Numara Gizleme Aktif</h4>
                    <p class="text-sm text-slate-500 mt-1">Aramalarınız artık gizli numara olarak yapılacaktır.</p>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-slate-800">1 Temmuz 2026</div>
                    <div class="text-xs text-slate-400">18:45</div>
                  </div>
                </div>
              </div>
            }

            @case ('tercihler') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">İletişim ve Veri Tercihleri</h3>
              <p class="text-sm text-slate-500 mb-8">Kampanyalardan nasıl haberdar olmak istediğinizi ve verilerinizin kullanım amaçlarını yönetebilirsiniz.</p>
              
              <div class="space-y-4">
                <!-- Tercih 1 -->
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">SMS ile Kampanya Bildirimleri</h4>
                    <p class="text-xs text-slate-500 mt-1">Bana özel indirimler ve yeni paketler hakkında SMS almak istiyorum.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
                
                <!-- Tercih 2 -->
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">E-Posta Bülteni</h4>
                    <p class="text-xs text-slate-500 mt-1">Fırsatlar ve duyuruları e-posta adresime gönderilsin.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>

                <!-- Tercih 3 -->
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">Veri İşleme İzni</h4>
                    <p class="text-xs text-slate-500 mt-1">Daha iyi hizmet sunulabilmesi için kullanım alışkanlıklarım analiz edilsin.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
              </div>
            }

            @case ('izin') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">İzin Ayarları</h3>
              <p class="text-sm text-slate-500 mb-8">Uygulama ve hizmetlerin verilerinize erişim izinlerini yönetin.</p>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">Konum Paylaşımı</h4>
                    <p class="text-xs text-slate-500 mt-1">Size en yakın mağazaları ve bölgesel kampanyaları sunabilmemiz için konum bilginizi kullanmamıza izin verin.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">3. Parti Paylaşımı</h4>
                    <p class="text-xs text-slate-500 mt-1">İş ortaklarımızla özel fırsatlar için veri paylaşımına izin verin.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
              </div>
            }

            @case ('bilgi') {
              <h3 class="text-lg font-bold text-slate-800 mb-6">Bilgilendirme Mesajları</h3>
              <p class="text-sm text-slate-500 mb-8">Kullanımlarınız ve faturalarınız hakkında nasıl bilgilendirilmek istediğinizi seçin.</p>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">%80 Kota Uyarısı</h4>
                    <p class="text-xs text-slate-500 mt-1">İnternet, dakika veya SMS paketlerinizin %80'i dolduğunda kısa mesaj (SMS) alın.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>

                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">E-Fatura Gönderimi</h4>
                    <p class="text-xs text-slate-500 mt-1">Faturalarınız kesildiğinde detayları e-posta adresinize gönderilsin.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
              </div>
            }

            @default {
              <!-- Genel Toggle Şablonu (Diğer sayfalar için) -->
              <h3 class="text-lg font-bold text-slate-800 mb-6">Tercihler</h3>
            }
          }

        </div>
      </div>
    </div>
  `
})
export class GenericSettingsComponent implements OnInit {
  pageTitle: string = 'Ayarlar';
  categoryName: string = 'Kategori';
  pageId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.pageTitle = data['title'];
      if (data['category']) this.categoryName = data['category'];
      if (data['pageId']) this.pageId = data['pageId'];
    });
  }
}
