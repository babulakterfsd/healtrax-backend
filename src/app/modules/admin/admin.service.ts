import { UserRole } from '@prisma/client';
import { makePasswordHashed, prisma } from '../../utils/libs';

//create admin in database
const createAdminInDB = async (data: any) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: {
        email: data.email,
        password: await makePasswordHashed(data.password),
        role: UserRole.ADMIN,
      },
    });

    const createdAdmin = await transactionClient.admin.create({
      data: {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
      },
    });

    return createdAdmin;
  });

  return result;
};

//get all admins from database
const getAllAdmins = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminServices = {
  getAllAdmins,
  createAdminInDB,
};
