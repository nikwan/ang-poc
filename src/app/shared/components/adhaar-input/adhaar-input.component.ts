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



  hideShowInputValue() {
    this.isHidden = !this.isHidden;
  }

  @Output() text: EventEmitter<string> = new EventEmitter<string>();
  aadhaarInputValue: string = '';  // Variable to store Aadhaar input

  // Called when input changes
  onInputChange() {
    this.text.emit(this.aadhaarInputValue);  // Emit Aadhaar input value as string
  } 

 
}
