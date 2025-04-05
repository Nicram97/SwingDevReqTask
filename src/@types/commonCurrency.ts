import { IGetCurrencyRateCentral } from "./getCurrencyRate.interface";

export const currencies = ["EUR", "PLN", "SWD", "USD"] as const; // trick to have access to keys for ClassValidator and to extract types from it
export type CentralCurrency = Exclude<CommonCurrency, "USD">; // "EUR" | "PLN" | "SWD"; // if used Omit here would cause Typescript error
export type CommonCurrency = (typeof currencies)[number]; // magic trick to get type from array
export type GetCentralCurrencyKeys = Omit<IGetCurrencyRateCentral, "time">;
