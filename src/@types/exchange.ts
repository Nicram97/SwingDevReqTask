import { CommonCurrency } from "./commonCurrency";
import { IGetCurrencyRate } from "./getCurrencyRate.interface";

export interface Exchange {
  getExchangeRates: (
    base: CommonCurrency,
    target: CommonCurrency
  ) => Promise<IGetCurrencyRate>;
}
