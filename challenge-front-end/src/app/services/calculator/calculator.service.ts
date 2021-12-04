import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ICardStep {
  value: number;
  cards: number[];
}

export interface ICardResult {
  floor?: ICardStep;
  equal?: ICardStep;
  ceil?: ICardStep;
}

@Injectable()
export class CalculatorService {
  constructor(private http: HttpClient) {}

  getCardsForAmount(shopId: string | number, amount: number) {
    const headers = new HttpHeaders({ Authorization: environment.apiToken });
    const params = { amount: `${amount}` };

    return this.http.get<ICardResult>(`${environment.apiBaseUrl}/shop/${shopId}/search-combination`, { headers, params });
  }
}
