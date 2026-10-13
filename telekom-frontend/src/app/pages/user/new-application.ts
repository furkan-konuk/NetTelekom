import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-new-application',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-application.html'
})
export class NewApplicationComponent implements OnInit {
  private appState = inject(AppStateService);
  private route = inject(ActivatedRoute);

  step = signal<number>(1);
  isSuccess = signal<boolean>(false);
  trackingNumber = signal<string>('NT-' + Math.floor(100000 + Math.random() * 900000));
  
  appTitle = signal<string>('Yeni Abonelik Başvurusu');
  appType = signal<string>('Yeni Abonelik');

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) {
        this.appTitle.set(data['title']);
        this.appType.set(data['title']);
      }
    });
  }

  nextStep() {
    if (this.step() < 2) {
      this.step.update(s => s + 1);
    } else {
      this.appState.addNewApplication({
        id: this.trackingNumber(),
        type: this.appType(),
        status: 'Kurye Teslimatı Bekleniyor',
        date: new Date().toLocaleDateString('tr-TR')
      }).subscribe({
        next: () => {
          this.isSuccess.set(true);
        },
        error: (err) => alert('Başvuru sırasında hata oluştu.')
      });
    }
  }

  prevStep() {
    if (this.step() > 1) {
      this.step.update(s => s - 1);
    }
  }
}
