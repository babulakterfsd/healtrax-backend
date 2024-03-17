import { Prisma, UserRole } from '@prisma/client';
import {
  calculatePagination,
  makePasswordHashed,
  prisma,
} from '../../utils/libs';
import { adminSearchAbleFields } from './admin.constant';

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

//get all admins from database. or search admin by name or email . or filter admin by specific fields
const getAllAdmins = async (params: any, options: any) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const conditions: Prisma.AdminWhereInput[] = [];

  // search by name or email or contactNumber (cause adminsearchable fields are name and email and contactNumber only, currently)
  if (params.searchTerm) {
    conditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // filter by specific fields
  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // deleted accounts will never be fetched
  conditions.push({
    isDeleted: false,
  });

  const whereConditons: Prisma.AdminWhereInput = { AND: conditions };

  const result = await prisma.admin.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.admin.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AdminServices = {
  getAllAdmins,
  createAdminInDB,
};
