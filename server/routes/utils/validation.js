import { ValidationError } from "../../error_handling/error.class.js";

export const validationMidFactory = (schema) => {
  return (req, res, next) => {
    schema
      .validate(req.body)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(new ValidationError(err.errors[0]));
      });
  };
};
