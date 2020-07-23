export default class CustomError extends Error {

    public message: string;
    public details: [];
    public statusCode: number;

    constructor(errors, code?: number) {
      super();
      this.message = String(errors);
      this.details = errors;
      this.statusCode = code || 500;
    }
}