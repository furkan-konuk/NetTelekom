import { Component, signal, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TariffCardComponent } from '../../components/tariff-card/tariff-card';

@Component({
  selector: 'app-tariffs',
  standalone: true,
  imports: [TariffCardComponent],
  templateUrl: './tariffs.html',
  styleUrl: './tariffs.css'
})
export class TariffsComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Loading state
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  tariffs = signal<any[]>([]);
  digitalServices = signal<any[]>([]);

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/api/v1/tariffs').subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          this.tariffs.set(data.tariffs);
          this.digitalServices.set(data.digitalServices);
        } else {
          this.error.set(response.message);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Veriler sunucudan çekilemedi. Backend açık mı?');
        this.isLoading.set(false);
      }
    });
  }

  selectTariff(tariff: any) {
    this.router.navigate(['/tarife/degisiklik']);
  }

  addService(service: any) {
    this.router.navigate(['/servis/tum']);
  }
}
