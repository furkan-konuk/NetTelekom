import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-buy-with-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buy-with-card.html'
})
export class BuyWithCardComponent {
  private appState = inject(AppStateService);

  packages = signal([
    { id: 1, name: 'Haftalık Sınırsız Video', price: 65, duration: 'Haftalık', amount: 0, unit: 'Video' },
    { id: 2, name: 'Aylık 10 GB Ek İnternet', price: 95, duration: 'Aylık', amount: 10, unit: 'GB' },
    { id: 3, name: 'Sosyal Medya Sınırsız', price: 50, duration: 'Aylık', amount: 0, unit: 'Sosyal' }
  ]);

  savedCards = signal([
    { id: 1, type: 'Mastercard', last4: '5432', name: 'Ahmet Yılmaz' },
    { id: 2, type: 'Visa', last4: '9876', name: 'Ahmet Y.' }
  ]);

  selectedPackage = signal<any>(null);
  showPaymentModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  
  paymentMethod = signal<'saved' | 'new'>('saved');
  selectedCardId = signal<number | null>(1);

  openPaymentModal(pkg: any) {
    this.selectedPackage.set(pkg);
    this.showPaymentModal.set(true);
  }

  closePaymentModal() {
    this.showPaymentModal.set(false);
    this.selectedPackage.set(null);
  }

  confirmPayment() {
    const pkg = this.selectedPackage();
    if (pkg) {
      this.appState.buyExtraPackage({
        id: Date.now(),
        name: pkg.name,
        amount: pkg.amount,
        unit: pkg.unit,
        price: pkg.price + ' TL'
      }, 'Kredi Kartı').subscribe({
        next: () => {
          this.showPaymentModal.set(false);
          this.isSuccess.set(true);
        },
        error: (err) => alert('Paket alınırken hata oluştu.')
      });
    } else {
      this.showPaymentModal.set(false);
    }
  }
}
