export default class ResponseError extends Error {
  message = '';
  code = 0;

  static instance: ResponseError;

  static getInstance() {
    // create a singleton of response.
    if (!ResponseError.instance) {
      ResponseError.instance = new ResponseError();
    }
    return ResponseError.instance;
  }
  static throw(error: unknown | string, code: number): ResponseError {
    const response = ResponseError.getInstance();

    if (typeof error === 'string') {
      response.message = error;
    } else {
      response.message = ((error)as any).message;
    }

    response.code = code;
    return response;
  }
}
