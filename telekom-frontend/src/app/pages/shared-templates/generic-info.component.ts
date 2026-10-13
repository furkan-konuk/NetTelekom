import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-info',
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
        @switch (pageId) {
          
          @case ('bilgiler') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div class="flex items-center gap-6 mb-8">
                <div class="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-black">
                  AT
                </div>
                <div>
                  <h3 class="text-xl font-bold text-slate-800">Ahmet Yılmaz</h3>
                  <p class="text-sm text-slate-500">Bireysel Müşteri</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1.5 uppercase">T.C. Kimlik No</label>
                  <input type="text" disabled value="12345678901" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-mono">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Doğum Tarihi</label>
                  <input type="text" disabled value="15.08.1990" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-mono">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1.5 uppercase">E-Posta Adresi</label>
                  <input type="email" value="ahmet.yilmaz@email.com" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-net-accent">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1.5 uppercase">İletişim Numarası</label>
                  <input type="tel" value="0555 123 45 67" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-net-accent">
                </div>
              </div>
              
              <button class="mt-8 bg-net-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors">Bilgilerimi Güncelle</button>
            </div>
          }

          @case ('sifre') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg shadow-sm">
              <h3 class="text-lg font-bold text-slate-800 mb-2">Şifre Değiştirme</h3>
              <p class="text-sm text-slate-500 mb-6">Hesap güvenliğiniz için şifrenizi düzenli olarak güncelleyin.</p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">Mevcut Şifreniz</label>
                  <input type="password" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">Yeni Şifre</label>
                  <input type="password" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-1.5">Yeni Şifre (Tekrar)</label>
                  <input type="password" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                </div>
                <button class="w-full bg-net-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors mt-4">Şifreyi Güncelle</button>
              </div>
            </div>
          }

          @case ('ayarlar') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl shadow-sm">
              <h3 class="text-lg font-bold text-slate-800 mb-6">Genel Uygulama Ayarları</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">Karanlık Mod (Dark Mode)</h4>
                    <p class="text-xs text-slate-500 mt-1">Uygulamayı göz yormayan karanlık temada kullanın.</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-net-accent"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between p-5 border border-slate-100 hover:bg-slate-50 transition-colors rounded-xl">
                  <div>
                    <h4 class="font-bold text-slate-800">Dil Seçeneği</h4>
                    <p class="text-xs text-slate-500 mt-1">Uygulama arayüz dilini değiştirin.</p>
                  </div>
                  <select class="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold focus:outline-none focus:border-net-accent">
                    <option>Türkçe</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </div>
          }

          @case ('hat') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl shadow-sm">
              <h3 class="text-lg font-bold text-slate-800 mb-6">Hat ve SIM Bilgileri</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hat Numarası</div>
                  <div class="text-xl font-black text-slate-800 font-mono">0555 123 45 67</div>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hat Tipi</div>
                  <div class="text-xl font-black text-slate-800">Bireysel Faturasız</div>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 col-span-2 flex items-center justify-between">
                  <div>
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SIM Kart ICCID Numarası</div>
                    <div class="text-lg font-black text-slate-800 font-mono">8990 1234 5678 9012 345</div>
                  </div>
                  <button class="text-net-primary hover:text-net-accent p-2">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" /></svg>
                  </button>
                </div>
              </div>
            </div>
          }

          @case ('puk') {
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-2xl text-white shadow-xl">
              <div class="flex items-center gap-4 mb-8 border-b border-slate-700 pb-6">
                <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-cyan-400">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold">PUK Bilgileri</h3>
                  <p class="text-slate-400 text-sm">SIM kartınız kilitlendiğinde bu kodları kullanın.</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden group">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">PUK 1 KODU</div>
                  <div class="text-3xl font-mono font-black tracking-widest" [class.blur-md]="!showPuk1()">{{ puk1 }}</div>
                  <button (click)="showPuk1.set(!showPuk1())" class="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <span class="bg-slate-800 px-4 py-2 rounded-full text-xs font-bold text-cyan-400">Göster / Gizle</span>
                  </button>
                </div>

                <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden group">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">PUK 2 KODU</div>
                  <div class="text-3xl font-mono font-black tracking-widest" [class.blur-md]="!showPuk2()">{{ puk2 }}</div>
                  <button (click)="showPuk2.set(!showPuk2())" class="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <span class="bg-slate-800 px-4 py-2 rounded-full text-xs font-bold text-cyan-400">Göster / Gizle</span>
                  </button>
                </div>
              </div>
            </div>
          }

          @case ('sozlesme') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-3xl shadow-sm">
              <h3 class="text-xl font-bold text-slate-800 mb-6">Form ve Sözleşmeler</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="text-red-500">
                      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-800">Abonelik Sözleşmesi</h4>
                      <p class="text-xs text-slate-500">12.01.2025 Tarihli - 254 KB</p>
                    </div>
                  </div>
                  <button class="text-net-accent font-bold text-sm hover:underline">PDF İndir</button>
                </div>
                <div class="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <div class="text-red-500">
                      <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                    </div>
                    <div>
                      <h4 class="font-bold text-slate-800">KVKK Aydınlatma Metni</h4>
                      <p class="text-xs text-slate-500">12.01.2025 Tarihli - 120 KB</p>
                    </div>
                  </div>
                  <button class="text-net-accent font-bold text-sm hover:underline">PDF İndir</button>
                </div>
              </div>
            </div>
          }

          @case ('iletisim') {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 max-w-4xl shadow-sm">
              <h3 class="text-xl font-bold text-slate-800 mb-6">Bize Ulaşın</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-bold text-slate-800 mb-4">Mesaj Gönderin</h4>
                  <div class="space-y-4">
                    <input type="text" placeholder="Konu" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent">
                    <textarea rows="4" placeholder="Mesajınız" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-net-accent"></textarea>
                    <button class="w-full bg-net-primary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">Gönder</button>
                  </div>
                </div>
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.055.902-.417 1.173l-1.293.97a17.14 17.14 0 006.72 6.72l.97-1.293c.271-.362.733-.527 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" /></svg>
                    </div>
                    <div>
                      <h5 class="font-bold text-slate-800">Müşteri Hizmetleri</h5>
                      <p class="text-lg font-black text-net-primary">444 1 444</p>
                      <p class="text-xs text-slate-500 mt-1">7/24 Kesintisiz Hizmet</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    </div>
                    <div>
                      <h5 class="font-bold text-slate-800">Genel Müdürlük</h5>
                      <p class="text-sm text-slate-600 mt-1">Esentepe Mah. Büyükdere Cad. No:199<br>Şişli / İstanbul</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          @default {
            <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm text-center">
              <div class="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-6">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
              </div>
              <h2 class="text-2xl font-bold text-slate-800 mb-4">{{ pageTitle }} Hakkında</h2>
              <p class="text-slate-600 max-w-lg mx-auto">
                {{ pageTitle }} detaylarına bu sayfadan ulaşabilirsiniz.
              </p>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class GenericInfoComponent implements OnInit {
  pageTitle: string = 'Bilgi Ekranı';
  categoryName: string = 'Kategori';
  pageId: string = '';

  // Signals for PUK
  showPuk1 = signal(false);
  showPuk2 = signal(false);
  puk1 = '48291054';
  puk2 = '85923102';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.pageTitle = data['title'];
      if (data['category']) this.categoryName = data['category'];
      if (data['pageId']) this.pageId = data['pageId'];
    });
  }
}
