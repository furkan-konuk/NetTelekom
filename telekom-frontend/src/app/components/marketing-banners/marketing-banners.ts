import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-marketing-banners',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './marketing-banners.html',
})
export class MarketingBannersComponent {
  
  specialOffers = [
    {
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80',
      title: 'İlk aydan kampanyası',
      description: 'NetTelekom\'dan yeni hat alanlara veya numarasını taşıyanlara özel avantajlar.',
      linkText: 'Detaylı Bilgi'
    },
    {
      image: 'https://images.unsplash.com/photo-1611078713251-5bcf431f1338?auto=format&fit=crop&w=400&q=80',
      title: 'Muud Premium 3 Ay Hediye',
      description: 'Milyonlarca şarkı, internetsiz dinleme özgürlüğü ve çok daha fazlası.',
      linkText: 'Detaylı Bilgi'
    },
    {
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
      title: 'Ev İnternetine Özel',
      description: 'Yeni nesil Wi-Fi 6 modem ile evinizin her köşesinde kesintisiz internet.',
      linkText: 'Detaylı Bilgi'
    }
  ];

}
