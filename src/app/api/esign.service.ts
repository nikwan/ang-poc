import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TxnInfo } from '../constants/txn-info';

@Injectable({
  providedIn: 'root',
})
export class EsignService {
    private isApiCalled = false;  // Flag to check if the API has been called

    constructor(private http: HttpClient) {}
  
    // Method to call the e-sign document API (POST request)
    postEsignDoc(data: any): Observable<any> {
      if (this.isApiCalled) {
        console.log("API has already been called.");
        return new Observable();  // Return an empty observable if the API was already called
      }
  
      const url = `${environment.apiBaseUrl}custom/esign-doc/`;  // Adjust the URL as needed
      this.isApiCalled = true;  // Set the flag to true to prevent further calls
      return this.http.post<any>(url, data);  // Make the API call
    }
  /**
   * 2. Fetch transaction details
   * @param authMod - Authentication mode
   * @param txnId- Transaction ID to fetch details
   * @returns Observable<any> - The observable for the GET request
   */
  getTransactionDetails(tid: string): Observable<any> {
    // const url = `${environment.apiBaseUrl}custom/txn-details/${tid}`;  // Endpoint for GET request
    const url = `${environment.apiBaseUrl}custom/txn-details/${tid}`; 
    console.log('Fetching transaction details for tid:', tid);
    return this.http.get<TxnInfo>(url);  // Return observable for the GET request
  }

  // 2. Get OTP
  private apiUrl = `${environment.apiBaseUrl}authenticate/otp`;  // Full OTP API URL
  sendOtp(aadhaar: string, requestId: string, retryCount: number): Observable<any> {
    const body = {
      aadhaar: aadhaar,
      requestId: requestId,
      retryCount: retryCount,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.apiUrl, body, { headers: headers });
  }

  // 3. Submit OTP Action
  submitOtpAction(otp: string): Observable<any> {
    const url = `${environment.apiBaseUrl}/authenticate/otpAction`;
    const body = { otp };
    return this.http.post<any>(url, body);
  }

  // Other API calls can be added similarly as needed.
}
