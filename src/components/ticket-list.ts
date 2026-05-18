import { Component, Input } from '@angular/core';
import { TicketComponent } from './ticket';
@Component({
    selector: 'app-ticket-list',
    template: `
        <div class="ticket-list-container" [id]="selection" >
            @for (ticket of tickets; track ticket.id) {
                @if (selection === "Open" && ticket.isOpen === 1) {
                    <app-ticket [ticket]="ticket"></app-ticket>
                }
                @if (selection === "Closed" && ticket.isOpen === 0) {
                    <app-ticket [ticket]="ticket"></app-ticket>
                }
            }
        </div>
    `,
    styleUrl: './ticket-list.css',
    imports: [TicketComponent]
})
export class TicketListComponent {
    @Input() tickets = [{ id: 1, title: 'Default Ticket', username: 'Mr. Defaulto', description: 'This is my default ticket.', isOpen: 1 }, { id: 2, title: 'Default Ticket 2', username: 'Ms. Defaulta', description: 'This is the second default ticket.', isOpen: 0 }];
    @Input() selection = "Open";
}