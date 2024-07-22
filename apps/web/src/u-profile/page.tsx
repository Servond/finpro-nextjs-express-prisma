'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { updateUserProfile } from '@/lib/features/auth/authSlices';

const UserProfile = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedFirstName, setEditedFirstName] = useState(user.firstName);
    const [editedLastName, setEditedLastName] = useState(user.lastName);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/user/profile/${user.userId}`,
                {
                    first_name: editedFirstName,
                    last_name: editedLastName,
                    email: editedEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );

            if (response.status === 200) {
                setOpenDialog(false);
                setIsEditing(false);
                setOpenSuccessDialog(true);

                dispatch(
                    updateUserProfile({
                        firstName: editedFirstName,
                        lastName: editedLastName,
                        email: editedEmail,
                    }),
                );
            } else {
                setOpenErrorDialog(true);
            }
        } catch (err) {
            console.error('Failed to update profile:', err);
            setOpenErrorDialog(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = (confirm: boolean) => {
        if (confirm) {
            handleSave();
        } else {
            setOpenDialog(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(value);
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 0,
                minHeight: 'calc(100vh - 84px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        mb: 4,
                    }}
                >
                    <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                        {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                        {user.username}
                    </Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            First Name
                        </Typography>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={editedFirstName}
                                onChange={(e) => setEditedFirstName(e.target.value)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                                {user.firstName}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Last Name
                        </Typography>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={editedLastName}
                                onChange={(e) => setEditedLastName(e.target.value)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                                {user.lastName}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Email
                        </Typography>
                        {isEditing ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                                sx={{ mt: 1 }}
                            />
                        ) : (
                            <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                                {user.email}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Role
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                            {user.roleName === 'user' ? 'User' : 'Event Organizer'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Referral Code
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                            {user.referralCode || 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            Balance
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                            {formatCurrency(user.pointBalance)}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
                    >
                        {isEditing ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setOpenDialog(true)}
                                startIcon={<SaveIcon />}
                                sx={{ px: 4 }}
                                disabled={loading}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleEditToggle}
                                startIcon={<EditIcon />}
                                sx={{ px: 4 }}
                            >
                                Edit
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon sx={{ color: 'orange' }} />
                        Confirm Changes
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Save changes ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDialogClose(true)} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openSuccessDialog}
                onClose={() => handleDialogClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '.MuiPaper-root': {
                        backgroundColor: '#e8f5e9',
                        color: '#2e7d32',
                        borderRadius: '10px',
                        maxWidth: '500px',
                        minWidth: '300px',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: '#2e7d32' }} />
                        {'Update Success'}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your profile has been updated
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenSuccessDialog(false)}
                        color="primary"
                        variant="contained"
                        autoFocus
                        sx={{
                            backgroundColor: 'primary.main',
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openErrorDialog}
                onClose={() => handleDialogClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '.MuiPaper-root': {
                        backgroundColor: '#ffebee',
                        color: 'red',
                        borderRadius: '10px',
                        maxWidth: '500px',
                        minWidth: '300px',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ErrorIcon sx={{ color: 'red' }} />
                        {'Update Error'}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Failed to update profile.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpenErrorDialog(false)}
                        color="primary"
                        variant="contained"
                        autoFocus
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserProfile;