import {Result} from './result';

export enum LeaseType {
  OPERATING_LEASE,
  LEASE_TO_OWN
}

export class Quote {

  constructor (public _calculation: Calculation,
               public email: string
  ) {}

  get calculation() {
    return this._calculation;
  }

}

export class Calculation {

  private _results: Array<Result> = [];

  constructor (
    public leaseAmount: string,
    private _leaseType: LeaseType = LeaseType.LEASE_TO_OWN,
    public privacyCheckbox: boolean = false,
    public quoteStatusText: string = 'Send'
  ) {
  }

  get results() {
    return this._results;
  }

  set results(results: Result[]) {
    this._results = results;
  }

  get isComplete() {
    return this._results != null;
  }

  get title() {
    if (this._leaseType === LeaseType.LEASE_TO_OWN) {
      return 'Lease to own';
    } else if (this._leaseType === LeaseType.OPERATING_LEASE) {
      return 'Operating lease';
    } else {
      return 'Lease to own'; // should never run
    }
  }

  set leaseType(leaseType: string) {
    console.log(leaseType);
    this._leaseType = LeaseType[leaseType];
  }

  get leaseType() {
    console.log(LeaseType[this._leaseType]);
    return LeaseType[this._leaseType];
  }

}
