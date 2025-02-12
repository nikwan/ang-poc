import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isValidAadhaar } from '../../utils/aadhaar.utils';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-adhaar-input',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './adhaar-input.component.html',
  styleUrl: './adhaar-input.component.css'
})
export class AdhaarInputComponent {


  input: string = "";
  isHidden: boolean = false;
  inputError: boolean = false;

  @Input() hiddenInput: boolean = true;
  @Input() inputLabel: string = "";
  @Input() inputDescription: string = "";
  @Input() inputErrorDescription: string = "";

  @Output() text = new EventEmitter<any>();

  hideShowInputValue() {
    this.isHidden = !this.isHidden;
  }

  validateNumberInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
  
    if (allowedKeys.includes(event.key)) {
      return;
    }
  
    const isNumber = /^[0-9]$/.test(event.key);
    if (!isNumber) {
      event.preventDefault();
    }    
  }

  onInputChange() {
    this.input = this.input.replace(/\D/g, '').slice(0, 16);

    this.inputError = false;
    if (this.input.length > 0 && this.input.length < 16 && this.input.length !== 12) {
      this.inputError = true;
    }
    if (this.input.length === 16 || this.input.length === 0) {
      this.inputError = false;
    }
    if (this.input.length === 12) {
      this.inputError = !isValidAadhaar(this.input);
    }

    this.text.emit(this.input);
  }
}
