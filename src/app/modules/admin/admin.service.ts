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

//get all admins from database. or search admin by name or email
const getAllAdmins = async (req: any) => {
  const params = req?.query;
  let result = await prisma.admin.findMany();

  if (params?.name || params?.email) {
    result = await prisma.admin.findMany({
      where: {
        OR: [
          {
            name: {
              contains: params?.name,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: params?.email,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  return result;
};

export const AdminServices = {
  getAllAdmins,
  createAdminInDB,
};
