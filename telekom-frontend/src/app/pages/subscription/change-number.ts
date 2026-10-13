import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-number.html'
})
export class ChangeNumberComponent {
  searchPattern = signal<string>('');
  availableNumbers = signal<string[]>([]);
  selectedNumber = signal<string | null>(null);
  
  showModal = signal<boolean>(false);
  isSuccess = signal<boolean>(false);

  searchNumbers() {
    // Mock search
    const pattern = this.searchPattern();
    const base = ['555', '505', '532'];
    const results = [];
    for(let i=0; i<6; i++) {
      const prefix = base[Math.floor(Math.random() * base.length)];
      const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
      let num = `0${prefix} ${suffix.slice(0,3)} ${suffix.slice(3,5)} ${suffix.slice(5)}`;
      if (pattern && pattern.length > 2) {
        num = `0${prefix} ${pattern}${suffix.slice(0, 7 - pattern.length)}`;
      }
      results.push(num);
    }
    this.availableNumbers.set(results);
    this.selectedNumber.set(null);
  }

  selectNumber(num: string) {
    this.selectedNumber.set(num);
  }

  openModal() {
    if (this.selectedNumber()) {
      this.showModal.set(true);
    }
  }

  closeModal() {
    this.showModal.set(false);
  }

  confirmChange() {
    this.showModal.set(false);
    this.isSuccess.set(true);
  }
}
