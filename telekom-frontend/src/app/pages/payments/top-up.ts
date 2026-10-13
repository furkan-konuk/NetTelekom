import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-up.html'
})
export class TopUpComponent {
  amounts = [100, 200, 300, 500, 1000];
  selectedAmount = signal<number>(200);
  
  isSuccess = signal<boolean>(false);

  selectAmount(amount: number) {
    this.selectedAmount.set(amount);
  }

  processPayment() {
    // Simulate payment process
    this.isSuccess.set(true);
  }
}
