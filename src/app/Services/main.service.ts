import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transactions } from '../Interfaces/transactions';
import { Observable, tap } from 'rxjs';
import { CardInfo } from '../Interfaces/cardInfo';
import { Profile } from '../Interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url: string = "https://localhost:8443/api/BankAPI";
  endpointGetTransactions: string = "GetTransactions"; // API endpoint to get all Transactions relates to Account.
  endpointGetCardInfo: string = "GetCard"; // API endpoint to get card information.
  endpointGetProfile: string = "FetchProfile"; // API endpoint to get/fetch the account profile.
  transaction: Transactions[] = [];

  constructor(private httpClient: HttpClient) { }

  // Fetch the list of all Transactions
  fetchTransactions(): Observable<Transactions[]> {
    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    const account_Id = this.getSessionAccountID('AccountID');
    // check token
    if (token === null) {
      console.error('JWT token not found in session fetchTransactions');
    }
    console.log(token);
    console.log(account_Id);

    const Variables = { account_Id };

    return this.httpClient.post<Transactions[]>(`${this.url}/${this.endpointGetTransactions}`, Variables);

  }


  // Fetch the card
  fetchCard(): Observable<CardInfo[]> {
    // Retrieve the JWT token from SessionStorage
    const token = this.getSessionToken('jwtToken');
    const account_Id = this.getSessionAccountID('AccountID');
    // check token
    if (token === null) {
      console.error('JWT token not found in session fetchCard');
    }
    console.log("Account ID",account_Id);

    const Variables = { account_Id };

    return this.httpClient.post<CardInfo[]>(`${this.url}/${this.endpointGetCardInfo}`, Variables);

  }


    // Fetch the Profile
    fetchProfile(): Observable<Profile[]> {
      // Retrieve the JWT token from SessionStorage
      const token = this.getSessionToken('jwtToken');
      const client_Id = this.getSessionClientID('ClientID');
      // check token
      if (token === null) {
        console.error('JWT token not found in session fetchProfile');
      }
      console.log("CLient ID",client_Id);
  
      const Variables = { client_Id };
  
      return this.httpClient.post<Profile[]>(`${this.url}/${this.endpointGetProfile}`, Variables);
  
    }

      // Functions to get a specific cookie by name
  private getSessionToken(name: string): string | null {
    return sessionStorage.getItem('jwtToken');
  }
  private getSessionAccountID(name: string): string | null {
    return sessionStorage.getItem('AccountID');
  }
  private getSessionClientID(name: string): string | null {
    return sessionStorage.getItem('ClientID');
  }
}
