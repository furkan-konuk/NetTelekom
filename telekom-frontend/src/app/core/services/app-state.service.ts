import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

export interface User {
  phone: string;
  name: string;
  surname: string;
  password?: string;
}

export interface Usage {
  type: string;
  total: number;
  used: number;
  unit: string;
  color: string;
  icon: string;
}

export interface Tariff {
  id: number;
  name: string;
  price: string;
  endDate: string;
}

export interface ExtraPackage {
  id: number;
  name: string;
  amount: number;
  unit: string; // 'GB', 'DK', 'SMS'
  price: string;
}

export interface Application {
  id: string;
  type: string;
  status: string;
  date: string;
}

export interface Invoice {
  id: number;
  month: string;
  amount: number;
  status: 'Ödendi' | 'Bekliyor';
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public http = inject(HttpClient);
  public baseUrl = 'http://localhost:8080/api/v1';
  // --- AUTH STATE ---
  isLoggedIn = signal<boolean>(!!localStorage.getItem('userId'));

  // --- USER STATE ---
  currentUser = signal<User>({ phone: '', name: '', surname: '' });

  // --- TARIFF STATE ---
  currentTariff = signal<Tariff | null>(null);

  // --- USAGE STATE ---
  usages = signal<Usage[]>([]);

  // --- EXTRA PACKAGES ---
  activePackages = signal<ExtraPackage[]>([]);

  // --- APPLICATIONS ---
  applications = signal<Application[]>([]);

  // --- INVOICES ---
  invoices = signal<Invoice[]>([]);

  constructor() {
    // Sayfa yenilendiğinde (F5) verilerin kaybolmaması için LocalStorage'dan oku
    const savedState = localStorage.getItem('telekomAppState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.currentUser) this.currentUser.set(parsed.currentUser);
        if (parsed.currentTariff) this.currentTariff.set(parsed.currentTariff);
        if (parsed.usages) this.usages.set(parsed.usages);
        if (parsed.activePackages) this.activePackages.set(parsed.activePackages);
        if (parsed.applications) this.applications.set(parsed.applications);
        if (parsed.invoices) this.invoices.set(parsed.invoices);
      } catch (e) {
        console.error('State parse error', e);
      }
    }

    // Herhangi bir state değiştiğinde otomatik olarak LocalStorage'a kaydet
    effect(() => {
      const stateToSave = {
        currentUser: this.currentUser(),
        currentTariff: this.currentTariff(),
        usages: this.usages(),
        activePackages: this.activePackages(),
        applications: this.applications(),
        invoices: this.invoices()
      };
      localStorage.setItem('telekomAppState', JSON.stringify(stateToSave));
    });
  }

  // --- METHODS (REAL API) ---

  login(phone: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { phoneNumber: phone, password }).pipe(
      tap(res => {
        if (res.data && (res.data.token || res.data.userId)) {
          // Token yoksa şimdilik userId'yi simüle edilmiş token olarak kullan (Backend tam JWT destekleyene kadar)
          const tokenToSave = res.data.token || String(res.data.userId);
          localStorage.setItem('token', tokenToSave);
          this.isLoggedIn.set(true);
          this.fetchDashboardData();
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('telekomAppState');
    this.isLoggedIn.set(false);
    // Reset state
    this.currentUser.set({ phone: '', name: '', surname: '' });
    this.currentTariff.set(null);
    this.usages.set([]);
    this.activePackages.set([]);
    this.invoices.set([]);
  }

  fetchDashboardData() {
    if (!this.isLoggedIn()) return;
    
    // API'den tüm verileri çek
    this.http.get<any>(`${this.baseUrl}/dashboard`).subscribe({
      next: (res) => {
        if (res && res.data) {
          const d = res.data;
          if (d.user) this.currentUser.set(d.user);
          if (d.tariff) this.currentTariff.set(d.tariff);
          if (d.usages) this.usages.set(d.usages);
          if (d.activePackages) this.activePackages.set(d.activePackages);
          if (d.invoices) this.invoices.set(d.invoices);
        }
      },
      error: (err) => console.error('Dashboard data fetch failed', err)
    });
  }

  updatePassword(newPass: string) {
    return this.http.post(`${this.baseUrl}/users/password`, { newPassword: newPass }).subscribe();
  }

  changeTariff(newTariff: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tariffs/change`, { tariffId: newTariff.id }).pipe(
      tap(() => this.fetchDashboardData()) // Tarife değişince güncel verileri çek
    );
  }

  buyExtraPackage(pkg: ExtraPackage, paymentMethod: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/packages/buy`, { 
      packageId: pkg.id,
      paymentMethod: paymentMethod,
      price: pkg.price,
      packageName: pkg.name,
      amount: pkg.amount,
      unit: pkg.unit
    }).pipe(
      tap(() => this.fetchDashboardData())
    );
  }

  cancelExtraPackage(packageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/packages/cancel/${packageId}`).pipe(
      tap(() => this.fetchDashboardData())
    );
  }

  addGiftInternet(gbAmount: number) {
    this.http.post(`${this.baseUrl}/packages/gift`, { amount: gbAmount, unit: 'GB' }).subscribe(() => {
      this.fetchDashboardData();
    });
  }

  addNewApplication(app: Application): Observable<any> {
    return this.http.post(`${this.baseUrl}/applications/new`, app).pipe(
      tap(() => this.fetchDashboardData())
    );
  }

  payInvoice(invoiceId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/invoices/pay`, { invoiceId }).pipe(
      tap(() => this.fetchDashboardData())
    );
  }
}
