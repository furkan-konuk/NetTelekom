import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-custom-package',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './custom-package.html',
  styleUrl: './custom-package.css'
})
export class CustomPackageComponent {
  internet = signal<number>(10);
  minutes = signal<number>(1000);
  sms = signal<number>(1000);

  private readonly PRICE_PER_GB = 15;
  private readonly PRICE_PER_100_MIN = 5;
  private readonly PRICE_PER_100_SMS = 2;
  private readonly BASE_PRICE = 30;

  totalPrice = computed(() => {
    return this.BASE_PRICE 
      + (this.internet() * this.PRICE_PER_GB) 
      + ((this.minutes() / 100) * this.PRICE_PER_100_MIN) 
      + ((this.sms() / 100) * this.PRICE_PER_100_SMS);
  });
}
