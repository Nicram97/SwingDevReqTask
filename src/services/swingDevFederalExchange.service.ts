import { currency, GetCurrencyRate } from "../dto/getCurrency";
import { Exchange } from "../interfaces/exchange";
import axios from "axios";

export class SwingDevFederalExchangeService implements Exchange {
  private url: string;
  // check and validate url
  constructor(url: string) {
    this.url = url;
  }

  async getExchangeRates(base: currency, target: currency) {
    try {
    const url = `${this.url}/rates/?base=${base}&target=${target}`;
    const result = await axios.get(url);

    const response = result.data as GetCurrencyRate;

    return response
    } catch(e) {
        throw new Error(e.message || 'Unknow error');
    }
  }
}
