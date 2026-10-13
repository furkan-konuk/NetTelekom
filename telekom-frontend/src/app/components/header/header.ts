import { Component, computed, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AppStateService } from '../../core/services/app-state.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class HeaderComponent {
  private appState = inject(AppStateService);
  private router = inject(Router);

  userName = computed(() => {
    const user = this.appState.currentUser();
    return `${user.name} ${user.surname}`;
  });

  userPhone = computed(() => {
    const phone = this.appState.currentUser().phone;
    if (phone && phone.length === 10) {
      return `${phone.slice(0,3)} ${phone.slice(3,6)} ${phone.slice(6,8)} ${phone.slice(8,10)}`;
    }
    return phone;
  });

  userInitials = computed(() => {
    const user = this.appState.currentUser();
    if (user.name && user.surname) {
      return (user.name[0] + user.surname[0]).toUpperCase();
    }
    return 'U';
  });

  logout() {
    this.appState.logout();
    this.router.navigate(['/login']);
  }
}
