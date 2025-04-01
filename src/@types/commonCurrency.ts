import { IGetCurrencyRateCentral } from "./getCurrencyRate.interface";

export type CentralCurrency = "EUR" | "PLN" | "SWD"; // if used Omit here would cause Typescript error
export type CommonCurrency = "USD" | CentralCurrency;
export type GetCentralCurrencyKeys = Omit<IGetCurrencyRateCentral, "time">;
