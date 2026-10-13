import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-forms.html'
})
export class ServiceFormsComponent {
  mode = signal<'lira' | 'sebeke'>('lira');
  phoneNumber = signal<string>('');
  amount = signal<number | null>(null);

  isSuccess = signal<boolean>(false);
  resultMessage = signal<string>('');

  constructor(private router: Router) {
    if (this.router.url.includes('sebeke-ici')) {
      this.mode.set('sebeke');
    }
  }

  submitForm() {
    if (this.mode() === 'lira') {
      this.resultMessage.set(`${this.phoneNumber()} numarasına ${this.amount()} TL başarıyla gönderildi.`);
    } else {
      // Mock network check
      const isNetTelekom = Math.random() > 0.3;
      if (isNetTelekom) {
        this.resultMessage.set(`${this.phoneNumber()} numarası NetTelekom şebekesine aittir.`);
      } else {
        this.resultMessage.set(`${this.phoneNumber()} numarası farklı bir operatöre aittir.`);
      }
    }
    this.isSuccess.set(true);
  }
}
