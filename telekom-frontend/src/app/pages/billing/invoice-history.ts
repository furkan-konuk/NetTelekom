import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-invoice-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="animate-fade-in-up w-full max-w-5xl mx-auto">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">Geçmiş Faturalarım</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Fatura İşlemleri</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">Geçmiş Faturalar</span>
        </div>
      </div>

      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 class="font-bold text-slate-800">Son 6 Aylık Fatura Dökümünüz</h2>
          <button routerLink="/fatura/ode" class="px-4 py-2 bg-net-primary text-white text-sm font-bold rounded-lg shadow-md hover:bg-net-accent transition-colors">
            Ödenmemiş Fatura Ara
          </button>
        </div>
        <div class="divide-y divide-slate-100">
          @for (invoice of invoices(); track invoice.id) {
            <div class="p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-blue-50 transition-colors group">
              <div class="flex items-center gap-6 w-full sm:w-auto mb-4 sm:mb-0">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl"
                     [ngClass]="invoice.status === 'Ödendi' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'">
                  @if (invoice.status === 'Ödendi') {
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  } @else {
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                </div>
                <div>
                  <h3 class="font-bold text-lg text-slate-800">{{ invoice.month }} Faturası</h3>
                  <p class="text-sm text-slate-500">Son Ödeme: {{ invoice.dueDate }}</p>
                </div>
              </div>
              <div class="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div class="text-right">
                  <div class="text-2xl font-black text-slate-800">{{ invoice.amount }} ₺</div>
                  <div class="text-xs font-bold px-2 py-1 rounded-full inline-block mt-1"
                       [ngClass]="invoice.status === 'Ödendi' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'">
                    {{ invoice.status }}
                  </div>
                </div>
                <button class="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-net-primary group-hover:border-net-primary transition-all">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class InvoiceHistoryComponent {
  private appState = inject(AppStateService);
  invoices = this.appState.invoices;
}
