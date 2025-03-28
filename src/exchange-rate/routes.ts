import { NextFunction, Request, Response, Router } from "express";
import { SwingDevFederalExchangeService } from "../services/swingDevFederalExchange.service";
import { SWING_FEDERAL_API } from "../utils/constants";
import { currency, GetCurrencyRate } from "../dto/getCurrency";

export const routes: Router = Router();
const swingDevFederalExchangeService = new SwingDevFederalExchangeService(
  SWING_FEDERAL_API
);
let shouldFirst = true;

routes.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { base, target } = req.query;

    if (!base && !target) {
      res.status(400).json({ msg: "Missing parameters" });
    }
    let exchangeRate: GetCurrencyRate;
    if (shouldFirst) {
      exchangeRate = await swingDevFederalExchangeService.getExchangeRates(
        base as currency,
        target as currency
      );
      shouldFirst = false;
    } else {
      exchangeRate = {
        rate: 1,
        base: base as currency,
        target: target as currency,
        timestamp: 123456,
      };
      shouldFirst = true;
    }

    res.status(200).json(exchangeRate);
  } catch (e) {
    if (shouldFirst) {
      const { base, target } = req.query;
      const exchange = {
        rate: 1,
        base: base as currency,
        target: target as currency,
        timestamp: 123456,
      };
      shouldFirst = true;
      res.status(200).json(exchange);
    } else {
      const { base, target } = req.query;
      const exchange = {
        rate: 25,
        base: base as currency,
        target: target as currency,
        timestamp: 123456,
      };
      shouldFirst = false;
      res.status(200).json(exchange);
    }
    next(e);
  }
});
