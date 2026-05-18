import { Component, Input } from "@angular/core";
import { FormInput } from "../components/input";
import { FormButton } from "../components/form-button";
import { FormTextArea } from "../components/textarea";
import { Router } from "@angular/router";

@Component({
    selector: "new-ticket-form",
    templateUrl: "./new-ticket-form.html",
    styleUrl: "./new-ticket-form.css",
    imports: [FormInput, FormButton, FormTextArea],
})
export class NewTicketForm {

    router = new Router();

    ticketData: { [key: string]: string } = {
        title: "",
        username: "",
        description: ""
    }


    valueChange({ field, value }: { field: string, value: string }) {
        this.ticketData[field] = value;
    }

    onSubmit() {

        console.log("Submitting ticket:", this.ticketData);
        try {
            fetch('http://localhost:3000/newTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.ticketData)
            })
            .then(res => res.json())
            .then(data => {
                console.log("Ticket created successfully:", data);
            })
            .then(() => this.router.navigate(['/tickets']))
        }
        catch(error) {
            console.error("Error submitting ticket:", error);
        }
}

onCancel() {
    console.log("Canceling ticket submission.");
    this.ticketData = {
        title: "",
        username: "",
        description: ""
    };

}
}