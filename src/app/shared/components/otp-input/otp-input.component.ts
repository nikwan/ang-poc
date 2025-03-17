import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-input',
  imports: [CommonModule, FormsModule],
  templateUrl: 'otp-input.component.html',
  styleUrls: ['otp-input.component.scss'],
  standalone: true
})
export class OtpInputComponent  {
  otp: string = '';  // Variable to store OTP

  @Output() otpChange: EventEmitter<string> = new EventEmitter<string>(); 
  
  onOtpChange() {
    this.otpChange.emit(this.otp);  // Emit OTP string instead of the Event object
  }

  

}
