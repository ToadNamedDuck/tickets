import { Component, Input } from '@angular/core';
import { TicketComponent } from './ticket';
@Component({
    selector: 'app-ticket-list',
    template: `
        <div class="ticket-list-container">
            <app-ticket [ticket]="{title:'Ticket 1', username:'John Doe', description:'This is the first ticket.', status:1}"></app-ticket>
        </div>
    `,
    styleUrl: './ticket-list.css',
    imports: [TicketComponent]
})
export class TicketListComponent {
    @Input() tickets = [];
}