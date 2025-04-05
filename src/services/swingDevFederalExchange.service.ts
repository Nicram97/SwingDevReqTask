import { CommonCurrency } from "../@types/commonCurrency";
import { IGetCurrencyRate } from "../@types/getCurrencyRate.interface";
import { Exchange } from "../@types/exchange";
import axios from "axios";

export class SwingDevFederalExchangeService implements Exchange {
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
      throw new Error(e.message || "Couldn't extract data from Federal Exchange");
    }
  }
}
