import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lost-stolen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lost-stolen.html'
})
export class LostStolenComponent {
  showModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

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
