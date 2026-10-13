import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mobil-odeme',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <!-- Header -->
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">Mobil Ödeme İşlemleri</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Ödeme ve TL İşlemlerim</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">Türk Telekom Mobil Ödeme</span>
        </div>
      </div>

      <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Sol: Genel Durum ve Limit -->
        <div class="space-y-6">
          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-slate-800">Mobil Ödeme Durumu</h3>
              <p class="text-sm text-slate-500 mt-1">Alışverişlerinizde faturanıza yansıtarak ödeyin.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" [checked]="isActive()" (change)="isActive.set(!isActive())" class="sr-only peer">
              <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-net-accent"></div>
            </label>
          </div>

          <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm" [class.opacity-50]="!isActive()" [class.pointer-events-none]="!isActive()">
            <h3 class="text-lg font-bold text-slate-800 mb-6">Aylık Limit Belirleme</h3>
            
            <div class="flex justify-between items-end mb-4">
              <span class="text-sm font-bold text-slate-500">Mevcut Limit</span>
              <span class="text-3xl font-extrabold text-net-primary">{{ limit() }} TL</span>
            </div>
            <input type="range" min="0" max="2500" step="100" 
                   [ngModel]="limit()" (ngModelChange)="limit.set($event)"
                   class="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-net-accent hover:accent-cyan-400 transition-colors">
            <div class="flex justify-between text-xs font-medium text-slate-400 mt-3 px-1">
              <span>0 TL</span>
              <span>2.500 TL</span>
            </div>

            <button class="w-full mt-8 bg-slate-50 border border-slate-200 text-net-primary hover:bg-net-primary hover:text-white font-bold py-3 rounded-xl transition-all">
              Limiti Güncelle
            </button>
          </div>
        </div>

        <!-- Sağ: Güncel Harcama Grafiği -->
        <div class="bg-gradient-to-br from-net-primary to-slate-900 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
          <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500 opacity-20 rounded-full blur-3xl"></div>
          
          <div class="relative z-10">
            <h3 class="text-xl font-bold text-white mb-2">Güncel Harcama</h3>
            <p class="text-slate-300 text-sm mb-8">Bu ay mobil ödeme ile yaptığınız harcamalar.</p>
            
            <div class="flex flex-col items-center justify-center my-8">
              <!-- Custom Donut Chart CSS Trick -->
              <div class="relative w-48 h-48 rounded-full flex items-center justify-center" style="background: conic-gradient(#00b4d8 28%, #1e293b 0);">
                <div class="absolute inset-2 bg-slate-900 rounded-full flex flex-col items-center justify-center">
                  <span class="text-4xl font-black text-white">350<span class="text-lg text-slate-400 ml-1">TL</span></span>
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Harcanan</span>
                </div>
              </div>
            </div>

            <div class="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex justify-between items-center">
              <div>
                <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Kalan Limit</span>
                <span class="text-xl font-bold text-white">{{ limit() - 350 }} TL</span>
              </div>
              <div class="text-right">
                <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dönem Sonu</span>
                <span class="text-xl font-bold text-white">25 Ağu</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class MobilOdemeComponent {
  isActive = signal(true);
  limit = signal(1250);
}
