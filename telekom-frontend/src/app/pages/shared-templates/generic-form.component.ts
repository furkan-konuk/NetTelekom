import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-form',
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

      <div class="max-w-3xl">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
          
          <h2 class="text-xl font-bold text-slate-800 mb-6">Kişisel Bilgilerinizi Girin</h2>
          
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Adınız</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Soyadınız</label>
                <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all">
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">TC Kimlik Numarası</label>
              <input type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">İletişim Numarası</label>
              <input type="tel" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-net-accent focus:bg-white transition-all" placeholder="05XX XXX XX XX">
            </div>

            <div class="flex items-start gap-3 mt-6">
              <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-net-accent focus:ring-net-accent mt-0.5">
              <span class="text-sm text-slate-600 leading-relaxed">Kişisel verilerimin işlenmesine ilişkin <a href="#" class="text-net-accent font-bold hover:underline">Aydınlatma Metnini</a> okudum ve kabul ediyorum.</span>
            </div>

            <div class="pt-6">
              <button type="button" class="bg-net-primary text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-slate-800 transition-colors">
                Başvuruyu Tamamla
              </button>
            </div>
          </form>

        </div>
      </div>

    </div>
  `
})
export class GenericFormComponent implements OnInit {
  pageTitle: string = 'Başvuru Formu';
  categoryName: string = 'Kategori';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.pageTitle = data['title'];
      if (data['category']) this.categoryName = data['category'];
    });
  }
}
