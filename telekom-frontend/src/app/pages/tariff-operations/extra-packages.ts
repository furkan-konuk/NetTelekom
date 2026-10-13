import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-extra-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './extra-packages.html'
})
export class ExtraPackagesComponent {
  private appState = inject(AppStateService);
  private router = inject(Router);
  packageType = signal<'internet' | 'ses' | 'sms'>('internet');
  showModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  selectedPackage = signal<{name: string, price: string, amount: number, unit: string} | null>(null);
  paymentMethod = signal<'Kredi Kartı' | 'Fatura'>('Kredi Kartı');

  buyPackage(name: string, price: string, amount: number, unit: string) {
    this.selectedPackage.set({ name, price, amount, unit });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedPackage.set(null);
  }

  confirmPurchase() {
    const pkg = this.selectedPackage();
    if (pkg) {
      this.appState.buyExtraPackage({
        id: Date.now(),
        name: pkg.name,
        amount: pkg.amount,
        unit: pkg.unit,
        price: pkg.price
      }, this.paymentMethod()).subscribe({
        next: () => {
          this.showModal.set(false);
          this.isSuccess.set(true);
        },
        error: (err) => alert('Paket alınırken hata oluştu.')
      });
    } else {
      this.showModal.set(false);
    }
  }
}
