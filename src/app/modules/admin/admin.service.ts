import { prisma } from '../../utils/libs';

//get all admins from database
const getAllAdmins = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminServices = {
  getAllAdmins,
};
