import prisma from '@/prisma';
import { IEvent } from '@/interfaces/event.interface';
import { IEventCategory } from '@/interfaces/event.interface';


class EventAction {

  findEventByAllDataExceptOrganizerIdAndCategory = async (
    event_name: string, 
    event_description: string, 
    original_price: number, 
    start_date: Date, 
    end_date: Date,
    location_id: number,
    total_seats: number) => {
    try {
      const event = await prisma.event.findFirst({
        where: {
          AND: [
            {event_name},
            {event_description},
            {original_price},
            {start_date},
            {end_date},
            {location_id},
            {total_seats}
          ],
        },
      });

      return event;
    } catch (error) {
      throw error;
    }
  };


  findEventById = async (event_id: number) => {
    try {
      const event = await prisma.event.findUnique({
        where: {
          event_id,
        },
      });

      return event;
    } catch (error) {
      throw error;
    }
  };

  createEvent = async (
    {
      organizer_id, 
      event_name, 
      event_description, 
      original_price, 
      start_date, 
      end_date,
      location_id,
      total_seats
    }: IEvent,
    {
      category_id
    }: IEventCategory,
    ) => {
    try {

      // Check if organizer_id exists and is an organizer
      const organizer = await prisma.user.findUnique({
        where: { user_id: organizer_id },
      });

      if (organizer?.role_id !== 2) {
        throw new Error('User is not exist or not an organizer');
      }

      const isDuplicate = await this.findEventByAllDataExceptOrganizerIdAndCategory( 
        event_name, 
        event_description, 
        original_price, 
        start_date, 
        end_date,
        location_id,
        total_seats );
      if (isDuplicate) throw new Error('The same exact event already exists');

      const event = await prisma.event.create({
        data: {
          organizer_id, 
          event_name, 
          event_description, 
          original_price, 
          start_date, 
          end_date,
          location_id,
          total_seats,
          available_seats: total_seats
        },
      });

      const event_category = await prisma.event_Category.create({
        data: {
          event_id: event.event_id,
          category_id
        },
      });

      const data = {...event, ...event_category}
      return data;
    } catch (error) {
      throw error;
    }
  };

  getEvents = async (textInput: string, location: number | null, category: number | null, page: number) => {
    const whereClause: any = {
      OR: [
        {
          event_name: { contains: textInput },
        },
        {
          event_description: { contains: textInput },
        },
      ],
    };

    if (location) {
      whereClause.location_id = location;
    }

    if (category) {
      whereClause.categories = {
        some: {
          category_id: category,
        },
      };
    }

    const events = await prisma.event.findMany({
      skip: (Number(page) - 1) * Number(6),
      take: Number(6),
      where: whereClause,
      include: {
        categories: true,
      },
    });

    const total_count = await prisma.event.count({
      where: whereClause,
    });

    return { events, total_count };
  };
}

export default new EventAction();
