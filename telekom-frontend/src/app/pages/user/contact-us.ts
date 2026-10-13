import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full max-w-5xl mx-auto p-6">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-black text-slate-800 mb-2">Bize Ulaşın</h1>
        <p class="text-slate-500">Her türlü soru, talep ve şikayetiniz için yanınızdayız.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- İletişim Kanalları -->
        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 rounded-2xl bg-blue-50 text-net-primary flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 mb-1">Müşteri Hizmetleri</h3>
            <p class="text-3xl font-black text-net-primary mb-1">444 1 444</p>
            <p class="text-sm text-slate-500">7/24 Kesintisiz Hizmet</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 mb-1">E-Posta</h3>
            <p class="text-lg font-bold text-slate-600 mb-1">destek&#64;nettelekom.com.tr</p>
            <p class="text-sm text-slate-500">Bize her zaman yazabilirsiniz.</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
          <div class="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h3 class="font-bold text-slate-800 mb-1">Genel Müdürlük</h3>
            <p class="text-sm text-slate-500 leading-relaxed px-4">Nettelekom Plaza, Teknoloji Cad. No:1 Maslak / İstanbul</p>
          </div>
        </div>
      </div>

      <!-- Ortadaki Büyük Buton -->
      <div class="bg-gradient-to-r from-blue-50 to-net-primary/10 rounded-3xl p-12 text-center border border-blue-100 flex flex-col items-center justify-center">
        <h2 class="text-2xl font-black text-slate-800 mb-4">Şikayet, Öneri veya Talebiniz mi var?</h2>
        <p class="text-slate-600 mb-8 max-w-lg mx-auto">Müşteri temsilcilerimize doğrudan mesaj göndermek için aşağıdaki butonu kullanabilirsiniz. Size en kısa sürede dönüş sağlayacağız.</p>
        <button (click)="openModal()" class="px-12 py-5 bg-net-primary text-white font-black text-lg rounded-2xl shadow-xl hover:bg-net-accent hover:-translate-y-1 transition-all flex items-center gap-3">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Mesaj Gönder
        </button>
      </div>

    </div>

    <!-- Mesaj Gönderme Modalı -->
    @if (showModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="closeModal()"></div>
        
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
          <div class="bg-net-primary p-6 text-white flex justify-between items-center shrink-0">
            <h3 class="text-xl font-black flex items-center gap-2">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Bize Mesaj Gönderin
            </h3>
            <button (click)="closeModal()" class="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div class="p-8 overflow-y-auto">
            @if (!isSent()) {
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Adınız Soyadınız</label>
                  <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-net-primary focus:ring-1" placeholder="Ad Soyad" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-700 mb-2">Telefon Numaranız</label>
                  <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-net-primary focus:ring-1" placeholder="05XX XXX XX XX" />
                </div>
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-700 mb-2">Konu</label>
                <select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-net-primary focus:ring-1">
                  <option>Talep / Öneri</option>
                  <option>Şikayet</option>
                  <option>Fatura İtirazı</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div class="mb-8">
                <label class="block text-sm font-medium text-slate-700 mb-2">Mesajınız</label>
                <textarea rows="4" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-net-primary focus:ring-1 resize-none" placeholder="Size nasıl yardımcı olabiliriz?"></textarea>
              </div>

              <div class="flex justify-end gap-3">
                <button (click)="closeModal()" class="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Vazgeç</button>
                <button (click)="sendMessage()" class="px-8 py-3 bg-net-primary text-white font-bold rounded-xl shadow-lg hover:bg-net-accent hover:-translate-y-1 transition-all">
                  Mesajı Gönder
                </button>
              </div>
            } @else {
              <div class="text-center py-8">
                <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-fade-in-up">
                  <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 class="text-3xl font-black text-slate-800 mb-2">Mesajınız Gönderildi!</h2>
                <p class="text-slate-500 text-lg mb-8">Talebiniz müşteri temsilcilerimize ulaştı. En kısa sürede geri dönüş yapacağız.</p>
                <button (click)="closeModal()" class="px-8 py-4 bg-net-primary text-white font-bold rounded-xl hover:bg-net-accent transition-colors">
                  Kapat
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class ContactUsComponent {
  showModal = signal(false);
  isSent = signal(false);

  openModal() {
    this.isSent.set(false);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  sendMessage() {
    this.isSent.set(true);
  }
}
