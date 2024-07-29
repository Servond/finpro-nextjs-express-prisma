import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getEventById } from '@/utils/actions/events';
import { Event } from '@/types/event.types';
import { getUserById } from '@/utils/actions/users';
import { User } from '@/types/user.types';
import BookTicketForm from './BookTicketForm';
import { getSession } from '@/utils/actions/authentication';
import { getTicketByUserAndEventId } from '@/utils/actions/ticket';

export default async function EventDetailView({
  event_id,
}: {
  event_id: number;
}) {
  const event: Event = await getEventById(event_id);
  const organizer: User = await getUserById(event.created_by);
  const user = await getSession();
  const userTicket = await getTicketByUserAndEventId(
    user?.user_id as number,
    event.event_id as number,
  );

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[50vh]">
        <img
          src="/poster1.jpg"
          alt="Event Hero"
          className="w-full h-full object-fit"
        />
      </section>
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {event.event_name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                <span>
                  {new Date(event.start_date).toLocaleDateString('en-UK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(event.end_date).toLocaleDateString('en-UK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>
                  {new Date(event.start_date).toLocaleTimeString('en-UK', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}{' '}
                  -{' '}
                  {new Date(event.end_date).toLocaleTimeString('en-UK', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                <span>{event.event_location}</span>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-12" />
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Event Details
              </h2>
              <div className="prose max-w-[800px]">
                <p>{event.event_description}</p>
              </div>
            </div>
            <Separator className="my-12" />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Organizer
              </h2>
              <div className="flex items-center gap-4">
                <Avatar className="border w-16 h-16">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    {organizer.full_name.split(' ').map((name) => name[0])}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{organizer.full_name}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Book Tickets</CardTitle>
                <CardDescription>
                  Book your tickets for this event now!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.role === 'organizer' ? (
                  <div className="text-center text-red-500">
                    You are an organizer and cannot book tickets for this event.
                  </div>
                ) : (
                  <BookTicketForm
                    isUserTicket={userTicket ? true : false}
                    user_id={user?.user_id}
                    event={event}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
