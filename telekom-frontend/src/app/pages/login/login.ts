import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private appState = inject(AppStateService);
  private router = inject(Router);

  customerType = signal<'Bireysel' | 'Kurumsal'>('Bireysel');
  loginType = signal<'Mobil' | 'Evde Internet'>('Mobil');
  phoneNumber = signal('');
  password = signal('');
  rememberMe = signal(true);
  keepLoggedIn = signal(true);
  showCookieConsent = signal(true);
  
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Modal State
  showResetModal = signal(false);
  resetModalTitle = signal('');
  newPassword = signal('');
  newPasswordConfirm = signal('');
  resetError = signal<string | null>(null);

  setCustomerType(type: 'Bireysel' | 'Kurumsal') {
    this.customerType.set(type);
  }

  setLoginType(type: 'Mobil' | 'Evde Internet') {
    this.loginType.set(type);
  }

  login() {
    this.errorMessage.set(null);
    if (this.phoneNumber() && this.password()) {
      this.isLoading.set(true);
      // Gerçek API'ye istek at
      this.appState.login(this.phoneNumber(), this.password()).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading.set(false);
          // Backend bağlanılamadıysa hata mesajı
          if (err.status === 0 || err.status === 404) {
             // Mock fallback için şimdilik login diyelim (geliştirme amaçlı hata durumu atlama)
             alert('Backend bağlantısı kurulamadı. Lütfen Spring Boot uygulamanızı çalıştırın.\n\nHata: ' + err.message);
          } else {
             this.errorMessage.set('Hatalı telefon numarası veya şifre girdiniz.');
          }
        }
      });

    } else {
      this.errorMessage.set('Lütfen telefon numaranızı ve şifrenizi giriniz.');
    }
  }

  forgotPassword() {
    if (!this.phoneNumber()) {
      this.errorMessage.set("Lütfen önce telefon numaranızı giriniz.");
      return;
    }
    this.resetModalTitle.set('Şifremi Unuttum');
    this.showResetModal.set(true);
    this.resetError.set(null);
    this.newPassword.set('');
    this.newPasswordConfirm.set('');
  }

  getPassword() {
    if (!this.phoneNumber()) {
      this.errorMessage.set("Lütfen önce telefon numaranızı giriniz.");
      return;
    }
    this.resetModalTitle.set('Yeni Şifre Al');
    this.showResetModal.set(true);
    this.resetError.set(null);
    this.newPassword.set('');
    this.newPasswordConfirm.set('');
  }

  submitResetPassword() {
    if (!this.newPassword() || !this.newPasswordConfirm()) {
      this.resetError.set('Lütfen tüm alanları doldurunuz.');
      return;
    }
    if (this.newPassword() !== this.newPasswordConfirm()) {
      this.resetError.set('Şifreler eşleşmiyor.');
      return;
    }
    
    // API Call
    this.appState.http.post(`${this.appState.baseUrl}/auth/reset-password`, {
      phoneNumber: this.phoneNumber(),
      newPassword: this.newPassword()
    }).subscribe({
      next: () => {
        alert('Şifreniz başarıyla güncellendi. Yeni şifrenizle giriş yapabilirsiniz.');
        this.closeResetModal();
        this.password.set('');
      },
      error: (err) => {
        this.resetError.set(err.error?.message || 'Bir hata oluştu.');
      }
    });
  }

  closeResetModal() {
    this.showResetModal.set(false);
  }

  acceptCookies() {
    this.showCookieConsent.set(false);
  }
}
