# Challenge Front End

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6 so it can match the desired Angular version with the 5.2.

## GetStarted

Open a command line in this folder and do:

- `npm install`
- `ng serve` or `npm start`

And that's it.

If you want to run tests, do `ng test`.

## Summmary

This app is containing two components and a service:

- **[CalculatorComponent](https://github.com/Kevin-Subrebost/wedoogifth-challenge/blob/main/challenge-front-end/src/app/calculator/calculator.component.ts)**
  - This component is the one asked for exercise 1 and 2 of the challenge
- **[FormCalculatorComponent](https://github.com/Kevin-Subrebost/wedoogifth-challenge/blob/main/challenge-front-end/src/app/form-calculator/form-calculator.component.ts)**
  - This component is the one asked for exercise 3 of the challenge, it is usable inside a ReactiveForm (FormGroup)
- **[CalculatorService](https://github.com/Kevin-Subrebost/wedoogifth-challenge/blob/main/challenge-front-end/src/app/services/calculator/calculator.service.ts)**
  - This service is responsible for asking the api for cards for a specific amount

Only the **CalculatorComponent** has a test file attached to it. This test file isn't doing all the needed tests to ensure proper maintainability, but it has some tests to show I can write them. (plus some TODO tests in comment)

The environments are in the repo because there is no sensible data exposed through them here, so it makes it easier to run this exercise project without actual drawbacks.
