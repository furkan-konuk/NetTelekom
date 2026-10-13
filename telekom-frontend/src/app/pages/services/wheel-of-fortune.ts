import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-wheel-of-fortune',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wheel-of-fortune.html',
  styles: [`
    .wheel {
      transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
    }
  `]
})
export class WheelOfFortuneComponent implements OnInit {
  private appState = inject(AppStateService);

  isSpinning = signal<boolean>(false);
  hasPlayed = signal<boolean>(false);
  alreadyPlayedThisWeek = signal<boolean>(false);
  rotation = signal<number>(0);
  prize = signal<string | null>(null);

  prizes = [
    'Günlük 1 GB', 'Haftalık 2 GB', 'Aylık 5 GB',
    'Sosyal Medya 2 GB', 'Günlük Sınırsız', 'Aylık 10 GB'
  ];

  ngOnInit() {
    const user = this.appState.currentUser();
    if (user && (user as any).lastWheelSpinDate) {
      const lastSpin = new Date((user as any).lastWheelSpinDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - lastSpin.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        this.alreadyPlayedThisWeek.set(true);
      }
    }
  }

  spin() {
    if (this.hasPlayed() || this.isSpinning()) return;

    // Ödülü önden belirle
    const prizeIndex = Math.floor(Math.random() * this.prizes.length);
    const finalPrize = this.prizes[prizeIndex];
    
    let gbAmount = 0;
    if (finalPrize.includes('1 GB')) gbAmount = 1;
    else if (finalPrize.includes('2 GB')) gbAmount = 2;
    else if (finalPrize.includes('5 GB')) gbAmount = 5;
    else if (finalPrize.includes('10 GB')) gbAmount = 10;
    else if (finalPrize.includes('Sınırsız')) gbAmount = 999;

    // Önce Backend'den izin kontrolü yap (Haftada 1 kez)
    this.appState.http.post(`${this.appState.baseUrl}/packages/gift`, { amount: gbAmount, unit: 'GB' }).subscribe({
      next: () => {
        // İzin verildi, çarkı çevir
        this.isSpinning.set(true);
        
        // Çarkın hedef ödüle durması için gereken açıyı hesapla
        const extraSpins = Math.floor(Math.random() * 5) + 5;
        const segmentSize = 360 / this.prizes.length;
        
        // Formül: Hedef index'e gelmek için çarkın tersine ne kadar dönmesi gerektiği
        const targetAngle = 360 - (prizeIndex * segmentSize) - (segmentSize / 2);
        
        const totalRotation = this.rotation() + (extraSpins * 360) + targetAngle - (this.rotation() % 360);
        
        this.rotation.set(totalRotation);

        setTimeout(() => {
          this.isSpinning.set(false);
          this.hasPlayed.set(true);
          this.prize.set(finalPrize);
          
          // Dashboard'u güncelle ki hediye internet paketlerde görünsün
          this.appState.fetchDashboardData();
        }, 3000);
      },
      error: (err) => {
        alert(err.error?.message || 'Bir hata oluştu veya bu hafta çarkı zaten çevirdiniz.');
      }
    });
  }
}
