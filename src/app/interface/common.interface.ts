export type TUserRole = 'SUPER ADMIN' | 'ADMIN' | 'DOCTOR' | 'PATIENT';

export type TOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

export type TPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};
