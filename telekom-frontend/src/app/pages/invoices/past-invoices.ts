import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-past-invoices',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './past-invoices.html'
})
export class PastInvoicesComponent {
  
  // Dummy data for the past invoices list
  invoices = [
    { month: 'Temmuz 2026', amount: '645,25 TL', dueDate: '27 Temmuz 2026 23:59', status: 'Ödenmedi', statusClass: 'text-red-500 bg-red-50', button: true },
    { month: 'Haziran 2026', amount: '519,50 TL', dueDate: '-', status: 'Ödendi', statusClass: 'text-green-500 bg-green-50', button: false },
    { month: 'Mayıs 2026', amount: '367 TL', dueDate: '-', status: 'Ödendi', statusClass: 'text-green-500 bg-green-50', button: false },
    { month: 'Nisan 2026', amount: '367 TL', dueDate: '-', status: 'Ödendi', statusClass: 'text-green-500 bg-green-50', button: false },
  ];

  // Bar chart configuration
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, display: false }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#0a192f',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 14, weight: 'bold' }
      }
    },
    elements: {
      bar: { borderRadius: 20 } // Fully rounded tops and bottoms
    }
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Şubat\n2026', 'Mart\n2026', 'Nisan\n2026', 'Mayıs\n2026', 'Haziran\n2026', 'Temmuz\n2026'],
    datasets: [
      {
        data: [250, 310, 367, 367, 519.5, 645.25],
        backgroundColor: '#00b4d8', // net-accent
        hoverBackgroundColor: '#0a192f', // net-primary
        barThickness: 16
      }
    ]
  };

}
