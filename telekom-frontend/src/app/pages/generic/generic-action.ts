import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-generic-action',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-3xl mx-auto p-6 animate-fade-in-up">
      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 text-center relative overflow-hidden">
        <!-- Dekoratif Arkaplan -->
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-100 to-blue-50 rounded-full blur-3xl -z-10"></div>
        
        <!-- İkon -->
        <div class="w-24 h-24 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl mx-auto mb-8 flex items-center justify-center text-cyan-600 shadow-inner">
          <span class="material-icons text-5xl" [innerHTML]="icon()"></span>
        </div>

        <!-- Başlık ve Açıklama -->
        <h1 class="text-3xl font-black text-slate-800 mb-4 tracking-tight">{{ title() }}</h1>
        <p class="text-slate-500 text-lg mb-10 max-w-lg mx-auto">{{ description() }}</p>

        <!-- Sonuç Mesajı (Başarılı) -->
        @if (successMessage()) {
          <div class="bg-emerald-50 border border-emerald-200 text-emerald-700 p-6 rounded-2xl mb-8 flex flex-col items-center animate-fade-in-up">
            <svg class="w-12 h-12 text-emerald-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg font-bold">{{ successMessage() }}</span>
            <span class="text-sm text-emerald-600 mt-1 font-medium">İşlem Numarası: {{ transactionId() }}</span>
          </div>
        }

        <!-- Aksiyon Butonu -->
        @if (!successMessage()) {
          <button 
            (click)="executeAction()" 
            [disabled]="isLoading()"
            class="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-xl shadow-[0_10px_20px_rgba(10,25,47,0.2)] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-75 disabled:transform-none disabled:hover:shadow-none flex items-center justify-center mx-auto gap-3 text-lg">
            
            @if (isLoading()) {
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              İşleniyor...
            } @else {
              {{ buttonText() }}
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            }
          </button>
        }
      </div>
    </div>
  `
})
export class GenericActionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private appState = inject(AppStateService);

  title = signal<string>('İşlem');
  description = signal<string>('Bu işlemi gerçekleştirmek istediğinize emin misiniz?');
  icon = signal<string>('<svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>');
  buttonText = signal<string>('Devam Et');
  actionId = signal<string>('generic');

  isLoading = signal(false);
  successMessage = signal<string | null>(null);
  transactionId = signal<string | null>(null);

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.title.set(data['title']);
      if (data['description']) this.description.set(data['description']);
      if (data['icon']) this.icon.set(data['icon']);
      if (data['buttonText']) this.buttonText.set(data['buttonText']);
      if (data['actionId']) this.actionId.set(data['actionId']);
    });
  }

  executeAction() {
    if (!this.appState.isLoggedIn()) return;
    const userId = '12345'; // Backend token simulation

    this.isLoading.set(true);
    
    this.http.post<any>('http://localhost:8080/api/v1/generic/action', {
      userId: userId,
      actionId: this.actionId()
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage.set(response.data.message);
          this.transactionId.set(response.data.transactionId);
        }
        this.isLoading.set(false);
      },
      error: () => {
        alert('İşlem sırasında bir hata oluştu. Backend açık mı?');
        this.isLoading.set(false);
      }
    });
  }
}
