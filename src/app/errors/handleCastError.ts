import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Cast Error',
    errorSources,
  };
};

export default handleCastError;
