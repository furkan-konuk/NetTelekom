import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppStateService, Invoice } from '../../core/services/app-state.service';

@Component({
  selector: 'app-pay-bill',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">Fatura Öde</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Fatura İşlemleri</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">Fatura Öde</span>
        </div>
      </div>

      <div class="max-w-4xl">
        @if (!isSuccess()) {
          @if (pendingInvoices().length > 0) {
            <p class="text-slate-500 mb-6 text-lg">Aşağıdaki ödenmemiş faturalarınız listelenmektedir. Lütfen ödemek istediğiniz faturayı seçiniz.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (invoice of pendingInvoices(); track invoice.id) {
                <div class="bg-white border-2 rounded-3xl p-6 cursor-pointer transition-all hover:shadow-lg"
                     [ngClass]="selectedInvoice()?.id === invoice.id ? 'border-net-primary shadow-md' : 'border-slate-200 hover:border-net-primary'"
                     (click)="selectedInvoice.set(invoice)">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{{ invoice.month }} Faturası</div>
                      <div class="text-3xl font-black text-slate-800">{{ invoice.amount }} ₺</div>
                    </div>
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-white"
                         [ngClass]="selectedInvoice()?.id === invoice.id ? 'bg-net-primary' : 'bg-slate-200 text-slate-400'">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                  </div>
                  <div class="bg-red-50 text-red-600 font-medium text-sm px-3 py-2 rounded-lg inline-block">Son Ödeme: {{ invoice.dueDate }}</div>
                </div>
              }
            </div>

            <!-- Ödeme Modalı Trigger -->
            @if (selectedInvoice()) {
              <div class="mt-8 animate-fade-in-up">
                <button (click)="showPaymentModal.set(true)" class="w-full py-4 bg-net-primary text-white font-bold rounded-2xl text-lg hover:bg-net-accent transition-colors shadow-lg">
                  {{ selectedInvoice()?.amount }} ₺ Öde
                </button>
              </div>
            }
          } @else {
            <div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm animate-fade-in-up">
              <div class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 class="text-2xl font-bold text-slate-800 mb-2">Ödenmemiş Faturanız Yok!</h2>
              <p class="text-slate-500">Tüm faturalarınız ödenmiş durumdadır. Teşekkür ederiz.</p>
            </div>
          }
        } @else {
          <!-- Başarı Mesajı -->
          <div class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-xl mx-auto animate-fade-in-up">
            <div class="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 class="text-3xl font-black text-slate-800 mb-2">Ödeme Başarılı!</h2>
            <p class="text-slate-500 text-lg mb-8">Faturanız başarıyla ödendi ve sistemlerimize işlendi.</p>
            <button routerLink="/fatura/gecmis" class="w-full py-4 bg-net-primary text-white font-bold rounded-xl hover:bg-net-accent transition-colors">
              Faturalarımı Gör
            </button>
          </div>
        }
      </div>
    </div>

    <!-- Ödeme Modalı -->
    @if (showPaymentModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" (click)="showPaymentModal.set(false)"></div>
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up flex flex-col">
          <div class="bg-net-primary p-6 text-white flex justify-between items-center">
            <h3 class="text-xl font-black">Güvenli Ödeme</h3>
            <div class="text-2xl font-black">{{ selectedInvoice()?.amount }} ₺</div>
          </div>
          <div class="p-6">
            <div class="flex flex-col gap-4 mb-8">
              <div>
                <input type="text" placeholder="Kart Üzerindeki İsim" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none focus:border-net-primary focus:ring-1" />
              </div>
              <div>
                <input type="text" placeholder="Kart Numarası" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none focus:border-net-primary focus:ring-1" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <input type="text" placeholder="AA/YY" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none focus:border-net-primary focus:ring-1" />
                <input type="text" placeholder="CVC" class="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl px-4 outline-none focus:border-net-primary focus:ring-1" />
              </div>
            </div>
            <div class="flex gap-3">
              <button (click)="showPaymentModal.set(false)" class="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">İptal</button>
              <button (click)="payInvoice()" class="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg">Onayla & Öde</button>
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class PayBillComponent {
  private appState = inject(AppStateService);

  pendingInvoices = computed(() => this.appState.invoices().filter(i => i.status === 'Bekliyor'));
  selectedInvoice = signal<Invoice | null>(null);
  
  showPaymentModal = signal(false);
  isSuccess = signal(false);

  payInvoice() {
    const invoice = this.selectedInvoice();
    if (invoice) {
      this.appState.payInvoice(invoice.id).subscribe({
        next: () => {
          this.showPaymentModal.set(false);
          this.isSuccess.set(true);
        },
        error: (err) => alert('Ödeme işlemi sırasında hata oluştu.')
      });
    }
  }
}
