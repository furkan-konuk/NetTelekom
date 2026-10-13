import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from '../../core/services/app-state.service';

export interface SettingItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  isUpdating?: boolean;
}

@Component({
  selector: 'app-generic-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6 animate-fade-in-up">
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-800 tracking-tight">{{ title() }}</h1>
        <p class="text-slate-500 mt-2">Tercihlerinizi dilediğiniz gibi özelleştirebilirsiniz. Yaptığınız değişiklikler anında kaydedilir.</p>
      </div>

      <div class="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        @if (isLoadingInitial()) {
          <div class="p-12 flex justify-center">
            <svg class="animate-spin h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="divide-y divide-slate-100">
            @for (setting of settings(); track setting.id) {
              <div class="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div class="pr-6">
                  <h3 class="text-lg font-bold text-slate-800">{{ setting.label }}</h3>
                  <p class="text-slate-500 text-sm mt-1 leading-relaxed">{{ setting.description }}</p>
                </div>
                
                <!-- Toggle Switch -->
                <button 
                  (click)="toggleSetting(setting)"
                  [disabled]="setting.isUpdating"
                  class="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 disabled:opacity-50"
                  [ngClass]="setting.enabled ? 'bg-emerald-500' : 'bg-slate-300'">
                  
                  <span 
                    class="pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    [ngClass]="setting.enabled ? 'translate-x-6' : 'translate-x-0'">
                    
                    @if (setting.isUpdating) {
                      <svg class="absolute inset-0 h-full w-full animate-spin text-slate-300 p-1" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    }
                  </span>
                </button>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `
})
export class GenericSettingsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private appState = inject(AppStateService);

  title = signal<string>('Ayarlar');
  settings = signal<SettingItem[]>([]);
  isLoadingInitial = signal(true);

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.title.set(data['title']);
      
      const configuredSettings: SettingItem[] = data['settingsList'] || [];
      
      // Backend'den gerçek ayar durumlarını çek
      if (this.appState.isLoggedIn()) {
        const userId = '12345';
        this.http.get<any>(`http://localhost:8080/api/v1/generic/settings?userId=${userId}`).subscribe({
          next: (response) => {
            if (response.success) {
              const userSettingsMap = response.data;
              
              // Frontend'de tanımlı ayarların state'ini veritabanından gelenlerle birleştir
              const mergedSettings = configuredSettings.map(s => ({
                ...s,
                enabled: userSettingsMap[s.id] === true // DB'de varsa kullan, yoksa false
              }));
              
              this.settings.set(mergedSettings);
            }
            this.isLoadingInitial.set(false);
          },
          error: () => {
            // Hata olursa varsayılanları göster
            this.settings.set(configuredSettings.map(s => ({...s, enabled: false})));
            this.isLoadingInitial.set(false);
          }
        });
      }
    });
  }

  toggleSetting(setting: SettingItem) {
    if (!this.appState.isLoggedIn()) return;
    const userId = '12345';

    // UI'ı anında optimistic update yap
    setting.enabled = !setting.enabled;
    setting.isUpdating = true;

    this.http.post<any>('http://localhost:8080/api/v1/generic/setting', {
      userId: userId,
      settingKey: setting.id,
      enabled: setting.enabled
    }).subscribe({
      next: () => {
        setting.isUpdating = false;
      },
      error: () => {
        // Hata durumunda eski haline çevir
        setting.enabled = !setting.enabled;
        setting.isUpdating = false;
        alert('Ayar kaydedilemedi. Backend sunucunuz çalışıyor mu?');
      }
    });
  }
}
