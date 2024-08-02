import { PrismaClient } from '@prisma/client';
import { HttpException } from '@/exceptions/http.exception';

const prisma = new PrismaClient();

export class EventActions {
  public async getEventsAction() {
    try {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          imagePath: true,
          eventTitle: true,
          date: true,
          location: true,
          price: true,
          organizerName: true,
          description: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      return events;
    } catch (error) {
      throw new HttpException(500, 'Failed to fetch events');
    }
  }

  public async getEventByIdAction(id: number) {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          category: true,
          tickets: true,
        },
      });
      if (!event) {
        throw new HttpException(404, 'Event not found');
      }
      return event;
    } catch (error) {
      throw new HttpException(500, 'Failed to fetch event');
    }
  }

  public async searchEventsAction(search: string, location: string) {
    try {
      const events = await prisma.event.findMany({
        where: {
          OR: [
            {
              eventTitle: {
                contains: search,
              },
            },
            {
              location: {
                contains: location,
              },
            },
          ],
        },
      });
      return events;
    } catch (error) {
      throw new HttpException(500, 'Failed to search events');
    }
  }

  public async createEventAction(eventData: any) {
    try {
      const dateISO = new Date(eventData.date).toISOString();

      const price =
        eventData.isFree === 'true' ? 0 : parseFloat(eventData.price);
      const capacity = parseInt(eventData.capacity, 10);
      const categoryId = parseInt(eventData.categoryId, 10);

      const tickets = Array.isArray(eventData.tickets)
        ? eventData.tickets.map((ticket: any) => ({
            type: ticket.type,
            price: parseFloat(ticket.price),
          }))
        : [];

      const promotions = Array.isArray(eventData.promotions)
        ? eventData.promotions.map((promotion: any) => ({
            type: promotion.type,
            code: promotion.code,
            amount: parseFloat(promotion.amount),
            maxUses: parseInt(promotion.maxUses, 10),
            startDate: promotion.startDate
              ? new Date(promotion.startDate).toISOString()
              : null,
            endDate: promotion.endDate
              ? new Date(promotion.endDate).toISOString()
              : null,
            description: promotion.description,
          }))
        : [];

      const event = await prisma.event.create({
        data: {
          organizerName: eventData.organizerName,
          eventTitle: eventData.eventTitle,
          description: eventData.description,
          date: dateISO,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          location: eventData.location,
          address: eventData.address,
          venueName: eventData.venueName,
          price,
          capacity,
          categoryId,
          imagePath: eventData.imagePath,
          tickets: {
            create: tickets,
          },
          promotions: {
            create: promotions,
          },
        },
      });

      return event;
    } catch (error) {
      throw new HttpException(500, 'Failed to create event');
    }
  }

  public async getCategoriesAction() {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new HttpException(500, 'Failed to fetch categories');
    }
  }

  public async getPromotionsByEventIdAction(eventId: number) {
    try {
      const promotions = await prisma.promotion.findMany({
        where: { eventId },
      });
      return promotions;
    } catch (error) {
      throw new HttpException(500, 'Failed to fetch promotions');
    }
  }

  public async getReviewsAction(eventId: number) {
    try {
      const reviews = await prisma.review.findMany({
        where: { eventId },
      });
      return reviews;
    } catch (error) {
      throw new HttpException(500, 'Failed to fetch reviews');
    }
  }

  public async createReviewAction(reviewData: any) {
    try {
      const review = await prisma.review.create({
        data: reviewData,
      });
      return review;
    } catch (error) {
      throw new HttpException(500, 'Failed to submit review');
    }
  }

  public async updateEventAction(eventId: number, eventData: any) {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          ...eventData,
          date: new Date(eventData.date),
        },
      });

      return updatedEvent;
    } catch (error) {
      throw new HttpException(500, 'Failed to update event');
    }
  }

  public async deleteEventAction(id: number) {
    try {
      await prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(500, 'Failed to delete event');
    }
  }
}
