import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full max-w-4xl mx-auto p-6">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-black text-slate-800 mb-2">Sözleşmelerim</h1>
        <p class="text-slate-500">Mevcut aboneliklerinize ait dijital sözleşme ve formları görüntüleyip indirebilirsiniz.</p>
      </div>

      <div class="space-y-4">
        <!-- Belge 1 -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">Abonelik Sözleşmesi</h3>
              <p class="text-sm text-slate-500">İmza Tarihi: 12 Ekim 2023</p>
            </div>
          </div>
          <button (click)="download()" class="text-net-primary font-bold hover:underline px-4 py-2 flex items-center gap-2">
            <span>İndir</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>

        <!-- Belge 2 -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">KVKK ve Gizlilik Politikası</h3>
              <p class="text-sm text-slate-500">İmza Tarihi: 12 Ekim 2023</p>
            </div>
          </div>
          <button (click)="download()" class="text-net-primary font-bold hover:underline px-4 py-2 flex items-center gap-2">
            <span>İndir</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>

        <!-- Belge 3 -->
        <div class="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">Taahhütname Formu</h3>
              <p class="text-sm text-slate-500">İmza Tarihi: 12 Ekim 2023</p>
            </div>
          </div>
          <button (click)="download()" class="text-net-primary font-bold hover:underline px-4 py-2 flex items-center gap-2">
            <span>İndir</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ContractsComponent {
  download() {
    alert("Belgeniz PDF formatında indiriliyor...");
  }
}
