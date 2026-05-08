import { Routes } from '@angular/router';
import { HomePage } from '../pages/home';
import { TicketsPage } from '../pages/tickets';

export const routes: Routes = [
    { path: "", component: HomePage },
    { path: "tickets", component: TicketsPage}
];
