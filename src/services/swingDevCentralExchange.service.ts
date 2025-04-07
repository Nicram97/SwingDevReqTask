import { IExchange } from "../@types/exchange.interface";
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
import { config } from "../config/config";
import { handleApiError } from "../utils/commonError.helpers";

export class SwingDevCentralExchangeService implements IExchange {
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
        timeout: config.OUTGOING_HTTP_TIMEOUT,
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
        rate: Math.round((calcRate + Number.EPSILON) * 100) / 100,
        timestamp: responseApi.time,
      } as IGetCurrencyRate;

      return response;
    } catch (e) {
      console.error(`Central Exchange error: ${e.message}`);
      return handleApiError(
        e,
        "Central Exchange Api failed",
        "Couldn't get data from Central Exchange"
      );
    }
  }
}
