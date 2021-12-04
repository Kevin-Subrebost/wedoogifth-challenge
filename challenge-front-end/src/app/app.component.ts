import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Wedoogift Exercises';

  calculatorForm: FormGroup;

  constructor() {
    this.createForm();
  }

  createForm() {
    this.calculatorForm = new FormGroup({
      cardCombination: new FormControl({
        value: 0,
        cards: [],
      }),
    });
  }

  onAmountChanged(value: number) {
    console.log('In App, amount changed', value);
  }
}
