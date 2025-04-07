import envVar from "env-var";
import { IConfig } from "../@types/config.interface";
import { SWING_CENTRAL_API } from "../utils/constants";

export const createConfig = (): IConfig => {
  return {
    PORT: envVar.get("PORT").default("8080").asInt(),
    CENTRAL_EXCHANGE_URL: envVar
      .get("CENTRAL_EXCHANGE_URL")
      .default(SWING_CENTRAL_API)
      .asString(),
    FEDERAL_EXCHANGE_URL: envVar
      .get("FEDERAL_EXCHANGE_URL")
      .default(SWING_CENTRAL_API)
      .asString(),
    INCOMING_HTTP_TIMEOUT: envVar
      .get("INCOMING_HTTP_TIMEOUT")
      .default("5000")
      .asInt(),
    OUTGOING_HTTP_TIMEOUT: envVar
      .get("OUTGOING_HTTP_TIMEOUT")
      .default("3000")
      .asInt(),
  };
};

export const config: IConfig = createConfig();
