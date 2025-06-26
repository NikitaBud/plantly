import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.message).map(val => val.message).join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate field value entered for ${ Object.keys(err.keyValue) } field, please chose another value.`
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.msg = `Invalid ID: ${ err.value }, please provide a valid ID`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandler;