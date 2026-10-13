import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-cancel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer-cancel.html'
})
export class TransferCancelComponent {
  mode = signal<'transfer' | 'cancel'>('transfer');
  
  showModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

  constructor(private router: Router) {
    const url = this.router.url;
    if (url.includes('iptal')) {
      this.mode.set('cancel');
    }
  }

  setMode(m: 'transfer' | 'cancel') {
    this.mode.set(m);
  }

  openModal() {
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  confirmAction() {
    this.showModal.set(false);
    this.isSuccess.set(true);
  }
}
