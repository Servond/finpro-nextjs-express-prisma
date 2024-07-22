import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

interface StatisticsProps {
    organizer_id: number;
}

interface StatisticsData {
    eventCount: number;
    totalSeats: number;
    availableSeats: number;
    completedEvents: number;
    eventsByLocation: { city_name: string; event_count: number }[];
    eventsByPrice: { original_price: number; _count: { event_id: number } }[];
}

const Statistics = ({ organizer_id }: StatisticsProps) => {
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/events-statistics/${organizer_id}`,
                );
                setStatistics(response.data.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('Unknown error occurred'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [organizer_id]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '50vh' }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Failed to load data
            </Alert>
        );
    }

    const barDataSeats = {
        labels: ['Total Seats', 'Available Seats'],
        datasets: [
            {
                label: 'Seats',
                data: [
                    statistics?.totalSeats || 0,
                    statistics?.availableSeats || 0,
                ],
                backgroundColor: ['#8884d8', '#82ca9d'],
            },
        ],
    };

    const barDataEvents = {
        labels: ['Total Events', 'Completed Events'],
        datasets: [
            {
                label: 'Events',
                data: [
                    statistics?.eventCount || 0,
                    statistics?.completedEvents || 0,
                ],
                backgroundColor: ['#ffc658', '#ff8042'],
            },
        ],
    };

    const pieDataLocation = {
        labels: statistics?.eventsByLocation.map((loc) => loc.city_name),
        datasets: [
            {
                label: 'Events by Location',
                data: statistics?.eventsByLocation.map((loc) => loc.event_count),
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
            },
        ],
    };

    const pieDataPrice = {
        labels: statistics?.eventsByPrice.map(
            (price) => `Price ${price.original_price}`,
        ),
        datasets: [
            {
                label: 'Events by Price',
                data: statistics?.eventsByPrice.map((price) => price._count.event_id),
                backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
            },
        ],
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Statistics
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Slot Statistics
                        </Typography>
                        <Bar data={barDataSeats} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Events Statistics
                        </Typography>
                        <Bar data={barDataEvents} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Events by Location
                        </Typography>
                        <Pie data={pieDataLocation} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Events by Price
                        </Typography>
                        <Pie data={pieDataPrice} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;