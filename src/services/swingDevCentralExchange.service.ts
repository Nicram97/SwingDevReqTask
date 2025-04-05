import { Exchange } from "../@types/exchange";
import axios from "axios";
import { getProperty } from "../utils/common.helpers";
import {
  CentralCurrency,
  CommonCurrency,
  GetCentralCurrencyKeys,
} from "../@types/commonCurrency";
import {
  IGetCurrencyRate,
  IGetCurrencyRateCentral,
} from "../@types/getCurrencyRate.interface";

export class SwingDevCentralExchangeService implements Exchange {
  private url: string;
  // check and validate url
  constructor(url: string) {
    this.url = url;
  }

  async getExchangeRates(base: CommonCurrency, target: CommonCurrency) {
    try {
      const url = `${this.url}/exchange/v1`;
      const result = await axios.get(url, {
        headers: {
          "X-APIKEY": "SWING",
        },
      });

      const responseApi = result.data as IGetCurrencyRateCentral;
      let calcRate: number;

      if (base === "USD" && target === "USD") {
        calcRate = 1;
      } else if (base !== "USD" && target === "USD") {
        calcRate = getProperty(
          responseApi as GetCentralCurrencyKeys,
          base
        ).price;
      } else {
        calcRate =
          getProperty(
            responseApi as GetCentralCurrencyKeys,
            target as CentralCurrency
          ).price /
          getProperty(
            responseApi as GetCentralCurrencyKeys,
            base as CentralCurrency
          ).price;
      }
      const response = {
        base,
        target,
        rate: calcRate,
        timestamp: responseApi.time,
      } as IGetCurrencyRate;

      return response;
    } catch (e) {
      throw new Error(e.message || "Couldn't get data from Central Exchange");
    }
  }
}
