import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TicketListComponent } from "../components/ticket-list";
@Component({
    selector: "app-tickets",
    templateUrl: "./tickets.html",
    styleUrl: "./tickets.css",
    imports: [RouterLink, TicketListComponent]
})
export class TicketsPage implements OnInit {
    api = 'http://localhost:3000/tickets';
    tickets: any[] = [];

    constructor(private cdr: ChangeDetectorRef) {}

    async ngOnInit() {
        try {
            const res = await fetch(this.api);
            if (!res.ok) {
                throw new Error(`Failed to fetch tickets: ${res.status}`);
            }
            this.tickets = await res.json();
            this.cdr.markForCheck();  // Tell Angular to update the view
        }
        catch (err) {
            console.error('Error fetching tickets:', err);
            this.tickets = [];
        }
    }
}