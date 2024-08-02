'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventCard from '@/view/events/component/homepage-view/components/eventCard';
import 'tailwindcss/tailwind.css';
import Navbar from '@/app/global/components/navbar/Navbar';
import CategoryClick from '@/view/events/component/homepage-view/components/categoryClick';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  price: number;
  eventTitle: string;
  imagePath: string;
  organizerName: string;
  category?: { name: string } | undefined;
}

const SearchResult = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;
  const maxPages = 10;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const events = await response.json();
        setEventData(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    const { query, location, category } = router.query;

    setSearchQuery((query as string) || '');
    setLocation((location as string) || '');

    if (category) {
      const categoryString = category as string;
    }
  }, [router.query]);

  useEffect(() => {
    const filterEvents = () => {
      let filtered: Event[] = eventData;

      if (searchQuery) {
        filtered = filtered.filter((event) =>
          event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }
      if (location) {
        filtered = filtered.filter((event) =>
          event.location.toLowerCase().includes(location.toLowerCase()),
        );
      }
      // Filter by category
      if (router.query.category) {
        const category = router.query.category as string;
        filtered = filtered.filter((event) =>
          event.category?.name.toLowerCase().includes(category.toLowerCase()),
        );
      }

      setFilteredEvents(filtered);
    };

    filterEvents();
  }, [searchQuery, location, eventData, router.query.category]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredEvents.length / eventsPerPage)),
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const pageNumbers = [];
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startPage = Math.max(
    1,
    Math.min(totalPages - maxPages + 1, currentPage - Math.floor(maxPages / 2)),
  );
  const endPage = Math.min(totalPages, startPage + maxPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-8">
        <CategoryClick />
        {filteredEvents.length === 0 && searchQuery && location && (
          <p className="text-center text-xl font-semibold text-gray-600 mt-8">
            Event not found
          </p>
        )}
        {filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
        {/* Tombol pagination */}
        <div className="flex justify-center mt-4">
          <button
            className="text-red-500 font-bold py-2 px-4 rounded-full border-red-500 mr-2 border-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            &lt; {/* Simbol panah kiri */}
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`${
                number === currentPage
                  ? 'text-red-500 font-bold py-2 px-4 '
                  : 'text-black font-bold py-2 px-4'
              } mr-2`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="text-red-500 font-bold py-2 px-4 rounded-full border-red-500 mr-2 border-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            &gt; {/* Simbol panah kanan */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
