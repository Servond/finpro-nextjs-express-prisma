'use client';
import React, { useState, useEffect } from 'react';
import EventCard from './eventCard';
import { fetchEvents } from '@/app/utils/event-api';
import CategoryClick from './categoryClick';
import Pagination from './pagination';
import Head from 'next/head';
import { IEvent } from '@/interface/event.interface';

const FindEventsPage: React.FC = () => {
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
    <div className="container mx-auto py-8">
      <Head>
        <link rel="icon" href="/icon.ico" />
        <title>Eventify - Event Detail Page</title>
        <meta name="description" content="Discover Your Next Event" />
      </Head>
      <CategoryClick />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(events.length / eventsPerPage)}
        maxPages={maxPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default FindEventsPage;
