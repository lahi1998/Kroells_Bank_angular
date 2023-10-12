import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { TransferService } from 'src/app/Services/transfer.service';
import { Transfer } from 'src/app/Interfaces/transfer';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  TransferForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private transferService: TransferService) { }

  ngOnInit(): void {
    this.TransferForm = this.formBuilder.group({
      Amount: ['', Validators.required],
      ReciverCardNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.TransferForm.invalid) {
      return;
    }

    //
    const SenderID = 0
    const Amount = this.TransferForm.controls['Amount'].value;
    const ReciverCardNumber = this.TransferForm.controls['ReciverCardNumber'].value;


    console.log('Amount:', Amount);
    console.log('ReciverCardNumber:', ReciverCardNumber);

    const TransferObserver: Observer<Transfer[]> = {
      next(response: Transfer[]) {
        // Handle successful Transfer response here
        console.log('Transfer successful', response);
      },
      error(error: any) {
        // Handle Transfer error here
        console.error('Transfer error', error);
      },
      complete() {
      }
    };   

    this.transferService.Transfer(SenderID, Amount, ReciverCardNumber).subscribe(TransferObserver);
  }

}

