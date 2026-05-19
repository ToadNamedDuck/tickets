import { Component, Input } from "@angular/core";
import { FormInput } from "../components/input";
import { FormButton } from "../components/form-button";
import { FormTextArea } from "../components/textarea";
import { Router } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";

@Component({
    selector: "edit-ticket-form",
    templateUrl: "./edit-ticket-form.html",
    styleUrl: "./new-ticket-form.css",
    imports: [FormInput, FormButton, FormTextArea],
})


export class EditTicketForm {
    constructor(private cdr: ChangeDetectorRef) {}
    router = new Router();

    ticketData: { id: number, title: string, username: string, description: string, isOpen: number, dateOpened: string, dateEdited: string | undefined } = {
        id: -1,
        title: "",
        username: "",
        description: "",
        isOpen: 0,
        dateOpened: "",
        dateEdited: undefined
    }

    ngOnInit() {
        try{
            fetch("http://localhost:3000/tickets/" + this.router.url.toString().split("/").pop())
            .then(res => res.json())
            .then(data => {
                this.ticketData = { ...this.ticketData, ...data };
            })
            .then(() => this.cdr.markForCheck())
        }
        catch(error) {
            console.error("Error fetching ticket data:", error);
            this.ticketData = {
                id: -1,
                title: "Error has occured",
                username: "",
                description: "Ticket may not exist or there was a problem fetching the ticket data.",
                isOpen: 0,
                dateOpened: "",
                dateEdited: undefined
            };
            this.cdr.markForCheck();
        }

    }


    valueChange({ field, value }: { field: string, value: string }) {

        if(field === 'title' || field === 'description') {
            this.ticketData[field] = value;
        }
    }

    onSubmit() {

        console.log("Submitting ticket:", this.ticketData);
        try {
            fetch(`http://localhost:3000/editTicket/${this.ticketData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.ticketData)
            })
            .then(() => {
                console.log("Ticket updated successfully!");
            })
            .then(() => this.router.navigate(['/tickets']))
            .catch(error => {
                console.error("Error updating ticket:", error);
            });
        }
        catch(error) {
            console.error("Error submitting ticket:", error);
        }
}

onCancel() {
    this.router.navigate(['/tickets']);
}
}