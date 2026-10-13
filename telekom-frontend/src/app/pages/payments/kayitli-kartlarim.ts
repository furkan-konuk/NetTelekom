import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kayitli-kartlarim',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full">
      <!-- Header -->
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-light text-slate-800 mb-2">Kayıtlı Kartlarım</h1>
        <div class="flex items-center text-sm font-medium text-slate-500 gap-2">
          <span class="hover:text-net-accent cursor-pointer transition-colors">Ödeme ve TL İşlemlerim</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          <span class="text-slate-800 font-bold">Kayıtlı Kartlarım</span>
        </div>
      </div>

      <div class="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Sol: Kart Listesi -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center gap-4">
            <svg class="w-8 h-8 text-net-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            <p class="text-sm text-slate-700">Kart bilgileriniz MasterPass güvencesiyle saklanmaktadır. Dilediğiniz zaman kartlarınızı silebilir veya yeni kart ekleyebilirsiniz.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            @for (card of savedCards(); track card.id) {
              <div class="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                <div class="absolute top-0 right-0 p-4">
                  <button (click)="deleteCard(card.id)" class="text-white/50 hover:text-red-400 transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                  </button>
                </div>
                
                <div class="text-white/70 text-xs font-bold uppercase tracking-wider mb-8">{{ card.name }}</div>
                
                <div class="text-white font-mono text-xl font-bold tracking-widest mb-6">
                  **** **** **** {{ card.last4 }}
                </div>
                
                <div class="flex justify-between items-end">
                  <div class="text-white/70 text-xs font-bold uppercase">{{ card.brand }}</div>
                  <div class="text-white/70 text-xs">SKT: **/**</div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Sağ: Yeni Kart Ekle -->
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-fit">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Yeni Kart Ekle</h3>
          
          <div class="space-y-5">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Kart Adı (Opsiyonel)</label>
              <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="Örn: Maaş Kartım">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Kart Numarası</label>
              <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all font-mono" placeholder="0000 0000 0000 0000">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase">SKT</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="AA / YY">
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase">CVV</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="***">
              </div>
            </div>

            <button class="w-full mt-4 bg-net-primary text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">
              Kartı Kaydet
            </button>
          </div>
        </div>

      </div>
    </div>
  `
})
export class KayitliKartlarimComponent {
  savedCards = signal([
    { id: 1, name: 'Garanti Bonus', last4: '4532', brand: 'MASTERCARD' },
    { id: 2, name: 'Maaş Kartım', last4: '8810', brand: 'VISA' }
  ]);

  deleteCard(id: number) {
    this.savedCards.update(cards => cards.filter(c => c.id !== id));
  }
}
