import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tl-yukle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <!-- Header -->
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">TL Yükle</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Ödeme ve TL İşlemlerim</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">TL Yükle</span>
        </div>
      </div>

      <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Sol: Numara ve Tutar Seçimi -->
        <div class="space-y-6">
          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Yüklenecek Numara</h3>
            <div class="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div class="w-12 h-12 bg-net-primary rounded-full flex items-center justify-center text-white">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
              </div>
              <div class="flex-1">
                <p class="text-xs text-slate-500 font-bold mb-1">Kendi Numaram</p>
                <input type="text" value="0555 123 45 67" class="w-full bg-transparent font-bold text-lg text-slate-800 focus:outline-none focus:text-net-accent transition-colors">
              </div>
            </div>
            <p class="text-xs text-slate-500 mt-3">Farklı bir numaraya yükleme yapmak için numarayı değiştirebilirsiniz.</p>
          </div>

          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Yüklenecek Tutar</h3>
            <div class="grid grid-cols-3 gap-4">
              @for (amount of [100, 200, 300, 500, 1000, 1500]; track amount) {
                <button (click)="selectedAmount.set(amount)"
                        class="py-4 rounded-xl font-bold transition-all border-2"
                        [ngClass]="selectedAmount() === amount ? 'border-net-primary bg-net-primary text-white shadow-lg' : 'border-slate-200 text-slate-700 hover:border-net-accent hover:text-net-accent'">
                  {{ amount }} TL
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Sağ: Kredi Kartı -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-net-accent opacity-20 rounded-full blur-3xl"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-white mb-2">Güvenli Ödeme</h3>
            <p class="text-slate-300 text-sm mb-8">Kredi kartı bilgilerinizle hemen yükleme yapın.</p>
            
            <div class="space-y-5">
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Kart Üzerindeki İsim</label>
                <input type="text" class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-net-accent transition-colors backdrop-blur-sm" placeholder="AD SOYAD">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Kart Numarası</label>
                <input type="text" class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-net-accent transition-colors font-mono backdrop-blur-sm" placeholder="0000 0000 0000 0000">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">SKT</label>
                  <input type="text" class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-net-accent transition-colors backdrop-blur-sm" placeholder="AA / YY">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">CVV</label>
                  <input type="text" class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-net-accent transition-colors backdrop-blur-sm" placeholder="***">
                </div>
              </div>
            </div>
          </div>

          <div class="relative z-10 mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-slate-400 text-xs font-bold uppercase tracking-wider">Toplam Tutar</span>
              <span class="text-3xl font-black text-white">{{ selectedAmount() }} TL</span>
            </div>
            <button class="bg-net-accent hover:bg-cyan-400 text-slate-900 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Öde
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class TlYukleComponent {
  selectedAmount = signal(200);
}
