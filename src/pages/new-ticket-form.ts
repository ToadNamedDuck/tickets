import { Component, Input } from "@angular/core";
import { FormInput } from "../components/input";
import {FormButton} from "../components/form-button";
@Component({
    selector: "new-ticket-form",
    templateUrl: "./new-ticket-form.html",
    imports: [FormInput, FormButton],
})
export class NewTicketForm {


    ticketData: { [key: string]: string } = {
        title: "",
        username: "",
        description:""
    }


    valueChange({field, value}: {field: string, value: string}) {
        this.ticketData[field] = value;
    }

    onSubmit() {
        console.log("Submitting ticket:", this.ticketData);
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