import { isAxiosError } from "axios";
import { TimeoutError } from "../errors/timeoutError";
import { ApiError } from "../errors/apiError";
import { AppError } from "../errors/appError";

export const handleApiError = (e: Error, apiErrMsg: string, appErrMsg: string) => {
  if (isAxiosError(e)) {
    if (e.code === "ECONNABORTED") {
      throw new TimeoutError(e.message);
    }
    throw new ApiError(
      `${apiErrMsg}: ${e.message}`,
      e.response?.status || e.status
    );
  }
  throw new AppError(e.message || appErrMsg);
};
