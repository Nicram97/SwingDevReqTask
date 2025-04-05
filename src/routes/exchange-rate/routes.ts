/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response, Router } from "express";
import { SwingDevFederalExchangeService } from "../../services/swingDevFederalExchange.service";
import { SWING_CENTRAL_API, SWING_FEDERAL_API } from "../../utils/constants";
import { SwingDevCentralExchangeService } from "../../services/swingDevCentralExchange.service";
import { CommonCurrency } from "../../@types/commonCurrency";
import { queryParamsValidator } from "../../middleware/queryParamsValidator";
import { BaseTargetQueryDto } from "../../dto/baseTargetQuery.dto";
import { sendRequestWithFailover } from "../../utils/common.helpers";

export const routes: Router = Router();
const federalExchangeService = new SwingDevFederalExchangeService(
  SWING_FEDERAL_API
);
const centralExchangeService = new SwingDevCentralExchangeService(
  SWING_CENTRAL_API
);

// if more complicated setup would be required we could have proper type and objects in this array to pass it into "sendRequestWithFailover"
const services = [federalExchangeService, centralExchangeService];

routes.get(
  "/",
  queryParamsValidator(BaseTargetQueryDto),
  async (
    req: Request<{}, {}, {}, { base: CommonCurrency; target: CommonCurrency }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { base, target } = req.query;
      const result = await sendRequestWithFailover(services, base, target);

      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

// Legacy -> introduced during live coding before its end as a "balance between two" new solution should be easier and less code repetitive
// routes.get(
//   "/",
//   queryParamsValidator(BaseTargetQueryDto),
//   async (
//     req: Request<{}, {}, {}, { base: CommonCurrency, target: CommonCurrency}>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const { base, target } = req.query;

//       let exchangeRate: IGetCurrencyRate;
//       if (shouldFirst) {
//         exchangeRate = await federalExchangeService.getExchangeRates(
//           base as CommonCurrency,
//           target as CommonCurrency
//         );
//         shouldFirst = false;
//       } else {
//         exchangeRate = await centralExchangeService.getExchangeRates(
//           base as CommonCurrency,
//           target as CommonCurrency
//         );
//         shouldFirst = true;
//       }

//       res.status(200).json(exchangeRate);
//     } catch (e) {
//       try {
//         if (shouldFirst) {
//           const { base, target } = req.query;
//           const exchangeRate = await centralExchangeService.getExchangeRates(
//             base as CommonCurrency,
//             target as CommonCurrency
//           );
//           shouldFirst = true;
//           res.status(200).json(exchangeRate);
//         } else {
//           const { base, target } = req.query;
//           const exchangeRate = await federalExchangeService.getExchangeRates(
//             base as CommonCurrency,
//             target as CommonCurrency
//           );
//           shouldFirst = false;
//           res.status(200).json(exchangeRate);
//         }
//       } catch (err) {
//         next(err);
//       }
//     }
//   }
// );
