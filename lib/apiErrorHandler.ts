/**
 * Common API Error Response Interface
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[] | string>;
  code: number;
}

/**
 * Common API Success Response Interface
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
  code?: number;
}

/**
 * Unified API Response Type
 */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Handle API errors consistently
 * Returns a standardized error response object instead of throwing
 */
export async function handleApiError(
  error: unknown,
  defaultMessage: string = "An unexpected error occurred"
): Promise<ApiErrorResponse> {
  console.error("API Error:", error);

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message || defaultMessage,
      code: 500,
    };
  }

  return {
    success: false,
    message: defaultMessage,
    code: 500,
  };
}

/**
 * Process API response and return standardized format
 */
export async function processApiResponse<T = any>(
  response: Response,
  defaultErrorMessage: string = "Request failed"
): Promise<ApiResponse<T>> {
  try {
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || defaultErrorMessage,
        errors: data.errors,
        code: response.status,
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data || data,
      code: response.status,
    };
  } catch (parseError) {
    // If JSON parsing fails, try to get text
    const text = await response.text().catch(() => "");
    return {
      success: false,
      message: text || defaultErrorMessage,
      code: response.status,
    };
  }
}

