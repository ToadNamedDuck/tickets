import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
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
            <button class="status-button" (click)="toggleStatus(this.ticket.id)">
                {{ isOpen(this.ticket) === 'Open' ? 'Close Ticket' : 'Reopen Ticket' }}
            </button>
            @if (isOpen(this.ticket) === 'Open') {
                <button class="edit-button" [routerLink]="['/editTicket/', this.ticket.id]">Edit Ticket</button>
            }
        </div>
    `,
    styleUrl: './ticket.css',
    imports: [RouterLink]
})



export class TicketComponent {
    constructor(private cdRef: ChangeDetectorRef) {}
    @Input() ticket = { id: <number>0, title: <string>'', username: <string>'', description: <string>'', isOpen: <number>1, dateOpened: <string>'', dateEdited: <string | undefined>undefined };
    isOpen(ticket: { isOpen: number }): string {
        if (ticket.isOpen === 1) {
            return "Open";
        }
        return "Closed";
    }

    toggleStatus(id: number): void {
        // Call the backend API to toggle the status of the ticket
        try{
            fetch(`http://localhost:3000/updateStatus/${id}`,
                {
                method: 'PATCH',
                headers:
                {
                    'Content-Type': 'application/json'
                }
                }
            )
                .then(() => {
                    // Update the ticket's status in the frontend
                    //Need toi manually trigger a refresh of the ticket list
                    if (this.ticket.isOpen === 1) {
                        this.ticket.isOpen = 0;
                    }
                    else {
                        this.ticket.isOpen = 1;
                    }
                    this.ticket.dateEdited = new Date().toISOString();
                    this.cdRef.markForCheck();
                })

        }
        catch (err) {
            console.error(err)
        }
    }
}