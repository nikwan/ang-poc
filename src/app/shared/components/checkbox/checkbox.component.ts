import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ConsentBoxResponse {
  checked: boolean;
  content: string;
}

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css'
})
export class CheckboxComponent {

  @ContentChild("content", {static: false}) checkBoxContent!: ElementRef;

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() checkedResponse: EventEmitter<ConsentBoxResponse> = new EventEmitter<ConsentBoxResponse>();

  constructor() {}

  @Input()
  set defaultValue(value: boolean) {
    this.checked = value;
  }

  set checked(checked: boolean) {
    this._checked = checked;
    this.checkedChange.emit(this._checked);
    if (!this.checkBoxContent) {
      return;
    }
    const consentBoxResponse : ConsentBoxResponse = {
      checked: this._checked,
      content: this.checkBoxContent.nativeElement.innerText
    }
    this.checkedResponse.emit(consentBoxResponse);
  }

  get checked(): boolean {
    return this._checked;
  }

  _checked: boolean = false;

  onModelChange(e: boolean) {
    this.checked = e;
  }
}