export type currency = 'USD' | 'EUR' | 'PLN' | 'SWD'

export interface GetCurrencyRate {
    base: currency;
    rate: number;
    target: currency;
    timestamp: number;
}