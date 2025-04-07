import { CommonCurrency } from "../@types/commonCurrency";
import { IGetCurrencyRate } from "../@types/getCurrencyRate.interface";
import { IExchange } from "../@types/exchange";
import axios from "axios";
import { config } from "../config/config";
import { handleApiError } from "../utils/commonError.helpers";

export class SwingDevFederalExchangeService implements IExchange {
  private url: string;
  // check and validate url
  constructor(url: string) {
    this.url = url;
  }

  async getExchangeRates(base: CommonCurrency, target: CommonCurrency) {
    try {
      const url = `${this.url}/rates/?base=${base}&target=${target}`;
      const result = await axios.get(url, {
        timeout: config.OUTGOING_HTTP_TIMEOUT,
      });

      const response = result.data as IGetCurrencyRate;

      return response;
    } catch (e) {
      return handleApiError(
        e,
        "Federal Exchange Api failed",
        "Couldn't get data from Federal Exchange"
      );
    }
  }
}
