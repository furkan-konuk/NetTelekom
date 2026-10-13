import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preferences.html'
})
export class PreferencesComponent {
  preferences = signal([
    { id: 'marketing', title: 'Kampanya SMS İzni', description: 'NetTelekom fırsat ve kampanyalarından SMS ile haberdar olmak istiyorum.', value: true },
    { id: 'data', title: 'Veri İşleme İzni', description: 'Bana özel teklifler sunulabilmesi için verilerimin analiz edilmesine izin veriyorum.', value: false },
    { id: 'directory', title: '11855 Rehbere Kayıt', description: 'Numaramın bilinmeyen numaralar servisinde bulunmasına izin veriyorum.', value: false },
    { id: 'roaming', title: 'Yurt Dışı Kullanımı (Roaming)', description: 'Yurt dışına çıktığımda hattımın kullanıma açık olmasını istiyorum.', value: true },
    { id: 'limit', title: 'Limit Uyarısı', description: 'Fatura veya kullanım kotam %80\'e ulaştığında uyarılmak istiyorum.', value: true },
  ]);

  togglePreference(id: string) {
    this.preferences.update(prefs => 
      prefs.map(p => p.id === id ? { ...p, value: !p.value } : p)
    );
  }
}
