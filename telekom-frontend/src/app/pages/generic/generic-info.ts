import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6 animate-fade-in-up">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-800 tracking-tight">{{ title() }}</h1>
        <p class="text-slate-500 mt-2">{{ infoText() }}</p>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-12 text-center flex flex-col items-center justify-center">
          <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-800 mb-2">Henüz Kayıt Yok</h3>
          <p class="text-slate-500 max-w-md mx-auto">Bu alanda size ait herhangi bir geçmiş veri veya kayıt bulunamadı. Yapacağınız yeni işlemler burada listelenecektir.</p>
        </div>
      </div>
    </div>
  `
})
export class GenericInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);

  title = signal<string>('Bilgi Ekranı');
  infoText = signal<string>('Sistemdeki kayıtlarınız aşağıda listelenmektedir.');

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.title.set(data['title']);
      if (data['infoText']) this.infoText.set(data['infoText']);
    });
  }
}
