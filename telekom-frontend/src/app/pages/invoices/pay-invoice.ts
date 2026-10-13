import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pay-invoice',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pay-invoice.html'
})
export class PayInvoiceComponent {
  paymentType = signal<'kendi' | 'baska'>('kendi');
}
