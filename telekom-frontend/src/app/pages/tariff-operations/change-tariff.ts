import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffCardComponent } from '../../components/tariff-card/tariff-card';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-change-tariff',
  standalone: true,
  imports: [CommonModule, TariffCardComponent],
  templateUrl: './change-tariff.html'
})
export class ChangeTariffComponent {
  private appState = inject(AppStateService);

  tariffs = signal([
    { id: 1, name: 'NetTelekom Prime', internet: '30', minutes: '1000', sms: '250', price: '490', oldPrice: '600', isPremium: false, badgeText: 'Avantajlı' },
    { id: 2, name: 'NetTelekom Prime', internet: '40', minutes: '2000', sms: '250', price: '620', oldPrice: '750', isPremium: true, badgeText: 'En Çok Tercih Edilen' },
    { id: 3, name: 'Yeni Nesil Prime', internet: 'Sınırsız', minutes: 'Sınırsız', sms: '250', price: '1.550', oldPrice: '1.800', isPremium: true, badgeText: 'Yeni Nesil' },
  ]);

  selectedTariff = signal<any>(null);
  showModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

  openModal(tariff: any) {
    this.selectedTariff.set(tariff);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedTariff.set(null);
  }

  confirmChange() {
    this.appState.changeTariff(this.selectedTariff()).subscribe({
      next: () => {
        this.showModal.set(false);
        this.isSuccess.set(true);
      },
      error: (err) => alert('Tarife değiştirilirken hata oluştu.')
    });
  }
}
