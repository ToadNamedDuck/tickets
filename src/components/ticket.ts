import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-ticket',
    template: `
        <div class="ticket-container">
            <p class="ticket-title">{{ this.ticket.title }}</p>
            <p class="ticket-username">Submitted by: {{ this.ticket.username }}</p>
            <p class="ticket-description">{{ this.ticket.description }}</p>
            <p class="ticket-status">Status: {{ isOpen(this.ticket) }}</p>
        </div>
    `,
    styleUrl: './ticket.css'
})
export class TicketComponent {
    @Input() ticket = { title: 'Default Ticket', username: 'Mr. Defaulto', description: 'This is my default ticket.', status: 1 };

        isOpen(ticket: { status: number }): string {
        if (ticket.status === 1) {
            return "Open";
        }
        return "Closed";
    }
}