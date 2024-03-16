import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: any | any) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 422;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
