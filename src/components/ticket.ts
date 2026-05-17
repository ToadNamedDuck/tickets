import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-ticket',
    template: `
        <div class="ticket-container">
            <h3 class="ticket-title">{{ this.ticket.title }}</h3>
            <p class="ticket-description">{{ this.ticket.description }}</p>
            <div class="ticket-footer">
                <span class="ticket-status">Status: {{ isOpen(this.ticket) }}</span>
            </div>
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