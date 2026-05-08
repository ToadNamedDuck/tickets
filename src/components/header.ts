import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="main-header">
        <h1 class="title">
            Duck's Ticket System
        </h1>
        <hr>
        <nav class="main-nav">
            <a class="header-nav-link" routerLink="/">Home</a>
            <a class="header-nav-link" routerLink="/tickets">Tickets</a>
        </nav>

    </header>
  `,
  styleUrl: "./header.css",
  imports: [RouterLink]
})
export class HeaderComponent {
}