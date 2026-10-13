import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-digital-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digital-services.html'
})
export class DigitalServicesComponent {
  services = signal([
    { id: 1, name: 'Muud Premium', description: 'Sınırsız müzik dinleme keyfi', price: 49.99, icon: 'musical-note', active: true },
    { id: 2, name: 'Tivibu GO', description: 'Her yerde TV ve dizi izleme ayrıcalığı', price: 79.90, icon: 'tv', active: false },
    { id: 3, name: 'e-Dergi', description: 'Yüzlerce dergi ve gazeteye sınırsız erişim', price: 29.90, icon: 'book-open', active: false },
    { id: 4, name: 'Playstore', description: 'En yeni PC oyunlarında indirim fırsatları', price: 0, icon: 'puzzle-piece', active: false }
  ]);

  toggleService(id: number) {
    this.services.update(svcs => svcs.map(s => s.id === id ? { ...s, active: !s.active } : s));
  }
}
