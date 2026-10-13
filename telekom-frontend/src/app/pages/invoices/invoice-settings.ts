import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-settings.html'
})
export class InvoiceSettingsComponent {
  deliveryMethod = signal<'E-Fatura' | 'SMS' | 'Basılı'>('SMS');

  saveSettings() {
    alert('Fatura gönderim tercihiniz başarıyla güncellendi.');
  }
}
