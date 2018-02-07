import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Result } from './shared/result';

// https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b */

@Injectable()
export class CalculationService {

  // Amount entered by the user
  private _amount = new BehaviorSubject<number>(0);
  amountObservable = this._amount.asObservable();

  // Calculation Type: Repayments or Affordability
  private _calculationType;

  // Lease Type: Lease to own or Operating lease
  private _leaseType = 'v5-operating-lease-eclipx-education';

  // Results back from the calculator service
  private results = new BehaviorSubject<Array<Result>>([]);
  resultsObservable = this.results.asObservable();

  // private host: string = 'api.quotecrunchers.com';
  private host: string = 'quotecrunchers.com:8888';

  private _isValidQuote = new BehaviorSubject<boolean>(false);
  isValidQuoteObservable = this._isValidQuote.asObservable();

  // private host: string = '13.90.197.86';
  constructor(private http: HttpClient) {
  }

  calculate() {
    const results = [];
    const url: string =
      'http://' + this.host + '/' + this._leaseType + '/calculate?amount=' + this._amount.getValue();
      // + '&taxBracket=Business&gstRegistered=true';

    let errors: number = 0;
    this.http.get(url).subscribe(data => {
      const resultJSON: ResultJSON = <ResultJSON>data;
      // this._calculationErrorCount.next(0);
      if (resultJSON.month12.errors.length > 0) {
        results.push(new Result(resultJSON.month12.errors[0], null, resultJSON.month12.errors));
        // this._calculationErrorCount.next(this._calculationErrorCount.getValue() + 1);
        errors++;
      } else {
        results.push(new Result('12 months', resultJSON.month12.box1.calculationResult, resultJSON.month12.errors));
      }

      if (resultJSON.month24.errors.length > 0) {
        results.push(new Result(resultJSON.month24.errors[0], null, resultJSON.month24.errors));
        // this._calculationErrorCount.next(this._calculationErrorCount.getValue() + 1);
        errors++;
      } else {
        results.push(new Result('24 months', resultJSON.month24.box1.calculationResult, resultJSON.month24.errors));
      }

      if (resultJSON.month36.errors.length > 0) {
        results.push(new Result(resultJSON.month36.errors[0], null, resultJSON.month36.errors));
        // this._calculationErrorCount.next(this._calculationErrorCount.getValue() + 1);
        errors++;
      } else {
        results.push(new Result('36 months', resultJSON.month36.box1.calculationResult, resultJSON.month36.errors));
      }

      if (resultJSON.month48.errors.length > 0) {
        results.push(new Result(resultJSON.month48.errors[0], null, resultJSON.month48.errors));
        // this._calculationErrorCount.next(this._calculationErrorCount.getValue() + 1);
        errors++;
      } else {
        results.push(new Result('48 months', resultJSON.month48.box1.calculationResult, resultJSON.month48.errors));
      }

      if (resultJSON.month60.errors.length > 0) {
        results.push(new Result(resultJSON.month60.errors[0], null, resultJSON.month60.errors));
        // this._calculationErrorCount.next(this._calculationErrorCount.getValue() + 1);
        errors++;
      } else {
        results.push(new Result('60 months', resultJSON.month60.box1.calculationResult, resultJSON.month60.errors));
      }

      this.results.next(results);

     /* if (errors === 5) {
        this._isValidQuote.next(false);
      } else {
        this._isValidQuote.next(true);
      }*/

      errors = 0;
    });
  }

  public emailQuote(email: string) {
    // if (this._calculationErrorCount.getValue() === 5) {
    //  return;
    // }

    // const url: string = 'http://' + this.host + '/'
    //  + this._leaseType + '/sendEmail?amount='
    //  + this._amount.getValue()
    //  + '&taxBracket=Business&gstRegistered=true&email='
    //  + email;

    const url: string = 'http://' + this.host + '/' + this._leaseType + '/sendEmail';

    const body: any = {
      amount: this._amount.getValue(),
      productName: this._leaseType,
      email: email
    };

    this.http.post(url, body).subscribe(data => {
      console.log(data);
    });
  }

  public set amount(amount) {
    this._amount.next(amount);
    console.log(amount);
    this.calculate();
  }

  public set calculationType(calculationType: string) {
    console.log(calculationType);
    this._calculationType = calculationType;
    this.calculate();
  }

  public set leaseType(leaseType: string) {
    console.log(leaseType);
    this._leaseType = leaseType;
    this.calculate();
  }
}

export interface Box1 {
  calculationKey: string;
  calculationLabel: string;
  calculationResult: string;
  unroundedResult: number;
}

export interface Box2 {
  calculationKey: string;
  calculationLabel: string;
  calculationResult: string;
  unroundedResult: number;
}

export interface Month12 {
  box1: Box1;
  box2: Box2;
  errors: string[];
  error_data: string[];
}

export interface Month24 {
  box1: Box1;
  box2: Box2;
  errors: string[];
  error_data: string[];
}

export interface Month36 {
  box1: Box1;
  box2: Box2;
  errors: string[];
  error_data: string[];
}

export interface Month48 {
  box1: Box1;
  box2: Box2;
  errors: string[];
  error_data: string[];
}

export interface Month60 {
  box1: Box1;
  box2: Box2;
  errors: string[];
  error_data: string[];
}

export interface ResultJSON {
  month12: Month12;
  month24: Month24;
  month36: Month36;
  month48: Month48;
  month60: Month60;
}
