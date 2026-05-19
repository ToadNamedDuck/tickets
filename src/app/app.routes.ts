import { Routes } from '@angular/router';
import { HomePage } from '../pages/home';
import { TicketsPage } from '../pages/tickets';
import { NewTicketForm } from '../pages/new-ticket-form';
import { EditTicketForm } from '../pages/edit-ticket-form';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "tickets", component: TicketsPage},
    { path: "newTicket", component: NewTicketForm },
    { path: "editTicket/:id", component: EditTicketForm }
];
