import { z } from 'zod';

export const adminCreateValidationSchema = z.object({
  email: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
  password: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
  name: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
  profilePhoto: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  contactNumber: z.string({
    invalid_type_error: ' must be string',
    required_error: ' is required',
  }),
});

export const adminUpdateValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
  contactNumber: z
    .string({
      invalid_type_error: ' must be string',
      required_error: ' is required',
    })
    .optional(),
});
