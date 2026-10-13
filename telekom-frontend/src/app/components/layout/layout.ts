import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';
import { FooterComponent } from '../footer/footer';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent, ChatbotComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {}
