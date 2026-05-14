import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
    selector: "app-form-textarea",
    template: `
        <div class="form-input-container">
            <label class="form-input-label" for="{{label.toLowerCase()+'-input'}}">{{label}}</label>
            <textarea id="{{label.toLowerCase()+'-input'}}" class="form-input" [placeholder]="placeholder" [value]="value" (input)="onInput($event)"></textarea>
        </div>
        `,
    styleUrl: "./input.css"
})
export class FormTextArea {
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