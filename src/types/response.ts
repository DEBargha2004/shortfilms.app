import { ErrorCode } from "@/lib/error";

export type ErrorResponse = { code: ErrorCode; message: string };
export type DefaultSuccessResponse = { message: string };
