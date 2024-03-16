import { UserRole } from '@prisma/client';
import { prisma } from '../../utils/libs';

//get all admins from database
const getAllAdmins = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: UserRole.ADMIN,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  return result;
};

export const AdminServices = {
  getAllAdmins,
};
