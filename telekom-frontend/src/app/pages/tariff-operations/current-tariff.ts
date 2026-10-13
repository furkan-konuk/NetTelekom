import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-current-tariff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-tariff.html'
})
export class CurrentTariffComponent {
  private appState = inject(AppStateService);

  tariff = this.appState.currentTariff;
  usages = this.appState.usages;
  activePackages = this.appState.activePackages;

  get internetUsage() {
    return this.usages().find(u => u.type === 'İnternet');
  }

  get minutesUsage() {
    return this.usages().find(u => u.type === 'Dakika');
  }

  get smsUsage() {
    return this.usages().find(u => u.type === 'SMS');
  }

  getPercentage(used: number, total: number): number {
    return (used / total) * 100;
  }

  cancelPackage(id: number) {
    if (confirm("Bu ek paketi iptal etmek istediğinize emin misiniz?")) {
      this.appState.cancelExtraPackage(id).subscribe({
        next: () => alert('Paket başarıyla iptal edildi.'),
        error: () => alert('İptal sırasında bir hata oluştu.')
      });
    }
  }
}
