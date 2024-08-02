import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import multer from 'multer';

const prisma = new PrismaClient();
const SECRET_KEY = 'your-secret-key';


const storage = multer.memoryStorage();
const upload = multer({ storage });

export class SampleController {
  

  async register(req: Request, res: Response) {
  const { username, email, password, firstname, lastname, roleId, referredBy } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = Math.random().toString(36).substring(2, 8);

    const roleRecord = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!roleRecord) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    let points = 0;
    let usedReferral = false;
    if (referredBy) {
      const referrer = await prisma.user.findUnique({ where: { referralCode: referredBy } });
      if (referrer) {
        points = 10000;
        usedReferral = true;
        const referrerPoints = await prisma.points.findFirst({ where: { userId: referrer.userId } });
        const expiryDate = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months

        if (referrerPoints) {
          await prisma.points.update({
            where: { pointsId: referrerPoints.pointsId },
            data: { pointsBalance: { increment: 10000 }, expiryDate },
          });
        } else {
          await prisma.points.create({
            data: { userId: referrer.userId, pointsBalance: 10000, expiryDate },
          });
        }

        await prisma.discountCoupon.create({
          data: {
            userId: referrer.userId,
            code: uuidv4(),
            discountAmount: 10,
            expiryDate,
          },
        });

        console.log(`Referral successful: Referrer ${referrer.username} received 10,000 points`);
      } else {
        console.log('Invalid referral code');
      }
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        firstname,
        lastname,
        roleId,
        referralCode,
        referredBy,
        usedReferral,
      },
    });

    console.log('User roleId assigned:', user.roleId);

    const expiryDate = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 months
    await prisma.points.create({
      data: { userId: user.userId, pointsBalance: points, expiryDate },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.userId, roleId: user.roleId }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Logged in user role:', user.roleId); // Log the role ID for debugging
    res.json({ token, roleId: user.roleId });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
}

async getUser(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { userId: req.user.userId },
      select: {
        userId: true,
        roleId: true,
        username: true,
        email: true,
        referralCode: true,
        firstname: true,
        lastname: true,
        cellphone: true,
        company: true,
        website: true,
        address: true,
        city: true,
        country: true,
        postalCode: true,
        state: true,
        profileImage: true,
        Points: {
          select: {
            pointsBalance: true,
            expiryDate: true, 
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pointsExpiryDate = user.Points.length ? user.Points[0].expiryDate : null;

    res.json({
      ...user,
      profileImage: user.profileImage ? user.profileImage.toString('base64') : null,
      pointsBalance: user.Points.reduce((acc, point) => acc + point.pointsBalance, 0),
      pointsExpiryDate,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


async updateUser(req: Request, res: Response) {
  const { userId } = req.user!;
  const { firstname, lastname, cellphone, company, website, address, city, country, postalCode, state } = req.body;
  const profileImage = req.file ? req.file.buffer : null;

  try {
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        firstname,
        lastname,
        cellphone,
        company,
        website,
        address,
        city,
        country,
        postalCode,
        state,
        profileImage: profileImage ? Buffer.from(profileImage) : undefined,
      },
    });

    // Fetch the updated user with Points information
    const userWithPoints = await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        roleId: true,
        username: true,
        email: true,
        referralCode: true,
        firstname: true,
        lastname: true,
        cellphone: true,
        company: true,
        website: true,
        address: true,
        city: true,
        country: true,
        postalCode: true,
        state: true,
        profileImage: true,
        Points: {
          select: {
            pointsBalance: true,
            expiryDate: true,
          },
        },
      },
    });

    res.status(200).json(userWithPoints);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



  async getEvents(req: Request, res: Response) {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching events' });
    }
  }

  async getRegistrations(req: Request, res: Response) {
    try {
      const registrations = await prisma.ticket.findMany({
        where: { eventId: parseInt(req.params.eventId) },
      });
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching registrations' });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const events = await prisma.event.findMany({
        where: { organizerId: req.user.userId },
        select: { eventId: true }
      });

      const eventIds = events.map(event => event.eventId);

      const transactions = await prisma.ticket.findMany({
        where: { eventId: { in: eventIds } }
      });

      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
  }

  async getStatistics(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const events = await prisma.event.findMany({
        where: { organizerId: req.user.userId }
      });

      const statistics = await Promise.all(events.map(async event => ({
        eventId: event.eventId,
        registrations: await prisma.ticket.count({ where: { eventId: event.eventId } }),
        revenue: await prisma.ticket.aggregate({
          _sum: { ticketPrice: true },
          where: { eventId: event.eventId }
        }),
      })));

      res.status(200).json(statistics);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching statistics' });
    }
  }

  async getReports(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { range } = req.query;

      let dateFrom, dateTo;

      if (range === 'year') {
        dateFrom = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        dateTo = new Date();
      } else if (range === 'month') {
        dateFrom = new Date(new Date().setMonth(new Date().getMonth() - 1));
        dateTo = new Date();
      } else if (range === 'day') {
        dateFrom = new Date(new Date().setDate(new Date().getDate() - 1));
        dateTo = new Date();
      } else {
        return res.status(400).json({ error: 'Invalid range' });
      }

      const events = await prisma.event.findMany({
        where: {
          organizerId: req.user.userId,
          createdAt: {
            gte: dateFrom,
            lte: dateTo
          }
        }
      });

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching reports' });
    }
  }

  async createEvent(req: Request, res: Response) {
    try {
      const { eventName, eventDescription, organizerId, createdAt, updatedAt } = req.body;
      const event = await prisma.event.create({
        data: { eventName, eventDescription, organizerId, createdAt, updatedAt },
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error creating event' });
    }
  }

  async updateEvent(req: Request, res: Response, id: number) {
    try {
      const { eventName, eventDescription, createdAt, updatedAt } = req.body;
      const { id } = req.params;
      const event = await prisma.event.update({
        where: { eventId: parseInt(id) },
        data: { eventName, eventDescription, createdAt, updatedAt },
      });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error updating event' });
    }
  }

  async deleteEvent(req: Request, res: Response, id: number) {
    try {
      const { id } = req.params;
      await prisma.event.delete({ where: { eventId: parseInt(id) } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting event' });
    }
  }

  
}
