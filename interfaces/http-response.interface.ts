enum HttpStatus {
  OK = 200,
}

enum ResponseMessage {
  OK = 'Ok',
  CREATED = 'Created',
  BAD_REQUEST = 'Bad Request',
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not Found',
  CONFLICT = 'Conflict',
}

export interface HttpResponse<T> {
  statusCode: HttpStatus;
  message: ResponseMessage;
  payload: T;
  errors: any[];
}