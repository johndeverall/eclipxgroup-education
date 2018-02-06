import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { EntryComponent } from './entry/entry.component';
import {CalculationService} from './calculation.service';
import { HttpClientModule } from '@angular/common/http';
import { MyCurrencyFormatterDirective } from './shared/my-currency-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    EntryComponent,
    MyCurrencyFormatterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CalculationService, MyCurrencyFormatterDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
