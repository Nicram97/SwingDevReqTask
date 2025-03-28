import { currency, GetCurrencyRate } from "../dto/getCurrency";
import { GetCurrencyRateCentral } from "../dto/getCurrencyCentral";
import { Exchange } from "../interfaces/exchange";
import axios from "axios";

export class SwingDevCentralExchangeService implements Exchange {
  private url: string;
  // check and validate url
  constructor(url: string) {
    this.url = url;
  }

  async getExchangeRates(base: currency, target: currency) {
    try {
    const url = `${this.url}/exchange/v1`;
    const result = await axios.get(url, {
      headers: {
        'X-APIKEY': 'SWING'
      }
    });

    const responseApi = result.data as GetCurrencyRateCentral;
    let calcRate: number;

    if (target === 'USD') {
      calcRate = 1;
    } else {
      calcRate = 12;
    }
    const response = {
      base,
      target,
      rate: calcRate,
      timestamp: responseApi.time
    } as GetCurrencyRate

    return response
    } catch(e) {
        throw new Error(e.message || 'Unknow error');
    }
  }
}
