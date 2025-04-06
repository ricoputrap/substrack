export enum EnumAuthMethod {
  CREDENTIALS = "credentials",
  GOOGLE = "google"
}

export enum EnumLanguage {
  EN = "en",
  ID = "id"
}

export enum EnumCurrency {
  USD = "USD",
  IDR = "IDR"
}

export enum EnumBillingCycle {
  MONTHLY = "monthly",
  YEARLY = "yearly"
}

export enum EnumHttpStatus {
  // success
  OK = 200, // The request has succeeded.
  CREATED = 201, // The request has been fulfilled and resulted in a new resource being created.
  ACCEPTED = 202, // The request has been accepted for processing, but the processing is not complete.
  NO_CONTENT = 204, // The server successfully processed the request and is not returning any content.

  // redirection
  MOVED_PERMANENTLY = 301, // This response code indicates that the requested resource has been permanently moved to a new URL.
  FOUND = 302, // This response code indicates that the requested resource resides temporarily under a different URL.
  SEE_OTHER = 303, // The response to the request can be found under another URI using a GET method. 
  NOT_MODIFIED = 304, // Indicates that there is no need to retransmit the requested resources since they have not changed. 
  TEMPORARY_REDIRECT = 307, // In this case, the user agent must not change the HTTP method used: if it was POST it must continue using POST. 
  PERMANENT_REDIRECT = 308, // This means that future requests should use another URI and should be repeated using another method (e.g., POST).

  // client errors
  BAD_REQUEST = 400, // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED = 401, // Authentication is required and has failed or has not yet been provided.
  FORBIDDEN = 403, // The client does not have access rights to the content; that is, it is unauthorized.
  NOT_FOUND= 404, // The server can’t find the requested resource.
  METHOD_NOT_ALLOWED = 405, // A request method is not supported for this route. 
  NOT_ACCEPTABLE = 406, // Server cannot produce a response matching the list of acceptable values defined in the request's headers. 
  CONFLICT = 409, // Request conflicts with current state of target resource. 
  GONE = 410, // Indicates that access to this resource is no longer available at this server and no forwarding address known. 

  // server errors
  INTERNAL_SERVER_ERROR = 500, // A generic error message indicating an unexpected condition was encountered on the server side. 
  NOT_IMPLEMENTED = 501, // The server does not support functionality required to fulfill the request. 
  BAD_GATEWAY = 502, // Received an invalid response from an upstream server while acting as a gateway or proxy. 
  SERVICE_UNAVAILABLE = 503 // The server cannot handle requests at this time (overloaded or down).
}
