import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CalculatorService, ICardResult } from '../services/calculator';

// for any missing comment, refer to the calculator-component

export interface FormCalculatorComponentValue {
  value: number;
  cards: number[];
}

// this one acts as the default "null" value
export const emptyFormCalculatorValue: FormCalculatorComponentValue = {
  value: 0,
  cards: [],
};

@Component({
  selector: 'app-form-calculator',
  templateUrl: './form-calculator.component.html',
  styleUrls: ['./form-calculator.component.css'],
})
export class FormCalculatorComponent implements ControlValueAccessor {
  @Input()
  shopId: string | number = 5;

  selected: FormCalculatorComponentValue = emptyFormCalculatorValue;

  disabled = false;
  touched = false;
  isProposing = false;
  cardComposition: ICardResult = {};

  constructor(private calculator: CalculatorService) {}

  onChange: (_value: FormCalculatorComponentValue) => any = () => {};
  onTouched: () => any = () => {};

  writeValue(value: FormCalculatorComponentValue): void {
    this.selected = value;
  }

  registerOnChange(fn: (_value: FormCalculatorComponentValue) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeAmount(value: string) {
    this.selected.value = Number(value);
  }

  onValidateAmount() {
    this.isProposing = false;
    this.calculator.getCardsForAmount(this.shopId, this.selected.value).subscribe(res => {
      this.cardComposition = res;

      if (res.equal) {
        this.onChange(this.selected);
        return;
      }

      const isOutOfRange = (res.ceil && !res.floor) || (res.floor && !res.ceil);

      if (isOutOfRange) {
        const rangeBoundary = res.ceil || res.floor;

        this.selected.value = rangeBoundary.value;
        this.onValidateAmount();
      } else {
        this.selected = emptyFormCalculatorValue;
        this.onChange(this.selected);
        this.isProposing = true;
      }
    });
  }

  onChooseCeil() {
    if (this.cardComposition.ceil) {
      this.selected.value = this.cardComposition.ceil.value;
    }
    this.onValidateAmount();
  }

  onChooseFloor() {
    if (this.cardComposition.floor) {
      this.selected.value = this.cardComposition.floor.value;
    }
    this.onValidateAmount();
  }

  getNextAmount() {
    this.calculator.getCardsForAmount(this.shopId, this.selected.value + 1).subscribe(res => {
      if (!res.ceil) {
        alert('no next amout available');
        return;
      }
      this.selected.value = res.ceil.value;
      this.onValidateAmount();
    });
  }

  getPreviousAmount() {
    this.calculator.getCardsForAmount(this.shopId, this.selected.value - 1).subscribe(res => {
      if (!res.floor) {
        alert('no previous amout available');
        return;
      }

      this.selected.value = res.floor.value;
      this.onValidateAmount();
    });
  }
}
