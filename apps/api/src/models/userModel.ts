// import { PrismaClient, Role } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// export const createUser = async (
//   email: string,
//   password: string,
//   role: Role,
//   referralCode?: string,
// ) => {
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error('Email already in use');
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   if (referralCode) {
//     const referrer = await prisma.user.findUnique({
//       where: { referralCode },
//     });

//     if (!referrer) {
//       throw new Error('Invalid referral code');
//     }

//     await prisma.user.update({
//       where: { referralCode },
//       data: { points: { increment: 10 } },
//     });
//   }

//   const newUser = await prisma.user.create({
//     data: {
//       email: email,
//       name: ' ',
//       password: hashedPassword,
//       role: role,
//       referralCode: referralCode || generateReferralCode(),
//       updatedAt: new Date(),
//     },
//   });

//   return newUser;
// };

// const generateReferralCode = (): string => {
//   return Math.random().toString(36).substring(2, 10);
// };