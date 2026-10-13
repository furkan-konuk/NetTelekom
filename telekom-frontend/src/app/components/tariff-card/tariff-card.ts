import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tariff-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tariff-card.html',
})
export class TariffCardComponent {
  badgeText = input<string>('');
  badgeColor = input<string>('bg-purple-600');
  title = input<string>('Tarife Adı');
  data = input<string>('0 GB');
  voice = input<string>('0 DK');
  sms = input<string>('0 SMS');
  price = input<string>('0');
  currency = input<string>('TL');
  isPremium = input<boolean>(false);
  actionUrl = input<string>('');
  actionLabel = input<string>('İncele');
  
  actionClick = output<void>();

  onActionClick() {
    if (!this.actionUrl()) {
      this.actionClick.emit();
    }
  }
}
