"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Pagination,
} from "@mui/material";

interface Event {
  id: string;
  eventname: string;
  location: string;
  price: number;
  image: string;
}

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4; // Jumlah event per halaman

  useEffect(() => {
    fetch("./db.json")
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Mendapatkan data event untuk halaman saat ini
  const currentEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth={false} sx={{ backgroundColor: "white" }}>
      <Container>
        <Box sx={{ padding: "1rem" }}>
          <Typography sx={{ textAlign: "left", marginBottom: "2rem", fontSize: "18px" }}>
            Our Events
          </Typography>
          {events.length > 0 ? (
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
                        <Button size="small" color="primary">
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

export default EventPage;
