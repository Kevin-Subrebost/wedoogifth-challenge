import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalculatorService, ICardResult } from '../services/calculator';

// This components contains the exercises 1 and 2

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  @Input()
  shopId: string | number = 5;

  @Output()
  selected = new EventEmitter<number | null>();

  amount = 0;
  cardComposition: ICardResult = {};
  /**
   * this acts as a shortcut condition, and should be true when the component is asking for the user to select another amount between the ones proposed (ceil and floor)
   */
  isProposing = false;

  constructor(private calculator: CalculatorService) {}

  /**
   * parse the amount input value as a number to save it in the component
   * @param value inpurt value
   */
  onChangeAmount(value: string) {
    this.amount = Number(value);
  }

  /**
   * This function will ask the service to get cards for the desired amount
   *
   *   - if there is a valid card combination, it will validate emit the amount
   *
   *   - if the amount is lower than the lowest combination or higher than the highest combination,
   *      it will autocorrect to that (ceil/floor) value and repeat itself so it can validate this new amount and emit it
   *
   *   - if the amount is not possible with any combination, it will save the combination result
   *      so that the componant can propose to choose between ceil and floor values
   */
  onValidateAmount() {
    this.isProposing = false;
    this.calculator.getCardsForAmount(this.shopId, this.amount).subscribe(
      res => {
        // shortcut: !!res.ceil !== !!res.floor, but it is less readable
        const isOutOfRange = (res.ceil && !res.floor) || (res.floor && !res.ceil);

        this.cardComposition = res;

        if (res.equal) {
          this.selected.emit(this.amount);
        } else if (isOutOfRange) {
          const rangeBoundary = res.ceil || res.floor;

          this.amount = rangeBoundary.value;
          this.onValidateAmount();
        } else {
          // if the component is asking for user action, emit a null value to tell that it is in a transitory state
          this.selected.emit(null);
          this.isProposing = true;
        }
      },
      () => alert('an error occured while querying cards')
    );
  }

  /**
   * this will cause the component to call the validation on the ceil combination stored from previous api call
   */
  onChooseCeil() {
    if (this.cardComposition.ceil) {
      this.amount = this.cardComposition.ceil.value;
    }
    this.onValidateAmount();
  }

  /**
   * this will cause the component to call the validation on the floor combination stored from previous api call
   */
  onChooseFloor() {
    if (this.cardComposition.floor) {
      this.amount = this.cardComposition.floor.value;
    }
    this.onValidateAmount();
  }

  // Exercise 2
  /**
   * this will get the closest superior possible amount and validate it
   *
   * if no superior amont is available, it will alert the user and do nothing else
   */
  getNextAmount() {
    // assuming there is only integer amonts, calling the service with amount + 1 will do the trick to get the service return the closest ceil value
    this.calculator.getCardsForAmount(this.shopId, this.amount + 1).subscribe(res => {
      if (!res.ceil) {
        alert('no next amout available');
        return;
      }
      this.amount = res.ceil.value;
      this.onValidateAmount();
    });
  }

  // Exercise 2
  /**
   * this will get the closest inferior possible amount and validate it
   *
   * if no inferior amont is available, it will alert the user and do nothing else
   */
  getPreviousAmount() {
    // assuming there is only integer amonts, calling the service with amount - 1 will do the trick to get the service return the closest floor value
    this.calculator.getCardsForAmount(this.shopId, this.amount - 1).subscribe(res => {
      if (!res.floor) {
        alert('no previous amout available');
        return;
      }

      this.amount = res.floor.value;
      this.onValidateAmount();
    });
  }
}
