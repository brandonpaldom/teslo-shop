export type ErrorResponse = {
  success: false;
  message: string;
  error?: unknown;
};

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export const handleError = (
  error: unknown,
  defaultMessage: string,
): ErrorResponse => {
  console.error(defaultMessage, error);
  return {
    success: false,
    message: defaultMessage,
    error: error instanceof Error ? error.message : error,
  };
};
