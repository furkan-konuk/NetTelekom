import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-cards.html'
})
export class SavedCardsComponent {
  cards = signal([
    { id: 1, type: 'Mastercard', last4: '5432', expiry: '12/25', name: 'Ahmet Yılmaz', icon: 'mastercard' },
    { id: 2, type: 'Visa', last4: '9876', expiry: '08/26', name: 'Ahmet Y.', icon: 'visa' }
  ]);

  showAddModal = signal<boolean>(false);
  
  newCard = {
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  };

  openAddModal() {
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  saveCard() {
    if (this.newCard.number.length > 4) {
      const last4 = this.newCard.number.slice(-4);
      const isVisa = this.newCard.number.startsWith('4');
      
      this.cards.update(cards => [...cards, {
        id: Date.now(),
        type: isVisa ? 'Visa' : 'Mastercard',
        last4: last4,
        expiry: this.newCard.expiry || '12/29',
        name: this.newCard.name || 'Yeni Kart',
        icon: isVisa ? 'visa' : 'mastercard'
      }]);
    }
    this.showAddModal.set(false);
    this.newCard = { name: '', number: '', expiry: '', cvc: '' };
  }

  deleteCard(id: number) {
    this.cards.update(cards => cards.filter(c => c.id !== id));
  }
}
