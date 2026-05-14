import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-form-button",
    template: `
        <button class="app-form-button" [id]="id" [type]="type" (click)="buttonClick($event)">{{label}}</button>
        `,
    styleUrl: "./form-button.css"
})
export class FormButton {
    @Output() pressed = new EventEmitter<MouseEvent>();

    @Input() label = "";
    @Input() type = "button";
    @Input() id = "";

    buttonClick(e: Event){
        e.preventDefault();
        this.pressed.emit();
    }
}