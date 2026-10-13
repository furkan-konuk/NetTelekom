import { Component, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isBot: boolean;
  time:string;

}

@Component ({
selector: 'app-chatbot',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './chatbot.html',

})
 export class ChatbotComponent implements AfterViewChecked {
   @ViewChild('chatContainer') private chatContainer!: ElementRef;

   isOpen =signal<boolean>(false);
   isTyping=signal<boolean>(false);
   userInput= signal<string>('');

   messages =signal<ChatMessage[]>([
  { 
    text: 'Merhaba! Ben NetTelekom Asistanı. Size nasıl yardımcı olabilirim?',
    isBot: true,
    time:this.getCurrentTime()


  }
  ])

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getBotResponse(input: string): string {
    const text= input.toLowerCase();

    if (text.includes('fatura') || text.includes('borç') || text.includes('ödeme')) {
      return 'Fatura bilgilerinizi "Fatura İşlemlerim" menüsünden veya ana sayfadaki "Hemen Öde" butonuna tıklayarak görüntüleyebilirsiniz.';
    } 
    // Eğer tarife kelimeleri geçiyorsa:
    else if (text.includes('tarife') || text.includes('paket') || text.includes('internet')) {
      return 'Mevcut tarife ve paket detaylarınızı "Tarife ve Paketlerim" menüsünden inceleyebilirsiniz. Ek internet ihtiyacınız varsa "Ek Paket Al" menüsünü kullanabilirsiniz.';
    } 
    // Selamlaşma ise:
    else if (text.includes('merhaba') || text.includes('selam')) {
      return 'Merhaba! Size tarife değişikliği, fatura ödeme veya diğer işlemlerinizde yardımcı olabilirim.';
    }
    // Hiçbirini anlamadıysa standart bir cevap ver:
    return 'Anladım. Size daha iyi yardımcı olabilmem için sorunuzu biraz daha detaylandırabilir misiniz? Veya ilgili menülerden işlemlerinize devam edebilirsiniz.';
  }

  togglechat() {
    this.isOpen.set(!this.isOpen());
  }

  sendMessage() {
    if (!this.userInput().trim()) return;

    const userMessage: ChatMessage = {
      text: this.userInput(),
      isBot: false,
      time: this.getCurrentTime()
    };

    this.messages.update(m => [...m, userMessage]);
    this.userInput.set('');
    this.isTyping.set(true);


    setTimeout( () => {
      
      const botResponse: ChatMessage = {
        text: this.getBotResponse(userMessage.text),
        isBot: true,
        time: this.getCurrentTime()


      }
      this.messages.update(m => [...m, botResponse]);
      this.isTyping.set(false);



    }, 1500);
  }

  
   


 }
