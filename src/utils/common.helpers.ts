import { IExchange } from "../@types/exchange";
import { IGetCurrencyRate } from "../@types/getCurrencyRate.interface";
import { CommonCurrency } from "../@types/commonCurrency";

export const getProperty = <T extends object, K extends keyof T>(
  obj: T,
  key: K
) => {
  if (key in obj) {
    return obj[key];
  }
  throw new Error(`Property ${String(key)} does not exist on provided type`);
};

let currentServiceIndex = 0;

/**
 * Take array of Exchange services get currency data and create Round Robin balancing between them
 * In the future if needed and more services were introduced add normalizing data function (multiple services return different responses but final result has to have same shape)
 * @param services : IExchange[]
 * @returns
 */
export const sendRequestWithFailover = async (
  services: IExchange[],
  base: CommonCurrency,
  target: CommonCurrency
): Promise<IGetCurrencyRate> => {
  const initialServiceIndex = currentServiceIndex;

  for (let attempt = 0; attempt < services.length; attempt++) {
    try {
      const service = services[currentServiceIndex];
      const response: IGetCurrencyRate = await service.getExchangeRates(
        base,
        target
      );
      // Move to the next service for the next request
      currentServiceIndex = (currentServiceIndex + 1) % services.length;
      return response;
    } catch (error) {
      // Move to the next service for retry
      currentServiceIndex = (currentServiceIndex + 1) % services.length;

      // If we've tried all services, throw an error
      if (currentServiceIndex === initialServiceIndex) {
        throw error;
      }
    }
  }

  throw new Error("Tried all 3rd party services, no proper response");
};
