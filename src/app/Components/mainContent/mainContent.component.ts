import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/Services/main.service';
import { Transactions } from 'src/app/Interfaces/transactions';
import { CardInfo } from 'src/app/Interfaces/cardInfo';
import { Profile } from 'src/app/Interfaces/profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './mainContent.component.html',
  styleUrls: ['./mainContent.component.css']
})
export class MainComponent implements OnInit {

  TransferForm!: FormGroup;
  transactions: Transactions[] = []; // Initialize an empty array to hold Transactions
  cardInfo: CardInfo[] = []; // Initialize an empty array to hold CardInfo
  profile: Profile[] = []; // Initialize an empty array to hold CardInfo

  constructor(private formBuilder: FormBuilder, private MainService: MainService) { }


  ngOnInit(): void {

    this.fetchTransactions();
    this.fetchCard();
    this.fetchProfile();
  }

  // Fetch the list of Transactions and assign it to the 'Transactions' array
  fetchTransactions() {
    const TransactionsObserver: Observer<Transactions[]> = ({
      next: (data: Transactions[]) => {
        // Update the 'Transactions' array with the fetched data
        this.transactions = data;
        console.log('Fetched Transactions:', this.transactions); // Add this line for debugging
      },
      error: (error: any) => {
        console.error('Error fetching Transactions', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    });

    this.MainService.fetchTransactions().subscribe(TransactionsObserver);
  }


  // Fetch the list of cardinfo and assign it to the 'card' array
  fetchCard() {
    const CardObserver: Observer<CardInfo[]> = ({
      next: (data: CardInfo[]) => {
        // Update the 'card' array with the fetched data
        this.cardInfo = data;
        console.log('Fetched card:', this.cardInfo); // Add this line for debugging
      },
      error: (error: any) => {
        console.error('Error fetching card', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    });

    this.MainService.fetchCard().subscribe(CardObserver);
  }


  // Fetch the list of Profile and assign it to the 'profile' array
  fetchProfile() {
    const ProfileObserver: Observer<Profile[]> = ({
      next: (data: Profile[]) => {
        // Update the 'profile' array with the fetched data
        this.profile = data;
        console.log('Fetched profile:', this.profile); // Add this line for debugging
      },
      error: (error: any) => {
        console.error('Error fetching profile', error);
      },
      complete: () => {
        // Handle completion if needed
      }
    });

    this.MainService.fetchProfile().subscribe(ProfileObserver);
  }
}