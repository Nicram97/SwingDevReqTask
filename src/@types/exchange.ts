import { CommonCurrency } from "./commonCurrency";
import { IGetCurrencyRate } from "./getCurrencyRate.interface";

export interface IExchange {
  getExchangeRates: (
    base: CommonCurrency,
    target: CommonCurrency
  ) => Promise<IGetCurrencyRate>;
}
