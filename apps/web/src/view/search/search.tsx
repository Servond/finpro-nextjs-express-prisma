"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/navigation";
import debounce from 'lodash.debounce';

interface Event {
  id: string;
  eventname: string;
  location: string;
  price: number;
  image: string;
}

const SearchEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4; // Jumlah event per halaman
  const router = useRouter();

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.events);
        setFilteredEvents(data.events);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSearch = useCallback(
    debounce((term: string) => {
      setFilteredEvents(
        events.filter((event) =>
          event.location.toLowerCase().includes(term.toLowerCase())
        )
      );
      setCurrentPage(1); // Reset to first page on search
    }, 300),
    [events]
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleBuyNow = (event: Event) => {
    router.push(`/checkout?eventId=${event.id}&eventname=${event.eventname}&price=${event.price}`);
  };

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Mendapatkan data event untuk halaman saat ini
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            Our Events
          </Typography>
          <TextField
            fullWidth
            label="Search ..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: "2rem" }}
          />
          {filteredEvents.length > 0 ? (
            <>
              <Grid container spacing={2}>
                {currentEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                    <Card sx={{ marginBottom: "1rem" }}>
                      <CardContent>
                        <img src={event.image} alt={event.eventname} style={{ width: '100%', height: 'auto' }} />
                        <Typography variant="h6">{event.eventname}</Typography>
                        <Typography variant="body1">{event.location}</Typography>
                        <Typography variant="body2">IDR {event.price}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => handleBuyNow(event)}>
                          Buy Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </>
          ) : (
            <Typography>No events available.</Typography>
          )}
        </Box>
      </Container>
    </Container>
  );
};

export default SearchEventsPage;
