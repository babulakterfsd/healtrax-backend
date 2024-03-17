export type TUserRole = 'SUPER ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

export type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};
