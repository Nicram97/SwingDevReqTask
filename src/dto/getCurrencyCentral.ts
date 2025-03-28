export interface CentralCurrency {
  price: number;
}

export interface GetCurrencyRateCentral {
  PLN: CentralCurrency;
  SWD: CentralCurrency;
  EUR: CentralCurrency;
  time: number;
}
