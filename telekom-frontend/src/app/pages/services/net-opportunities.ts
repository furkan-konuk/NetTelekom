import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-net-opportunities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './net-opportunities.html'
})
export class NetOpportunitiesComponent {
  opportunities = signal<{id: number, title: string, description: string, code: string | null, brand: string}[]>([
    { id: 1, title: 'Kahve Dünyası', description: 'Tüm kahvelerde geçerli %20 İndirim!', code: null, brand: 'kahve' },
    { id: 2, title: 'Cinemaximum', description: 'Hafta içi biletlerde 1 Alana 1 Bedava', code: null, brand: 'sinema' },
    { id: 3, title: 'Yemeksepeti', description: 'Seçili restoranlarda 50 TL İndirim Kuponu', code: null, brand: 'yemek' }
  ]);

  getCode(id: number) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    this.opportunities.update(opps => opps.map(o => o.id === id ? { ...o, code } : o));
  }
}
