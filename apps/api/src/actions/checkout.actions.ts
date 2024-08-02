import { HttpException } from '@/exceptions/http.exception';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CheckoutActions {
  public async createCheckoutAction(eventId: string, tickets: any[]) {
    try {
      const eventIdNumber = Number(eventId);
      const createdOrders = await Promise.all(
        tickets.map(async (ticket: any) => {
          const createdOrder = await prisma.order.create({
            data: {
              eventId: eventIdNumber,
              ticketId: ticket.id,
              quantity: ticket.count,
              totalPrice: ticket.price * ticket.count,
            },
          });
          return createdOrder;
        }),
      );
      return createdOrders;
    } catch (error) {
      throw new HttpException(500, 'Failed to create order');
    }
  }
}
