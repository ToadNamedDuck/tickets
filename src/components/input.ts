import { Component, Input, Output, EventEmitter, input } from "@angular/core";
@Component({
    selector: "app-form-input",
    template: `
        <input class="form-input" [type]="type" [placeholder]="placeholder" [value]="value" (input)="onInput($event)" />
        <label class="form-input-label">{{label}}</label>
        `,
    styles: `
    
    `
})
export class FormInput {
    @Output() valueChange = new EventEmitter<{field: string, value: string}>();
    @Input() label = "";
    @Input() placeholder = "";
    @Input() type = "text";
    @Input() value = "";

    onInput(e: Event) {
        e.preventDefault();
        this.valueChange.emit({field: this.label.toLowerCase(), value: (e.target as HTMLInputElement).value});
    }
}