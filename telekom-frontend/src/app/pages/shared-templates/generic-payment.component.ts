import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-payment',
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

      <div class="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Left: Payment Info -->
        <div class="bg-gradient-to-br from-net-primary to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2">Ödeme İşlemi</h3>
              <p class="text-slate-300 text-sm mb-8">Şu anda <strong>{{ pageTitle }}</strong> işlemini gerçekleştiriyorsunuz. Lütfen sağ taraftaki alana kart bilgilerinizi giriniz.</p>
            </div>
            
            <div>
              <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">İşlem Tutarı</div>
              <div class="text-5xl font-black text-net-accent">
                250<span class="text-2xl text-white ml-1">TL</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Credit Card Form -->
        <div class="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <h3 class="text-lg font-bold text-slate-800 mb-6">Kart Bilgileri</h3>
          
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Kart Üzerindeki İsim</label>
              <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="AD SOYAD">
            </div>
            
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Kart Numarası</label>
              <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all font-mono" placeholder="0000 0000 0000 0000">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Son Kullanma Tarihi</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="AA / YY">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">CVV / CVC</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="***">
              </div>
            </div>

            <button class="w-full mt-4 bg-net-primary text-white font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all">
              Ödemeyi Tamamla
            </button>
            <div class="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500 font-medium">
              <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              256-Bit SSL ile Güvenli Ödeme
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class GenericPaymentComponent implements OnInit {
  pageTitle: string = 'Ödeme';
  categoryName: string = 'Kategori';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.pageTitle = data['title'];
      if (data['category']) this.categoryName = data['category'];
    });
  }
}
