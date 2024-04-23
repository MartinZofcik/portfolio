import prisma from '@/db/db';

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}