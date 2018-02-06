import { Component, OnInit } from '@angular/core';
import {CalculationService} from '../calculation.service';
import { Result } from '../shared/result';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})

export class EntryComponent implements OnInit {

  leaseAmount: string = '0';

  /* Holds the calculation results */
  results: Array<Result> = [];

  agreedToPrivacyPolicy: boolean = false;

  leaseType: string = 'operating-lease';

  isValidQuote: boolean = false;

  calculationType: any = 'calculate-affordability';

  email: string = '';

  isInError: boolean = false;

  emailSendText: string = 'Send';

  leaseTypeTitle: string = 'Operating Lease';

  constructor(private _calculator: CalculationService) {
  }

  ngOnInit() {
    this._calculator.amountObservable
      .subscribe(res => this.leaseAmount =
        new CurrencyPipe('en-NZ').transform(res, 'NZD', 'symbol-narrow', '0.0-2'));
    this._calculator.resultsObservable.subscribe(res => {
      this.results = res;

      const isInError = function (results: Array<Result>): boolean {
        let errorCount: number = 0;

        for (let i: number = 0; i < results.length; i++) {
          if (results[i].amount === null) {
            errorCount++;
          }
        }

        if (errorCount === 5) {
          return true;
        } else {
          return false;
        }
      };

      if (isInError(res)) {
        this.emailSendText = 'Please enter valid amount';
        this.isInError = true;
      } else {
        this.isInError = false;
        this.emailSendText = 'Send';
      }
    });

    // this._calculator.isValidQuoteObservable.subscribe(res => this.isValidQuote = res);
    this.calculate();
  }

  togglePrivacy() {
    this.agreedToPrivacyPolicy = !this.agreedToPrivacyPolicy;
    this.emailSendText = 'Send';
  }

  calculate() {
    this._calculator.amount = Number( this.leaseAmount.replace(/[^0-9.]+/g, ''));
    // this.setSendText();
  }

  setSendText() {
    console.log('Valid quote: ' + this.isValidQuote);
    if (this.isValidQuote === true) {
      this.emailSendText = 'Send';
    } else {
      this.emailSendText = 'Enter amount';
    }
  }

  /*selectedCalculation(selection) {
    this.calculationType = selection;
    this._calculator.calculationType = selection;
    this.emailSendText = 'Send';
  }*/

  selectedLeaseType(selection) {
    this.leaseType = selection;
    this._calculator.leaseType = selection;
    this.emailSendText = 'Send';
    if (selection === 'v5-operating-lease-eclipx') {
      this.leaseTypeTitle = 'Operating lease';
    } else if (selection === 'v5-lease-to-own-eclipx') {
      this.leaseTypeTitle = 'Lease to own';
    } else {
      this.leaseTypeTitle = 'Operating lease';
    }
  }

  emailQuote() {
    console.log('Privacy policy checked: ' + this.agreedToPrivacyPolicy);
    if (this.agreedToPrivacyPolicy && !this.isInError) {
      this._calculator.emailQuote(this.email);
      this.emailSendText = 'Sent';
      this.email = '';
    } else if (this.agreedToPrivacyPolicy && this.isInError) {
      this.emailSendText = 'Please enter valid amount';
    } else {
      this.emailSendText = 'Privacy statement required';
    }
  }

}
