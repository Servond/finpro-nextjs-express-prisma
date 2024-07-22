'use client';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function SuccessRegister() {
    const router = useRouter();

    const handleGoToLoginpage = () => {
        router.push('/login');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleGoToLoginpage();
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 4,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Typography
                component="h2"
                variant="h5"
                sx={{ mb: 4 }}
            >
                Registration Success
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoToLoginpage}
                sx={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: '#1976d2',
                }}
            >
                Login
            </Button>
        </Container>
    );
}

export default SuccessRegister;
