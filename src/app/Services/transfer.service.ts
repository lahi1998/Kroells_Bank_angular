import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../Interfaces/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  url: string = "https://localhost:8443/api/BankAPI";
  endpointMakeTransfer: string = "MakeTransfer"; // API endpoint to get all Transactions relates to Account.

  constructor(private httpClient: HttpClient) { }

  // transfer da money
  Transfer(SenderID: number, Amount: number, ReciverCardNumber: number): Observable<Transfer[]> {
    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    const SenderIDnew = this.getSessionAccountID('AccountID');
    // check token
    if (token === null) {
      console.error('JWT token not found in session fetchTransactions');
    }
    SenderID = Number(SenderIDnew);
    console.log('transfer service');
    console.log('SenderIDnew:', SenderIDnew);
    console.log('Amount:', Amount);
    console.log('ReciverCardNumber:', ReciverCardNumber);

    const Variables = { SenderID, Amount, ReciverCardNumber };

    return this.httpClient.post<Transfer[]>(`${this.url}/${this.endpointMakeTransfer}`, Variables );

  }

  // Functions to get a specific cookie by name
  private getSessionToken(name: string): string | null {
    return sessionStorage.getItem('jwtToken');
  }
  private getSessionAccountID(name: string): string | null {
    return sessionStorage.getItem('AccountID');
  }
}
