'use client';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { IEvent } from '@/interface/event.interface';
import Head from 'next/head';
import SearchInput from './searchInput';
import LocationInput from './locationInput';
import SuggestionsList from './suggestionList';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [eventData, setEventData] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const router = useRouter();

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const events: IEvent[] = await response.json();
        setEventData(events);
        const eventNames = events.map((event) => event.eventTitle);
        setSuggestions(eventNames);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchQuery !== '') {
        try {
          const response = await fetch(
            `http://localhost:8080/api/events?query=${debouncedSearchQuery}`,
          );
          if (!response.ok) {
            throw new Error('Failed to fetch filtered events');
          }
          const filteredEvents: IEvent[] = await response.json();
          setFilteredEvents(filteredEvents);
        } catch (error) {
          console.error('Error fetching filtered events:', error);
        }
      } else {
        setFilteredEvents([]);
      }
    };

    fetchData();
  }, [debouncedSearchQuery]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(
      `/events/search-result?query=${searchQuery}&location=${location}`,
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'searchQuery') {
      setSearchQuery(value);
      filterSuggestionsByQuery(value);
    } else if (name === 'location') {
      setLocation(value);
      filterSuggestionsByLocation(value);
    }
  };

  const filterSuggestionsByQuery = (value: string) => {
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
  };

  const filterSuggestionsByLocation = (value: string) => {
    const filtered = eventData
      .filter((event) =>
        event.location.toLowerCase().startsWith(value.toLowerCase()),
      )
      .map((event) => event.location)
      .filter((value, index, self) => self.indexOf(value) === index);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (searchQuery !== '') {
      setSearchQuery(suggestion);
      setFilteredSuggestions([]);
      router.push(
        `/events/search-result?query=${suggestion}&location=${location}`,
      );
    } else {
      setLocation(suggestion);
      setFilteredSuggestions([]);
      router.push(`/events/search-result?query=&location=${suggestion}`);
    }
  };

  const handleLocationInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      router.push(
        `/events/search-result?query=${searchQuery}&location=${location}`,
      );
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setLocation('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    router.push('/events/search-result');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-[1000px] mx-auto rounded-full flex flex-col md:flex-row justify-between items-center relative p-2"
    >
      <Head>
        <link rel="icon" href="/icon.ico" />
        <title>Eventify - Search Event</title>
        <meta name="description" content="Discover Your Next Event" />
      </Head>
      <SearchInput
        value={searchQuery}
        onChange={handleInputChange}
        onClear={handleClear}
      />
      <LocationInput
        value={location}
        onChange={handleInputChange}
        onClear={handleClear}
        onKeyDown={handleLocationInputKeyDown}
      />
      <button
        type="submit"
        className="bg-red-500 rounded-full sm:rounded-r-full sm:rounded-l-full md:rounded-r-full md:rounded-l-none lg:rounded-r-full lg:rounded-l-none border-none outline-none cursor-pointer px-4 py-[14px] hover:bg-red-400 transition-all"
      >
        <Search className="h-4 w-4 text-white" />
      </button>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionsList
          suggestions={filteredSuggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </form>
  );
};

export default SearchBar;
