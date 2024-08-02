'use client';
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '@/app/utils/event-api';
import EventCard from '@/components/homepage-view/components/eventCard';
import HomeBanner from '@/components/homepage-view/homeBanner';
import CategoryClick from '@/components/homepage-view/components/categoryClick';
import Pagination from '@/components/homepage-view/components/pagination';
import Head from 'next/head';
import { IEvent } from '@/interface/event.interface';
import Navbar from '@/app/Navbar';

const HomePageView: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;
  const maxPages = 10;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await fetchEvents(currentPage, eventsPerPage);
        console.log('Event Data:', eventData);
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventData();
  }, [currentPage]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div>
      <Head>
        <title>Eventify Home Page</title>
        <meta name="description" content="Discover Your Next Event" />
      </Head>
      <Navbar />  {/* Add Navbar here */}
      <div>
        <HomeBanner />
      </div>
      <div className="home-page container mx-auto p-4">
        <CategoryClick />
        <h1 className="text-3xl font-bold mt-10">Upcoming Events</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4 xs:grid-cols-1">
          {currentEvents.map((event) => (
            <div key={event.id} className="my-4">
              <EventCard event={event} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(events.length / eventsPerPage)}
          maxPages={maxPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default HomePageView;
