import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({ selector: '[appCurrencyFormatter]' })
export class MyCurrencyFormatterDirective implements OnInit {

  private el: any;

  private currencyPipe: CurrencyPipe;

  constructor(
    private elementRef: ElementRef
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.currencyPipe = new CurrencyPipe('en-NZ');
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    this.formatCurrency(value);
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.formatCurrency(value);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.formatCurrency(value);
  }

  private formatCurrency(value: string): void {
    console.log('value: ' + value);
    const currencyAsNumber: number = Number( value.replace(/[^0-9.]+/g, ''));
    console.log(currencyAsNumber);
    this.el.value = this.currencyPipe.transform(currencyAsNumber, 'NZD', 'symbol-narrow', '0.0-2');
  }
}
