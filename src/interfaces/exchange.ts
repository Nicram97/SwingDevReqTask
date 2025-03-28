import { currency, GetCurrencyRate } from "../dto/getCurrency"

export interface Exchange {

    getExchangeRates: (base: currency, target: currency) => Promise<GetCurrencyRate>;
}