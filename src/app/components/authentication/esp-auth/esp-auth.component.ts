import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { AdhaarInputComponent } from '../../../shared/components/adhaar-input/adhaar-input.component';
import { HeaderComponent } from '../../header/header/header.component';
import { CommonModule } from '@angular/common';

import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FooterComponent } from '../../footer/footer.component';
import { TxnInfo } from '../../../constants/txn-info';
import { EspConstants } from '../../../constants/esp-constants';
import { PlayAudioComponent } from '../../../shared/components/play-audio/play-audio.component';
import { OtpInputComponent } from '../../../shared/components/otp-input/otp-input.component';
import { OtpRequest, OtpResponse } from '../../../constants/otp-model';

@Component({
  selector: 'app-esp-auth',
  standalone: true,
  imports: [HeaderComponent,
    TranslateModule,
    FormsModule,
    FooterComponent,
    AdhaarInputComponent,
    CommonModule,
    AccordionComponent,
    CheckboxComponent,
    ButtonComponent,
    PlayAudioComponent,
  OtpInputComponent],
  templateUrl: './esp-auth.component.html',
  styleUrl: './esp-auth.component.css'
})
export class EspAuthComponent {

  otpEnter = false; // Track if OTP should be shown
  txnInfo = {
    signDate: '2025-01-15',
    signTime: '12:30 PM',
    aspName: 'Some ASP',
    aspTxnId: 'TXN123456'
  }; // Example txnInfo, replace with actual data
  primaryButton = { loadingText: undefined }; // Loading state for primary button
  checked = false; // Consent checkbox state
  id = ''; // The Aadhaar input ID
  idEnter = false; // Whether ID has been entered
  otpTxn = ''; // Store the OTP transaction ID after API simulation
  errorMessage: string | null = null; // To display error messages
  otp!: string;
  EspConstants = EspConstants; // Assuming you have a constants file for translation
  redirectingBackToDigio: boolean = false;
  openConfirmationModal: boolean = false;
  // Set the Aadhaar input


  @ViewChildren("primaryButton")
  primaryButtons?: QueryList<ButtonComponent>;
  @ViewChildren("errorHolder")
  errorHolder?: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren("errorHolder")
  otpError?: QueryList<ElementRef<HTMLDivElement>>;


  setAadhaarInput(event: string): void {
    this.id = event; // Capture Aadhaar input value
    this.idEnter = true;
  }

  // Handle OTP input change
  
  handleOtpChange(event: any) {
    this.otp = event;
    if (this.otp && this.otp.length === 6) {
      // this.primaryButtons!.forEach((button, index) => {
      //   button.disabled = false;
      // });
    }
  }

  

  // Submit action (simulating the API request)
  submitAction(): void {
    if (!this.id || this.id.length !== 12) {
      this.errorMessage = 'Please enter a valid Aadhaar number.';
      return;
    }

    // Simulate the API request (static response)
    this.simulateOtpRequest(this.id);
  }

  // Simulate the OTP request API
  simulateOtpRequest(aadhaar: string): void {
    // Simulate the static API response
    const response = {
      status: '0',
      frm: `<form action='/nsdl-esp/authenticate/es' id='esid' method='post'>
              <input type='hidden' id='kid' name='kid' value='1234567890123456'/>
              <input type='submit' value='submit'>
            </form>`,
      msg: 'UIDAI Authentication Error: 998, Invalid Aadhaar Number/Virtual ID. 3 attempt(s) remaining for OTP.',
      otpTxn: '1234567890123456', // Simulated OTP transaction ID
      retryCount: 3
    };

    // Handle the simulated response
    if (response.status === '0') {
      this.otpTxn = response.otpTxn;
      this.errorMessage = response.msg; // Show the error message
      this.otpEnter = true; // Don't show OTP input if error
      console.log('Simulated API Response:', response);
    } else {
      this.otpEnter = false; // Show OTP input if no error
    
    }
  }


  
  // Handle consent checkbox change
  checkChange(): void {
    this.checked = !this.checked;
  }


  showConfirmationModal() {
    this.openConfirmationModal = true;
  }

  hideConfirmationModal() {
    this.openConfirmationModal = false;
  }

  closeProcessAndRedirectToASP() {
    // let payload = {
    //   otp_txn_id: this.otpConfig.otp_txn_id,
    //   asp_txn_id: this.txnInfo.aspTxnId,
    // };
    this.redirectingBackToDigio = true;
   
  }
  submitOtp() {
    // setting the button states for submit otp to disabled and loading
    this.primaryButtons!.forEach((button, index) => {
      button.disabled = true;
      button.setLoadingWithText = EspConstants.VERIFYING_OTP;
    });

    var data = {
      otp: this.otp,
      // otp_txn_id: this.otpConfig.otp_txn_id,
    };
    
    
  }

}
