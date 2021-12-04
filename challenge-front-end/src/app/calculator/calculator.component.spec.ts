import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { CalculatorService, ICardResult } from '../services/calculator';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  let input: HTMLInputElement;
  let validateButton: HTMLButtonElement;

  const calculatorServiceSpy: jasmine.SpyObj<CalculatorService> = jasmine.createSpyObj('CalculatorService', ['getCardsForAmount']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      providers: [{ provide: CalculatorService, useValue: calculatorServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    calculatorServiceSpy.getCardsForAmount.and.returnValue(
      of<ICardResult>({
        equal: { value: 5, cards: [5] },
        ceil: { value: 5, cards: [5] },
        floor: { value: 5, cards: [5] },
      })
    );

    fixture = TestBed.createComponent(CalculatorComponent);

    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
    validateButton = fixture.nativeElement.querySelector('button#validate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service for amount after validating input', () => {
    component.shopId = 8;
    input.value = '5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.amount).toEqual(5);

    validateButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(calculatorServiceSpy.getCardsForAmount.calls.mostRecent().args).toEqual([8, 5]);
  });

  it('should auto correct to match lowest possible value', () => {
    calculatorServiceSpy.getCardsForAmount.and.returnValues(
      of<ICardResult>({
        ceil: { value: 15, cards: [15] },
      }),
      of<ICardResult>({
        equal: { value: 15, cards: [15] },
        ceil: { value: 15, cards: [15] },
        floor: { value: 15, cards: [15] },
      })
    );

    component.shopId = 8;
    input.value = '5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.amount).toEqual(5);

    validateButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(calculatorServiceSpy.getCardsForAmount.calls.first().args).toEqual([8, 5]);
    expect(calculatorServiceSpy.getCardsForAmount.calls.mostRecent().args).toEqual([8, 15]);
  });

  /* other tests to implement:
   - behavior on error after validation
   - behavior on no equal amount found
     - behavior after chosing proposed amount (ceil / floor)
   - behavior of clicking next
     - successfull
     - failing
   - behavior of clicking previous
     - successfull
     - failing
   - output
   - input
  */
});
