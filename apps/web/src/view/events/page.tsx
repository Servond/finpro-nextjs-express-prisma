import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Event } from '@/types/event.types';
import { User } from '@/types/user.types';
import { getEventById } from '@/utils/actions/events';
import { getUserById } from '@/utils/actions/users';
import { CalendarIcon, MapPinIcon, ClockIcon, MailIcon } from 'lucide-react';
import Link from 'next/link';

export default async function EventDetailView({
  event_id,
}: {
  event_id: number;
}) {
  const event: Event = await getEventById(event_id);
  const organizer: User = await getUserById(event.created_by);
  return (
    <>
      <div className="relative w-full h-64 lg:h-80 mb-8">
        <img
          src="/poster3.jpg"
          alt={event.event_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.5)]" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
          <p className="text-muted-foreground mb-6">
            {event.event_description}
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>
                {new Date(event.event_date).toLocaleDateString('en-UK', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-primary" />
              <span>
                {new Date(event.event_date).toLocaleTimeString('en-UK', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <span>{event.event_location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>
                {organizer.full_name
                  .split(' ')
                  .map((n) => n.charAt(0).toUpperCase())
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{organizer.full_name}</div>
              <div className="text-muted-foreground text-sm">
                Event Organizer
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <MailIcon className="w-5 h-5 text-primary" />
              <a href="#" className="text-primary">
                {organizer.email}
              </a>
            </div>
          </div>
        </div>

        <Card className="flex-none w-full md:w-1/3 shadow-lg rounded-lg p-3">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-4">Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <Label className="text-2xl font-semibold">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(100000)}
              </Label>
              <div className="text-sm text-muted-foreground">
                Get your tickets now and secure your spot at the event. Limited
                seats available.
              </div>
              <div className="text-lg font-semibold">
                Seats Available:{' '}
                {event.available_seats > 0 ? event.available_seats : 'Sold Out'}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Link href="#">
              <Button size="lg" className="w-full mb-4">
                Buy Tickets
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="font-medium">Jane Doe</div>
                <div className="text-muted-foreground text-sm">2 days ago</div>
              </div>
              <p className="text-muted-foreground">
                I'm really excited to attend this event! The lineup of speakers
                looks amazing.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="font-medium">John Smith</div>
                <div className="text-muted-foreground text-sm">3 days ago</div>
              </div>
              <p className="text-muted-foreground">
                Can't wait to network with other attendees and learn about the
                latest industry trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
