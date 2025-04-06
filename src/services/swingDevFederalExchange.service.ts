import { CommonCurrency } from "../@types/commonCurrency";
import { IGetCurrencyRate } from "../@types/getCurrencyRate.interface";
import { IExchange } from "../@types/exchange";
import axios, { isAxiosError } from "axios";
import { ApiError } from "../errors/apiError";
import { AppError } from "../errors/appError";

export class SwingDevFederalExchangeService implements IExchange {
  private url: string;
  // check and validate url
  constructor(url: string) {
    this.url = url;
  }

  async getExchangeRates(base: CommonCurrency, target: CommonCurrency) {
    try {
      const url = `${this.url}/rates/?base=${base}&target=${target}`;
      const result = await axios.get(url);

      const response = result.data as IGetCurrencyRate;

      return response;
    } catch (e) {
      if (isAxiosError(e)) {
        throw new ApiError(
          `Federal Exchange Api failed: ${e.message}`,
          e.status
        );
      }
      throw new AppError(
        e.message || "Couldn't get data from Central Exchange"
      );
    }
  }
}
