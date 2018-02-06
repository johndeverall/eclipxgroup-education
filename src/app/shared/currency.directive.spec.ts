import {MyCurrencyFormatterDirective} from './my-currency-formatter.directive';

describe('CurrencyDirective', () => {
  it('should create an instance', () => {
    const directive = new MyCurrencyFormatterDirective(null);
    expect(directive).toBeTruthy();
  });
});
