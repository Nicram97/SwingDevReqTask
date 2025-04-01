import { NextFunction, Request, Response, Router } from "express";
import { SwingDevFederalExchangeService } from "../../services/swingDevFederalExchange.service";
import { SWING_CENTRAL_API, SWING_FEDERAL_API } from "../../utils/constants";
import { SwingDevCentralExchangeService } from "../../services/swingDevCentralExchange.service";
import { CommonCurrency } from "../../@types/commonCurrency";
import { IGetCurrencyRate } from "../../@types/getCurrencyRate.interface";

export const routes: Router = Router();
const federalExchangeService = new SwingDevFederalExchangeService(
  SWING_FEDERAL_API
);
const centralExchangeService = new SwingDevCentralExchangeService(
  SWING_CENTRAL_API
);
let shouldFirst = true;

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { base, target } = req.query;

    if (!base && !target) {
      res.status(400).json({ msg: "Missing parameters" });
    }

    let exchangeRate: IGetCurrencyRate;
    if (shouldFirst) {
      exchangeRate = await federalExchangeService.getExchangeRates(
        base as CommonCurrency,
        target as CommonCurrency
      );
      shouldFirst = false;
    } else {
      exchangeRate = await centralExchangeService.getExchangeRates(
        base as CommonCurrency,
        target as CommonCurrency
      );
      shouldFirst = true;
    }

    res.status(200).json(exchangeRate);
  } catch (e) {
    if (shouldFirst) {
      const { base, target } = req.query;
      const exchangeRate = await centralExchangeService.getExchangeRates(
        base as CommonCurrency,
        target as CommonCurrency
      );
      shouldFirst = true;
      res.status(200).json(exchangeRate);
    } else {
      const { base, target } = req.query;
      const exchangeRate = await federalExchangeService.getExchangeRates(
        base as CommonCurrency,
        target as CommonCurrency
      );
      shouldFirst = false;
      res.status(200).json(exchangeRate);
    }
    next(e);
  }
});
