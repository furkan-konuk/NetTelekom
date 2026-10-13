import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puk-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full max-w-4xl mx-auto p-6">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-black text-slate-800 mb-2">PUK Bilgileri</h1>
        <p class="text-slate-500">SIM kartınızın kilitlenmesi durumunda kullanacağınız güvenlik kodları.</p>
      </div>

      <div class="bg-red-50 text-red-800 p-6 rounded-2xl mb-8 flex gap-4">
        <svg class="w-8 h-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <h4 class="font-bold mb-1">Önemli Uyarı</h4>
          <p class="text-sm">PUK kodunuzu 10 defa hatalı girmeniz durumunda SIM kartınız kalıcı olarak bloke olur ve yenisini çıkarmanız gerekir.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- PUK 1 -->
        <div class="bg-white border-2 border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:border-net-primary transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
          <h3 class="text-xl font-bold text-slate-500 mb-4">PUK 1 Kodu</h3>
          <div class="flex items-center justify-between">
            <div class="text-4xl font-mono font-black tracking-widest text-slate-800 select-all">{{ showPuk1() ? '48291045' : '********' }}</div>
            <button (click)="showPuk1.set(!showPuk1())" class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-net-primary hover:text-white transition-colors">
              @if (showPuk1()) {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              } @else {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>
          <p class="text-sm text-slate-500 mt-4">PIN 1 kodunuzu bloke ettiğinizde kullanın.</p>
        </div>

        <!-- PUK 2 -->
        <div class="bg-white border-2 border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:border-net-primary transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
          <h3 class="text-xl font-bold text-slate-500 mb-4">PUK 2 Kodu</h3>
          <div class="flex items-center justify-between">
            <div class="text-4xl font-mono font-black tracking-widest text-slate-800 select-all">{{ showPuk2() ? '19385721' : '********' }}</div>
            <button (click)="showPuk2.set(!showPuk2())" class="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-net-primary hover:text-white transition-colors">
              @if (showPuk2()) {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              } @else {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }
            </button>
          </div>
          <p class="text-sm text-slate-500 mt-4">PIN 2 kodunuzu bloke ettiğinizde kullanın.</p>
        </div>
      </div>
    </div>
  `
})
export class PukInfoComponent {
  showPuk1 = signal(false);
  showPuk2 = signal(false);
}
