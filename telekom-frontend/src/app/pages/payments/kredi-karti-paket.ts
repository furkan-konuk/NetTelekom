import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kredi-karti-paket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <!-- Header -->
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">Kredi Kartı ile Paket Al</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Ödeme ve TL İşlemlerim</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">Kredi Kartı ile Paket Al</span>
        </div>
      </div>

      <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Sol: Paket Seçimi -->
        <div class="space-y-6">
          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Paket Seçimi</h3>
            
            <div class="space-y-4">
              @for (pkg of availablePackages; track pkg.id) {
                <div (click)="selectedPackage.set(pkg)"
                     class="p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between"
                     [ngClass]="selectedPackage()?.id === pkg.id ? 'border-net-primary bg-slate-50' : 'border-slate-200 hover:border-net-accent'">
                  <div>
                    <h4 class="font-bold text-slate-800">{{ pkg.name }}</h4>
                    <p class="text-sm text-slate-500 mt-1">{{ pkg.description }}</p>
                  </div>
                  <div class="text-right">
                    <span class="block text-xl font-black text-net-primary">{{ pkg.price }} TL</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Sağ: Kredi Kartı -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-cyan-400 opacity-20 rounded-full blur-3xl"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-white mb-2">Ödeme Bilgileri</h3>
            <p class="text-slate-300 text-sm mb-8">
              @if (selectedPackage()) {
                <strong>{{ selectedPackage()?.name }}</strong> paketi için ödeme yapıyorsunuz.
              } @else {
                Lütfen sol taraftan bir paket seçin.
              }
            </p>
            
            <div class="space-y-5" [class.opacity-50]="!selectedPackage()" [class.pointer-events-none]="!selectedPackage()">
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
              <span class="text-3xl font-black text-white">
                {{ selectedPackage() ? selectedPackage()?.price : '0' }} TL
              </span>
            </div>
            <button [disabled]="!selectedPackage()"
                    class="bg-net-accent hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 font-black px-8 py-4 rounded-xl shadow-lg transition-all">
              Satın Al
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class KrediKartiPaketComponent {
  availablePackages = [
    { id: 1, name: 'Aylık 10GB Fırsat', description: '10GB İnternet, 1000DK, 1000SMS', price: 250 },
    { id: 2, name: 'Aylık 20GB Fırsat', description: '20GB İnternet, 2000DK, 2000SMS', price: 350 },
    { id: 3, name: 'Haftalık 5GB', description: 'Haftalık 5GB İnternet Paketi', price: 80 }
  ];

  selectedPackage = signal<any>(this.availablePackages[0]);
}
