import { ErrorCode } from "@/lib/error";

export type ErrorResponse = { code: ErrorCode; message: string };
export type DefaultAppError = {
  message: string;
  error: string;
  statusCode: number;
};
export type DefaultSuccessResponse<T extends any = undefined> =
  T extends undefined
    ? { message: string }
    : {
        message: string;
        data: T;
      };
