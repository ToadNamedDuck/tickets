import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-ticket',
    template: `
        <div class="ticket-container">
            <p class="ticket-title">{{ this.ticket.title }}</p>
            <p class="ticket-username">Submitted by: {{ this.ticket.username }}</p>
            <p class="ticket-description">{{ this.ticket.description }}</p>
            <p class="ticket-status">Status: {{ isOpen(this.ticket) }}</p>
            <p class="ticket-date">Date Opened: {{ this.ticket.dateOpened }}</p>
            @if (this.ticket.dateEdited) {
                <p class="ticket-date">Date Edited: {{ this.ticket.dateEdited }}</p>
            }
                @else {
                <p class="ticket-date">Date Edited: N/A</p>
            }
        </div>
    `,
    styleUrl: './ticket.css'
})



export class TicketComponent {

    @Input() ticket = { title: <string> '', username: <string> '', description: <string> '', isOpen: <number> 1, dateOpened: <string> '', dateEdited: <string | undefined> undefined};

        isOpen(ticket: { isOpen: number }): string {
        if (ticket.isOpen === 1) {
            return "Open";
        }
        return "Closed";
    }
}