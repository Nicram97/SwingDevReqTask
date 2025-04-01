import { CommonCurrency } from "./commonCurrency";

export interface IGetCurrencyRate {
  base: CommonCurrency;
  rate: number;
  target: CommonCurrency;
  timestamp: number;
}

export interface ICentralPrice {
  price: number;
}

export interface IGetCurrencyRateCentral {
  PLN: ICentralPrice;
  SWD: ICentralPrice;
  EUR: ICentralPrice;
  time: number;
}
