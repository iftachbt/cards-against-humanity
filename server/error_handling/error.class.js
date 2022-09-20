export class ValidationError extends Error {
  code = 400;
  constructor(message) {
    super(message);
    this.message = message;
  }
}
export class NotFoundError extends Error {
  code = 404;
  constructor(message) {
    super(message);
    this.message = message;
  }
}
export class UnAuthriseError extends Error {
  code = 401;
  constructor(message) {
    super(message);
    this.message = message;
  }
}
export class InternalServerError extends Error {
  code = 500;
  constructor(message) {
    super(message);
    this.message = message;
  }
}
