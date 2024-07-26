// import { Request, Response } from 'express';
// import { createUser } from '../models/userModel';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// export const RegisterUser = async (req: Request, res: Response) => {
//   const { email, password, role, referralCode } = req.body;
//   try {
//     const user = await createUser(email, password, role, referralCode);
//     const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'User registration failed' });
//   }
// };

import { Request, Response } from 'express';
import prisma from '@/prisma';

export class SampleController {
  async getSampleData(req: Request, res: Response) {
    const sampleData = await prisma.samples.findMany();

    return res.status(200).send(sampleData);
  }

  async getSampleDataById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.samples.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }

  async createSampleData(req: Request, res: Response) {
    const { name, referralCode, email, password, role } = req.body;

    const newSampleData = await prisma.samples.create({
      data: { name, referralCode, email, password, role },
    });

    return res.status(201).send(newSampleData);
  }
}

console.log('Hello');
