import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-line-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-fade-in-up w-full max-w-4xl mx-auto p-6">
      <div class="mb-8 border-b border-slate-200 pb-4">
        <h1 class="text-3xl font-black text-slate-800 mb-2">Hat Bilgileri</h1>
        <p class="text-slate-500">Hattınıza ait teknik detaylar ve aktivasyon durumu.</p>
      </div>

      <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">Hat Sahibi</p>
                <p class="text-lg font-bold text-slate-800">{{ appState.currentUser()?.name }} {{ appState.currentUser()?.surname }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">Telefon Numarası</p>
                <p class="text-lg font-bold text-slate-800">{{ appState.currentUser()?.phone }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">Hat Tipi</p>
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg font-medium">
                  <div class="w-2 h-2 rounded-full bg-green-500"></div> Faturalı
                </div>
              </div>
            </div>
            
            <div class="space-y-6">
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">Aktivasyon Tarihi</p>
                <p class="text-lg font-bold text-slate-800">{{ getUserField('lineOpenDate') || '12 Ekim 2023' }}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">ICCID (SIM Kart No)</p>
                <p class="text-lg font-bold font-mono text-slate-600">8990 0112 3456 7890 123</p>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium mb-1">Tarife Bitiş Tarihi</p>
                <p class="text-lg font-bold text-slate-800">12 Ekim 2027</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-slate-50 px-8 py-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p class="text-sm text-slate-500">Hattınız kullanıma açıktır ve tüm servislerden faydalanabilirsiniz.</p>
          <button class="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors">Yenile</button>
        </div>
      </div>
    </div>
  `
})
export class LineDetailsComponent {
  appState = inject(AppStateService);

  getUserField(field: string): any {
    const user: any = this.appState.currentUser();
    return user ? user[field] : null;
  }
}
