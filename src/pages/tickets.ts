import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TicketListComponent } from "../components/ticket-list";
@Component({
    selector: "app-tickets",
    templateUrl: "./tickets.html",
    styleUrl: "./tickets.css",
    imports: [RouterLink, TicketListComponent]
})
export class TicketsPage {}