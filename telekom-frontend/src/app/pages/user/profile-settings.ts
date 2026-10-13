import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-settings.html'
})
export class ProfileSettingsComponent implements OnInit {
  appState = inject(AppStateService);

  activeTab = signal<'iletisim' | 'sifre'>('iletisim');
  
  isSuccess = signal<boolean>(false);
  successMessage = signal<string>('');

  profile = {
    email: '',
    phone: '',
    address: ''
  };

  passwords = {
    current: '',
    newPass: '',
    newPassConfirm: ''
  };

  ngOnInit() {
    const user = this.appState.currentUser();
    if (user) {
      this.profile = {
        email: (user as any).email || 'furkan@example.com',
        phone: user.phone || '0555 123 45 67',
        address: (user as any).address || 'Atatürk Mh. Cumhuriyet Cd. No:1 D:2 İstanbul'
      };
    }
  }

  setTab(tab: 'iletisim' | 'sifre') {
    this.activeTab.set(tab);
    this.isSuccess.set(false);
  }

  saveProfile() {
    this.successMessage.set('İletişim bilgileriniz başarıyla güncellendi.');
    this.isSuccess.set(true);
    setTimeout(() => this.isSuccess.set(false), 3000);
  }

  updatePassword() {
    if (this.passwords.newPass && this.passwords.newPass === this.passwords.newPassConfirm) {
      this.successMessage.set('Şifreniz başarıyla değiştirildi.');
      this.isSuccess.set(true);
      this.passwords = { current: '', newPass: '', newPassConfirm: '' };
      setTimeout(() => this.isSuccess.set(false), 3000);
    } else {
      alert("Şifreler uyuşmuyor!");
    }
  }
}
