import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.uat';


interface TxnInfo {
  // Define the structure of the transaction details response
  tid: string;
  authMod: string;
  // Add other properties as needed, depending on the API response
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  // Method to fetch transaction details
  getTransactionDetails(tid: string): Observable<TxnInfo> {
    // Construct the correct API URL with txn_id as query param and static authMod
    const apiUrl = `${environment.apiBaseUrl}nsdl-esp/authenticate/custom/auth?tid=${tid}&authMod=1`;

    return this.http.get<TxnInfo>(apiUrl);  // Return observable for the GET request
  }

}
