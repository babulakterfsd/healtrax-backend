export type TAdminAndUser = {
  email: string;
  password: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
};

export type TAdminFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
  searchTerm?: string | undefined;
};
