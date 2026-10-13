import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { MarketingBannersComponent } from '../../components/marketing-banners/marketing-banners';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MarketingBannersComponent, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private appState = inject(AppStateService);
  private router = inject(Router);

  // Loading state
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  // Fatura verileri (AppState'ten)
  invoices = this.appState.invoices;

  // Kullanım verileri (AppState'ten)
  usages = this.appState.usages;
  activePackages = this.appState.activePackages;
  userName = computed(() => this.appState.currentUser().name);
  userType = signal<string>('Bireysel');

  ngOnInit() {
    if (!this.appState.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Simulate loading delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 400);
  }

  // Toplam ödenecek tutarı hesaplayan computed signal
  totalPendingAmount = computed(() => {
    return this.invoices().filter((i: any) => i.status === 'Bekliyor').reduce((acc: number, curr: any) => acc + curr.amount, 0);
  });

  // Chart configuration
  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  };
  public doughnutChartType: 'doughnut' = 'doughnut';
  
  // Helper to generate chart data for each usage
  getChartData(usage: any): ChartConfiguration<'doughnut'>['data'] {
    return {
      labels: ['Kullanılan', 'Kalan'],
      datasets: [
        {
          data: [usage.used, usage.total - usage.used],
          backgroundColor: [usage.color, '#e5e7eb'],
          hoverBackgroundColor: [usage.color, '#e5e7eb'],
          borderWidth: 0
        }
      ]
    };
  }
}
