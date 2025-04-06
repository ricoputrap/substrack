import { EnumHttpStatus } from "@/constants";

/**
 * Creates a JSON response with the given status and body.
 *
 * @param status The HTTP status of the response.
 * @param body The JSON-serializable body of the response.
 * @returns A Response object with the given status and body.
 */
export function createResponse<T>(status: EnumHttpStatus, body?: T): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

interface IErrorBody {
  message: string,
  errors?: Record<string, string[]>
}

/**
 * Creates a JSON response with the given status and an error body.
 *
 * @param status The HTTP status of the response.
 * @param message The error message.
 * @param errors An optional map of field names to error messages.
 * @returns A Response object with the given status and an error body.
 */
export function createErrorResponse(
  status: EnumHttpStatus,
  message: string,
  errors?: Record<string, string[]>
): Response {
  const body: IErrorBody = {
    message,
    errors
  }

  return createResponse<IErrorBody>(status, body);
}