import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormCalculatorComponent } from './form-calculator/form-calculator.component';
import { CalculatorService } from './services/calculator';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, FormCalculatorComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [CalculatorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
