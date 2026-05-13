import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-form-button",
    template: `
        <button [class]="class" [type]="type" (click)="buttonClick($event)">{{label}}</button>
        `,
})
export class FormButton {
    @Output() pressed = new EventEmitter<MouseEvent>();

    @Input() label = "";
    @Input() type = "button";
    @Input() class = "";

    buttonClick(e: Event){
        e.preventDefault();
        this.pressed.emit();
    }
}