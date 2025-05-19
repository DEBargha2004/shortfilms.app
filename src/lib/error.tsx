export type ErrorCode =
  | "DUPLICATE_USER"
  | "USER_NOT_FOUND"
  | "USER_NOT_VERIFIED"
  | "INVALID_CREDENTIALS"
  | "INVALID_TOKEN"
  | "INVALID_MIMETYPE"
  | "UNKNOWN_ERROR";

type ErrorAction = () => unknown;

export const errorCodes: Record<ErrorCode, ErrorAction> = {
  DUPLICATE_USER: () => {},
  USER_NOT_FOUND: () => {},
  USER_NOT_VERIFIED: () => {},
  INVALID_CREDENTIALS: () => {},
  INVALID_TOKEN: () => {},
  INVALID_MIMETYPE: () => {},
  UNKNOWN_ERROR: () => {},
};
