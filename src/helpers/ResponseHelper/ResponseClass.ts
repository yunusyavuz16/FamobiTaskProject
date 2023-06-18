export class Response {
  ResponseObject(errorMessage: string, error: boolean, data: any) {
    return {
      errorMessage,
      error,
      data,
    };
  }
}
