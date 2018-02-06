export class Result {

  private _amount: string;

  private _label: string;

  private _message: string[];

  constructor(label: string, amount: string, message: string[]) {
    this._label = label;
    this._amount = amount;
    this._message = message;
  }

  get amount(): string {
    return this._amount;
  }

  get label(): string {
    return this._label;
  }

  get message(): string[] {
    return this._message;
  }

}
