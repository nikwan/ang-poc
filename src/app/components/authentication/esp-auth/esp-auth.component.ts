import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { AdhaarInputComponent } from '../../../shared/components/adhaar-input/adhaar-input.component';
import { HeaderComponent } from '../../header/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AccordionComponent } from '../../../shared/components/accordion/accordion.component';
import { CheckboxComponent } from '../../../shared/components/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FooterComponent } from '../../footer/footer.component';
import { TxnInfo } from '../../../constants/txn-info';
import { EspConstants } from '../../../constants/esp-constants';
import { PlayAudioComponent } from '../../../shared/components/play-audio/play-audio.component';
import { OtpInputComponent } from '../../../shared/components/otp-input/otp-input.component';
import { OtpRequest, OtpResponse } from '../../../constants/otp-model';
import { EsignService } from '../../../api/esign.service';

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
  txnInfo: any = {}; // To hold transaction info
  otpEnter: boolean = false;
  id: string = ''; // Aadhaar VID
  otp: string = ''; // OTP from user input
  checked: boolean = false; // To track if consent checkbox is checked
  transactionId: string = '';  // Initialize with an empty string
  authMod: string = '1';  // Default to '1' for OTP
  tid: string = '';
  requestId: string = '174218767406929256';  // Example request ID, this should be dynamically generated
  retryCount: number = 1;  // Retry count (initially 1)
  loading: boolean = false;  // Manage button loading state
 // Example txnInfo, replace with actual data
  primaryButton = { loadingText: undefined }; // Loading state for primary button

  idEnter = false; // Whether ID has been entered
  otpTxn = ''; // Store the OTP transaction ID after API simulation
  errorMessage: string | null = null; // To display error messages
 
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

 
  
  constructor(private route: ActivatedRoute,private esignService: EsignService) { }

  ngOnInit(): void {
    // Extract the txn_id query parameter from the URL
    this.tid = this.route.snapshot.queryParamMap.get('txn_id') || '';
    if (this.tid) {
      this.fetchTransactionDetails();  // Fetch transaction details if txn_id is available
    } else {
      console.error('Transaction ID is missing!');
    }
  }

  // Method to fetch transaction details
  fetchTransactionDetails() {
    this.esignService.getTransactionDetails(this.tid).subscribe(
      (response) => {
        this.txnInfo = response;  // Store the transaction details
        console.log('Transaction details:', response);
      },
      (error) => {
        console.error('Error fetching transaction details', error);
      }
    );
  }
  // Function to handle OTP request
  submitAction() {
    if (this.id.length === 12 || this.id.length === 16) {
      this.loading = true;  // Enable the loading state of the button

      this.esignService.sendOtp(this.id, this.requestId, this.retryCount).subscribe(
        (response) => {
          if (response.status === '1') {
            console.log('OTP sent successfully:', response);
            // Handle the OTP sent logic
            // Example: Show a success message or go to next step
          } else {
            console.error('OTP sending failed:', response.msg);
            // Handle failure (e.g., show an error message)
          }
        },
        (error) => {
          console.error('Error occurred:', error);
          // Handle any errors (e.g., show an error message)
        },
        () => {
          this.loading = false;  // Reset loading state after the request completes
        }
      );
    } else {
      console.error('Invalid Aadhaar length');
    }
  }

  handleOtpChange(otp: string): void {
    this.otp = otp;  // Store the OTP value in the component
    console.log("OTP changed:", otp);  // You can use the OTP as needed
  }
  setAadhaarInput(event: string): void {
    this.id = event;  // Set the Aadhaar input value
    console.log("Aadhaar input changed:", event);  // You can use the value as needed
  }
  // Function to submit OTP
  verifyOtp() {
    this.esignService.submitOtpAction(this.otp).subscribe(
      (response) => {
        console.log('OTP verification successful', response);
        // Handle success, perhaps redirect or update UI
      },
      (error) => {
        console.error('Error verifying OTP', error);
      }
    );
  }

  // Consent checkbox handler
  checkChange() {
    this.checked = !this.checked;
  }

  // Show confirmation modal
  showConfirmationModal() {
    this.openConfirmationModal = true;
  }

  // Close confirmation modal and redirect (you can define this method as needed)
  closeProcessAndRedirectToASP() {
    this.openConfirmationModal = false;
    // Logic for redirecting
  }

  hideConfirmationModal() {
    this.openConfirmationModal = false;
  }
}

 

  

  

  
  


